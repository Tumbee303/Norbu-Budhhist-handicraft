import { Link } from 'react-router-dom';
import { Container } from '../ui';

const footerLinks = {
  explore: [
    { name: 'Our Story', href: '/our-story' },
    { name: 'Collection', href: '/collection' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
  ],
};

const socialLinks = [
  { name: 'Instagram', href: '[INSTAGRAM_URL]', ariaLabel: 'Follow us on Instagram' },
  { name: 'Facebook', href: '[FACEBOOK_URL]', ariaLabel: 'Follow us on Facebook' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border" role="contentinfo">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link
                to="/"
                className="flex items-center gap-2 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
                aria-label="Norbu Buddhist Handicraft - Home"
              >
                <span className="font-heading text-display-sm text-text-primary tracking-tight">
                  NORBU
                </span>
                <span className="font-body text-caption text-text-secondary tracking-widest uppercase">
                  BUDDHIST HANDICRAFT
                </span>
              </Link>
              <p className="font-body text-body-sm text-text-secondary leading-relaxed mb-6 max-w-xs">
                Traditional Art. Timeless Elegance.
              </p>
              <nav aria-label="Social links">
                <ul className="flex gap-4">
                  {socialLinks.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        className="text-text-secondary hover:text-primary transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                        aria-label={social.ariaLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Explore */}
            <nav aria-label="Explore">
              <h3 className="font-heading text-heading-md text-text-primary mb-4">Explore</h3>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="font-body text-body-sm text-text-secondary hover:text-primary transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info */}
            <address className="not-italic" aria-label="Contact information">
              <h3 className="font-heading text-heading-md text-text-primary mb-4">Visit Us</h3>
              <ul className="space-y-3 font-body text-body-sm text-text-secondary">
                <li>
                  <a
                    href="[GOOGLE_MAPS_URL]"
                    className="hover:text-primary transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [STORE_STREET_ADDRESS], [CITY_NEPAL]
                  </a>
                </li>
                <li>
                  <a
                    href="tel:[BUSINESS_PHONE]"
                    className="hover:text-primary transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                  >
                    [BUSINESS_PHONE]
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:[BUSINESS_EMAIL]"
                    className="hover:text-primary transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                  >
                    [BUSINESS_EMAIL]
                  </a>
                </li>
                <li>[OPENING_HOURS]</li>
              </ul>
            </address>

            {/* Newsletter / Connect */}
            <div>
              <h3 className="font-heading text-heading-md text-text-primary mb-4">Connect</h3>
              <p className="font-body text-body-sm text-text-secondary mb-4">
                Visit our store to experience the art in person.
              </p>
              <a
                href="https://wa.me/[WHATSAPP_E164]"
                className="inline-flex items-center gap-2 font-body text-body-sm text-primary hover:text-primary-hover transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.67m-13.472-12.019c0-7.418 6.022-13.438 13.438-13.438 7.418 0 13.438 6.02 13.438 13.438 0 5.572-3.483 10.336-8.32 12.154-.474.18-1.125.058-1.494-.226-.37-.285-.75-.742-1.141-1.282-.38-.524-1.055-2.203-1.296-2.485-.24-.273-.53-.377-.85-.377h-.086c-.516 0-1.826.202-2.746.83-.918.624-1.627 1.436-2.01 1.884-.383.448-.78.898-1.2.898-.148 0-.224-.064-.507-.347-.297-.283-.733-1.002-.922-1.233-.189-.232-.318-.32-.43-.354-.113-.034-.24-.034-.487.017-.248.05-.63.23-1.148.438-.518.208-1.075.42-1.522.42-.475 0-.977-.233-1.358-.57-.383-.337-.837-.807-1.13-1.015-.382-.268-.632-.416-.95-.512-.318-.096-.634-.135-.95-.135-.318 0-.724.086-1.024.248-.3.162-.612.39-.876.54-.264.15-.532.273-.94.273-.475 0-1.04-.223-1.494-.573-.453-.35-1.027-.973-1.027-2.088v-.07c0-.52.202-1.016.57-1.368.37-.35.922-.733 1.32-1.03.398-.297.796-.548 1.2-.798.403-.25.855-.375 1.3-.375.33 0 .69.113 1.024.318.33.202.586.47 1.058.798l.017.034c.475.317 1.076.83 1.342 1.148.266.318.475.669.612.94.149.273.198.573.198.94v.124c0 .574-.318 1.04-.94 1.04-.475 0-.978-.298-1.358-.824-.38-.525-.77-1.272-.92-1.63-.15-.354-.27-.732-.27-1.148 0-.448.134-.897.388-1.233.255-.336.607-.608 1.024-.83.418-.223.898-.375 1.3-.375.57 0 1.076.199 1.45.598.374.398.68 1.04.877 1.46.197.42.296.897.296 1.46 0 .744-.272 1.323-.798 1.824-.524.502-1.204.772-1.954.94-.474.167-1.016.167-1.503.017zm-8.528 17.857c-2.485 0-4.536-1.504-5.25-3.59.654-2.07 3.178-3.75 5.25-3.75 2.084 0 4.607 1.68 5.25 3.75-.714 2.086-2.765 3.59-5.25 3.59z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-body text-body-sm text-text-muted">
                © {currentYear} Norbu Buddhist Handicraft. All rights reserved.
              </p>
              <nav aria-label="Legal links">
                <ul className="flex gap-6">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="font-body text-body-sm text-text-muted hover:text-text-secondary transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}