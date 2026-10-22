import { Container, Button } from '../../ui';

export function AdminSettings() {
  return (
    <section className="section" aria-labelledby="settings-heading">
      <Container size="lg">
        <header className="mb-10">
          <h1 id="settings-heading" className="font-heading text-display-md text-text-primary mb-2">
            Settings
          </h1>
          <p className="font-body text-body text-text-secondary">
            Manage your store's public contact information and display settings
          </p>
        </header>

        <form className="space-y-8" noValidate>
          {/* Store Information */}
          <fieldset className="bg-surface border border-border rounded-xl p-6">
            <legend className="font-heading text-heading-lg text-text-primary mb-6">Store Information</legend>
            <div className="space-y-6">
              <div>
                <label htmlFor="storeName" className="block font-body text-body-sm text-text-secondary mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  defaultValue="Norbu Buddhist Handicraft"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                />
              </div>
              <div>
                <label htmlFor="tagline" className="block font-body text-body-sm text-text-secondary mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  id="tagline"
                  name="tagline"
                  defaultValue="Traditional Art. Timeless Elegance."
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
                <label htmlFor="email" className="block font-body text-body-sm text-text-secondary mb-2">
                  Contact Email <span className="text-primary" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="[BUSINESS_EMAIL]"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block font-body text-body-sm text-text-secondary mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="[BUSINESS_PHONE]"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block font-body text-body-sm text-text-secondary mb-2">
                  WhatsApp (E.164 format)
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="[WHATSAPP_E164]"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                />
                <p className="font-body text-caption text-text-muted mt-1">Include country code, e.g., +977981234567</p>
              </div>
              <div>
                <label htmlFor="mapsUrl" className="block font-body text-body-sm text-text-secondary mb-2">
                  Google Maps URL
                </label>
                <input
                  type="url"
                  id="mapsUrl"
                  name="mapsUrl"
                  placeholder="[GOOGLE_MAPS_URL]"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                />
              </div>
              <div className="lg:col-span-2">
                <label htmlFor="address" className="block font-body text-body-sm text-text-secondary mb-2">
                  Full Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  placeholder="[STORE_STREET_ADDRESS], [CITY_NEPAL]"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-y"
                />
              </div>
              <div className="lg:col-span-2">
                <label htmlFor="openingHours" className="block font-body text-body-sm text-text-secondary mb-2">
                  Opening Hours
                </label>
                <textarea
                  id="openingHours"
                  name="openingHours"
                  rows={3}
                  placeholder="[OPENING_HOURS] — e.g., Mon–Sat 10:00–19:00, Sun 11:00–17:00"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-y"
                />
              </div>
            </div>
          </fieldset>

          {/* Social Links */}
          <fieldset className="bg-surface border border-border rounded-xl p-6">
            <legend className="font-heading text-heading-lg text-text-primary mb-6">Social Links</legend>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="instagram" className="block font-body text-body-sm text-text-secondary mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  placeholder="[INSTAGRAM_URL]"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                />
              </div>
              <div>
                <label htmlFor="facebook" className="block font-body text-body-sm text-text-secondary mb-2">
                  Facebook URL
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  placeholder="[FACEBOOK_URL]"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                />
              </div>
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end border-t border-border pt-6">
            <Button variant="outline" type="button">Cancel</Button>
            <Button type="submit">Save Settings</Button>
          </div>
        </form>

        {/* Development Note */}
        <div className="mt-10 p-6 bg-surface border border-border rounded-xl">
          <h2 className="font-heading text-heading-md text-text-primary mb-3">Development Note</h2>
          <p className="font-body text-body-sm text-text-secondary mb-3">
            This is a placeholder settings page. In Milestone 5, this will connect to the Supabase <code className="bg-background px-1.5 py-0.5 rounded font-mono text-sm">site_settings</code> table.
          </p>
          <ul className="list-disc list-inside space-y-1 font-body text-body-sm text-text-secondary">
            <li>All fields will be validated client- and server-side</li>
            <li>URL fields will be validated for proper format</li>
            <li>Phone/WhatsApp will use E.164 validation</li>
            <li>Settings will be publicly readable but only admin-editable via RLS</li>
            <li>Changes will be reflected site-wide immediately</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}