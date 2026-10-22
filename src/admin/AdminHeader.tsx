import { useAuth } from '../context/AuthContext';

export function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <h1 className="font-heading text-heading-lg text-text-primary">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-body text-body-sm text-text-muted">Signed in as</span>
          <span className="font-body text-body-sm text-text-primary font-medium">{user?.email}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="font-body text-body text-primary font-medium">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </span>
        </div>
      </div>
    </header>
  );
}