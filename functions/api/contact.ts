// Contact Form API - Cloudflare Pages Function
// Handles form submission, Turnstile verification, validation, and Supabase insert

import { createClient } from '@supabase/supabase-js';

// Types
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  product?: string;
  message: string;
  turnstileToken: string;
}

interface TurnstileResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

interface Env {
  TURNSTILE_SECRET_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

// Rate limiting (in-memory for dev, use KV in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10; // 10 per hour per IP

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
}

// Validation
function validateFormData(data: unknown): { valid: boolean; errors: string[]; sanitized?: ContactFormData } {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Invalid request body');
    return { valid: false, errors };
  }

  const d = data as Record<string, unknown>;

  // Name: required, 1-100 chars
  if (!d.name || typeof d.name !== 'string' || !d.name.trim()) {
    errors.push('Name is required');
  } else if (d.name.length > 100) {
    errors.push('Name must be 100 characters or less');
  }

  // Email: required, valid format
  if (!d.email || typeof d.email !== 'string' || !d.email.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
    errors.push('Please enter a valid email address');
  } else if (d.email.length > 254) {
    errors.push('Email must be 254 characters or less');
  }

  // Phone: optional, valid format if provided
  if (d.phone && typeof d.phone === 'string' && d.phone.trim()) {
    if (d.phone.length > 50) {
      errors.push('Phone must be 50 characters or less');
    }
    // Basic E.164 or local format check
    if (!/^[\+]?[\d\s\-\(\)]{7,}$/.test(d.phone.trim())) {
      errors.push('Please enter a valid phone number');
    }
  }

  // Product: optional, max 200 chars
  if (d.product && typeof d.product === 'string') {
    if (d.product.length > 200) {
      errors.push('Product reference must be 200 characters or less');
    }
  }

  // Message: required, 10-5000 chars
  if (!d.message || typeof d.message !== 'string' || !d.message.trim()) {
    errors.push('Message is required');
  } else if (d.message.length < 10) {
    errors.push('Message must be at least 10 characters');
  } else if (d.message.length > 5000) {
    errors.push('Message must be 5000 characters or less');
  }

  // Turnstile token: required
  if (!d.turnstileToken || typeof d.turnstileToken !== 'string' || !d.turnstileToken.trim()) {
    errors.push('Turnstile verification required');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    sanitized: {
      name: d.name.trim(),
      email: d.email.trim().toLowerCase(),
      phone: d.phone?.trim() || '',
      product: d.product?.trim() || '',
      message: d.message.trim(),
      turnstileToken: d.turnstileToken.trim(),
    },
  };
}

// Verify Turnstile token
async function verifyTurnstile(token: string, secretKey: string, ip?: string): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip) formData.append('remoteip', ip);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const result: TurnstileResponse = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

// Verify product exists and is published (if product reference provided)
async function verifyProductReference(
  supabase: ReturnType<typeof createClient>,
  productSlug: string
): Promise<{ valid: boolean; productId?: string; productTitle?: string }> {
  if (!productSlug) return { valid: true };

  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, title')
      .eq('slug', productSlug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      return { valid: false };
    }

    return { valid: true, productId: data.id, productTitle: data.title };
  } catch {
    return { valid: false };
  }
}

// Main handler
export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  const startTime = Date.now();

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get client IP for rate limiting
  const ip = request.headers.get('CF-Connecting-IP') ||
             request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
             'unknown';

  // Rate limiting
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return new Response(JSON.stringify({
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
    }), {
      status: 429,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
      },
    });
  }

  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate form data
  const validation = validateFormData(body);
  if (!validation.valid) {
    return new Response(JSON.stringify({
      error: 'Validation failed',
      errors: validation.errors,
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const formData = validation.sanitized!;

  // Verify Turnstile
  const turnstileValid = await verifyTurnstile(formData.turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
  if (!turnstileValid) {
    return new Response(JSON.stringify({
      error: 'Turnstile verification failed. Please try again.',
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Initialize Supabase with service role
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // Verify product reference if provided
  let productId: string | undefined;
  let productTitleSnapshot: string | undefined;

  if (formData.product) {
    const productCheck = await verifyProductReference(supabase, formData.product);
    if (!productCheck.valid) {
      return new Response(JSON.stringify({
        error: 'Invalid product reference',
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    productId = productCheck.productId;
    productTitleSnapshot = productCheck.productTitle;
  }

  // Insert inquiry
  const { error: insertError } = await supabase.from('inquiries').insert({
    name: formData.name,
    email: formData.email,
    phone: formData.phone || null,
    product_id: productId || null,
    product_title_snapshot: productTitleSnapshot || null,
    message: formData.message,
    status: 'new',
  });

  if (insertError) {
    console.error('Supabase insert error:', insertError);
    return new Response(JSON.stringify({
      error: 'Failed to submit inquiry. Please try again.',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Success response
  return new Response(JSON.stringify({
    success: true,
    message: 'Thank you for your inquiry! We\'ll respond within 1-2 business days.',
  }), {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'RateLimit-Remaining': rateLimit.remaining.toString(),
      'RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
    },
  });
}

// Export for Pages
export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }

  // Only POST allowed
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};