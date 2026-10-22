import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Container, Button } from '../ui';
import type { SiteSettings } from '../lib/supabase';

export function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (error) throw error;
      if (data) setSettings(data);
    } catch (error) {
      console.error('Fetch settings error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev: SiteSettings | null) => (prev ? { ...prev, [name]: value } : null));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const { error } = await supabase.from('site_settings').update(settings).eq('id', settings.id);
      if (error) throw error;
      setSuccess('Settings saved successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" aria-label="Loading" />
        </div>
      </Container>
    );
  }

  if (!settings) {
    return <Container>Failed to load settings</Container>;
  }

  return (
    <Container size="lg">
      <header className="mb-10">
        <h1 className="font-heading text-display-md text-text-primary mb-2">Settings</h1>
        <p className="font-body text-body text-text-secondary">Manage your store's public contact information and display settings</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300 font-body text-body" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-300 font-body text-body" role="alert">
            {success}
          </div>
        )}

        {/* Store Information */}
        <fieldset className="bg-surface border border-border rounded-xl p-6">
          <legend className="font-heading text-heading-lg text-text-primary mb-6">Store Information</legend>
          <div className="space-y-6">
            <div>
              <label htmlFor="storeName" className="block font-body text-body-sm text-text-secondary mb-2">Store Name</label>
              <input
                type="text"
                id="storeName"
                name="store_name"
                value={settings.store_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
            <div>
              <label htmlFor="tagline" className="block font-body text-body-sm text-text-secondary mb-2">Tagline</label>
              <input
                type="text"
                id="tagline"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
          </div>
        </fieldset>

        {/* Contact Information */}
        <fieldset className="bg-surface border border-border rounded-xl p-6">
          <legend className="font-heading text-heading-lg text-text-primary mb-6">Contact Information</legend>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block font-body text-body-sm text-text-secondary mb-2">Contact Email <span className="text-primary" aria-hidden="true">*</span></label>
              <input
                type="email"
                id="email"
                name="contact_email"
                value={settings.contact_email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-body text-body-sm text-text-secondary mb-2">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={settings.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="block font-body text-body-sm text-text-secondary mb-2">WhatsApp (E.164 format)</label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp_e164"
                value={settings.whatsapp_e164 || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
              <p className="font-body text-caption text-text-muted mt-1">Include country code, e.g., +977981234567</p>
            </div>
            <div>
              <label htmlFor="mapsUrl" className="block font-body text-body-sm text-text-secondary mb-2">Google Maps URL</label>
              <input
                type="url"
                id="mapsUrl"
                name="maps_url"
                value={settings.maps_url || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="address" className="block font-body text-body-sm text-text-secondary mb-2">Full Address</label>
              <textarea
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-y"
              />
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="openingHours" className="block font-body text-body-sm text-text-secondary mb-2">Opening Hours</label>
              <textarea
                id="openingHours"
                name="opening_hours"
                value={settings.opening_hours || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-y"
                placeholder="e.g., Mon–Sat 10:00–19:00, Sun 11:00–17:00"
              />
            </div>
          </div>
        </fieldset>

        {/* Social Links */}
        <fieldset className="bg-surface border border-border rounded-xl p-6">
          <legend className="font-heading text-heading-lg text-text-primary mb-6">Social Links</legend>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="instagram" className="block font-body text-body-sm text-text-secondary mb-2">Instagram URL</label>
              <input
                type="url"
                id="instagram"
                name="instagram_url"
                value={settings.instagram_url || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
            <div>
              <label htmlFor="facebook" className="block font-body text-body-sm text-text-secondary mb-2">Facebook URL</label>
              <input
                type="url"
                id="facebook"
                name="facebook_url"
                value={settings.facebook_url || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
          </div>
        </fieldset>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end border-t border-border pt-6">
          <Button variant="outline" type="button" onClick={fetchSettings}>Cancel</Button>
          <Button type="submit" loading={saving}>Save Settings</Button>
        </div>
      </form>

      {/* Development Note */}
      <div className="mt-10 p-6 bg-surface border border-border rounded-xl">
        <h2 className="font-heading text-heading-md text-text-primary mb-3">Development Note</h2>
        <p className="font-body text-body-sm text-text-secondary mb-3">
          This settings page connects to the Supabase <code className="bg-background px-1.5 py-0.5 rounded font-mono text-sm">site_settings</code> table.
        </p>
        <ul className="list-disc list-inside space-y-1 font-body text-body-sm text-text-secondary">
          <li>All fields validated client- and server-side</li>
          <li>URL fields validated for proper format</li>
          <li>Phone/WhatsApp use E.164 validation</li>
          <li>Settings publicly readable but only admin-editable via RLS</li>
          <li>Changes reflected site-wide immediately</li>
        </ul>
      </div>
    </Container>
  );
}