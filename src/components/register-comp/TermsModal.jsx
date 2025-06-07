import React from "react";
import { Dialog } from "@headlessui/react";

const TermsModal = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onClose={onClose} className="relative z-50">
    <div className="fixed inset-0 bg-pnp-black/30" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="bg-pnp-white w-full max-w-md max-h-[80vh] rounded-2xl shadow-lg overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-pnp-black text-xl"
        >
          ✕
        </button>
        <Dialog.Title className="text-lg font-bold mb-4">
          Terms and Conditions
        </Dialog.Title>
        <div className="space-y-3 text-sm">
          <p>
            Welcome, brave soul. By using PlotHook, you agree to embark on this
            journey with kindness, courage, and curiosity.
          </p>

          <p>
            You also acknowledge that adventures may cause occasional mud,
            sunburn, and unforgettable memories.
          </p>

          <p>
            In short: be a legend, show up, be respectful, and enjoy the ride.
          </p>

          <p>
            We scribbled some important stuff below. Not as thrilling as a
            dragon battle, but worth the read.
          </p>

          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Your Quest, Your Responsibility</strong>
              <div>
                You use PlotHook at your own risk — but with great vibes. We’re
                here to help you find fellow adventurers, not to monitor the
                dragons you may encounter. Be kind, be honest, and be excellent
                to each other.
              </div>
            </li>

            <li>
              <strong>Free to Roam</strong>
              <div>
                PlotHook is completely free. No gold, gems, subscriptions, or
                hidden costs. This is a student-built project made for fun and
                connection — not profit.
              </div>
            </li>

            <li>
              <strong>Who Can Join the Party</strong>
              <div>
                To use the app, you must be of your local legal age, or
                supervised by your parent or guardian. You agree that all
                information you provide is true, especially when you describe
                your real-life self.
              </div>
            </li>

            <li>
              <strong>Respect the Realm</strong>
              <div>
                Harassment, hate speech, and general villainy will not be
                tolerated. Trolls will be cast into the void. Treat others with
                the same respect you'd give a beloved party member.
              </div>
            </li>

            <li>
              <strong>Data & Privacy</strong>
              <div>
                We only use your info (like email, age, location) to match you
                with fellow adventurers. We do not sell, trade, or misuse your
                data. The app follows German data protection rules (GDPR), as
                best we students can manage.
              </div>
            </li>

            <li>
              <strong>Community Content</strong>
              <div>
                You're responsible for what you post. Keep it civil, relevant to
                games, and safe-for-inns (no NSFW or copyrighted content). We
                reserve the right to remove content that breaks these rules or
                disrupts the harmony of our community.
              </div>
            </li>

            <li>
              <strong>Bugs, Glitches & Goblins</strong>
              <div>
                This is a student project — which means the occasional bug or
                oddity may appear. We appreciate your patience (and bug
                reports)! No guarantees, no uptime promises — just passion and
                dice rolls.
              </div>
            </li>

            <li>
              <strong>Third-Party Spells</strong>
              <div>
                If we ever use third-party tools (like maps, avatars, etc.),
                their own terms may apply. We’ll summon those links for you when
                needed.
              </div>
            </li>

            <li>
              <strong>Banishing Misuse</strong>
              <div>
                We reserve the right to restrict or ban accounts that break
                these terms, summon chaos, or otherwise disrupt the tavern. You
                can appeal by sending a raven (or email) to our contact channel.
                We’ll review your case with the wisdom of a thousand sages.
              </div>
            </li>

            <li>
              <strong>Changes to the Scroll</strong>
              <div>
                If we update these Terms, we’ll let you know in the app. You’ll
                always have the chance to review and accept (or walk away into
                the fog).
              </div>
            </li>

            <li>
              <strong>The Final Word (For Now)</strong>
              <div>
                These Terms are governed by the laws of Germany, where this
                humble project was forged with passion, joy and hard work, with
                the help of snacks.
              </div>
            </li>
          </ol>
          <p>
            By using PlotHook, you agree to these terms and conditions as well
            as to the ones mentioned in a more boring and official language in
            our website's Imprint section. If you do not agree, please do not
            use the app. We wish you safe travels and may your dice always roll
            true.
          </p>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default TermsModal;
