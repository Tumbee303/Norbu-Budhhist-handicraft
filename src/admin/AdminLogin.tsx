import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Button } from '../ui';

export function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Container size="sm">
        <div className="bg-surface border border-border rounded-2xl p-8">
          <header className="text-center mb-8">
            <h1 className="font-heading text-display-md text-text-primary mb-2">
              Admin Login
            </h1>
            <p className="font-body text-body text-text-secondary">
              Sign in to manage products, inquiries, and settings
            </p>
          </header>

          {error && (
            <div
              className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300 font-body text-body"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-body text-body-sm text-text-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                placeholder="admin@norbu.example.com"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-body text-body-sm text-text-secondary mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                placeholder="••••••••"
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" size="lg" fullWidth loading={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-background border border-border rounded-lg">
            <h3 className="font-heading text-heading-md text-text-primary mb-3">MFA Setup (Recommended)</h3>
            <ol className="space-y-2 font-body text-body-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 flex-shrink-0 bg-primary/10 text-primary rounded-full flex items-center justify-center font-mono text-caption">1</span>
                After first login, go to Supabase Dashboard → Authentication → Users
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 flex-shrink-0 bg-primary/10 text-primary rounded-full flex items-center justify-center font-mono text-caption">2</span>
                Click the admin user → Enable MFA (TOTP)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 flex-shrink-0 bg-primary/10 text-primary rounded-full flex items-center justify-center font-mono text-caption">3</span>
                Scan QR code with authenticator app
              </li>
            </ol>
          </div>

          <p className="mt-6 text-center font-body text-caption text-text-muted">
            [ADMIN_AUTH_EMAIL] — Single authorized admin email configured in Supabase Auth
          </p>
        </div>
      </Container>
    </div>
  );
}