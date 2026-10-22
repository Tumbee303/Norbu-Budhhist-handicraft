import { Link, useLocation } from 'react-router-dom';
import { useMobileMenu } from '../hooks';

const navigation = [
  { name: 'Our Story', href: '/our-story' },
  { name: 'Collection', href: '/collection' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const { isOpen, close, toggle } = useMobileMenu();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            aria-label="Norbu Buddhist Handicraft - Home"
          >
            <span className="font-heading text-display-sm text-text-primary tracking-tight">
              NORBU
            </span>
            <span className="font-body text-caption text-text-secondary tracking-widest uppercase hidden sm:inline">
              BUDDHIST HANDICRAFT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-body text-body-sm tracking-wide transition-colors duration-fast hover:text-primary ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-text-secondary'
                }`}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 -ml-2 rounded-md text-text-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-normal ease-out ${
            isOpen ? 'max-h-64 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col gap-2 pt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-body text-body text-center py-3 rounded-md transition-colors duration-fast ${
                  location.pathname === item.href
                    ? 'bg-surface text-primary'
                    : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
                onClick={close}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}