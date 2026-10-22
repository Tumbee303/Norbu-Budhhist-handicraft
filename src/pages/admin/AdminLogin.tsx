import { Container, Button } from '../../ui';

export function AdminLogin() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center py-12" aria-labelledby="login-heading">
      <Container size="sm">
        <div className="bg-surface border border-border rounded-2xl p-8">
          <header className="text-center mb-8">
            <h1 id="login-heading" className="font-heading text-display-md text-text-primary mb-2">
              Admin Login
            </h1>
            <p className="font-body text-body text-text-secondary">
              Sign in to manage products, inquiries, and settings
            </p>
          </header>

          <div className="space-y-6">
            <div className="bg-background border border-border rounded-xl p-6 text-center">
              <svg className="mx-auto w-16 h-16 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h2 className="font-heading text-heading-lg text-text-primary mb-2">Supabase Auth Integration</h2>
              <p className="font-body text-body text-text-secondary mb-4">
                This page will integrate with Supabase Authentication in Milestone 5.
              </p>
              <div className="text-left space-y-3 font-body text-body-sm text-text-muted">
                <p>• Email/password authentication</p>
                <p>• Single authorized admin user (pre-provisioned)</p>
                <p>• Session management with expiry</p>
                <p>• Secure password reset/recovery</p>
                <p>• MFA support (recommended)</p>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
              <h3 className="font-heading text-heading-md text-primary mb-3">Development Status</h3>
              <ul className="space-y-2 font-body text-body-sm text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" aria-hidden="true"></span>
                  Page structure and styling complete
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-text-muted rounded-full" aria-hidden="true"></span>
                  Supabase Auth integration (M5)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-text-muted rounded-full" aria-hidden="true"></span>
                  Session handling & route guards (M5)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-text-muted rounded-full" aria-hidden="true"></span>
                  Admin user provisioning script (M4)
                </li>
              </ul>
            </div>

            <Button variant="ghost" fullWidth disabled>
              Sign in with Email (Coming in M5)
            </Button>
          </div>

          <p className="mt-6 text-center font-body text-caption text-text-muted">
            [ADMIN_AUTH_EMAIL] — Single authorized admin email to be configured privately
          </p>
        </div>
      </Container>
    </section>
  );
}