import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="flex flex-col items-center justify-start text-left bg-pnp-white text-pnp-black gap-5 p-5 pb-10 max-w-4xl mx-auto rounded-3xl">
      <h2 className="text-3xl font-bold mt-3 mb-4">Privacy Policy</h2>

      <p>
        At <strong>PlotHook</strong>, your privacy is important to us. We’re
        committed to protecting the personal information you share with us and
        ensuring your experience remains safe and transparent.
      </p>

      <h3 className="text-xl font-semibold mt-6">Information We Collect</h3>
      <p>
        We collect information you provide during registration, profile
        creation, and group participation. This may include your name, email,
        location (for matchmaking), and your preferences for games and
        availability.
      </p>

      <h3 className="text-xl font-semibold mt-6">
        How We Use Your Information
      </h3>
      <p>
        We use your information solely to connect you with relevant players and
        groups, and to improve our platform. We do not sell or share your
        personal data with third parties for advertising.
      </p>

      <h3 className="text-xl font-semibold mt-6">Cookies</h3>
      <p>
        Our site uses cookies to remember preferences and optimize your
        experience. You can disable cookies in your browser settings if desired.
      </p>

      <h3 className="text-xl font-semibold mt-6">Data Security</h3>
      <p>
        We take security seriously and use encryption, secure authentication,
        and regular audits to protect your data.
      </p>

      <h3 className="text-xl font-semibold mt-6">Your Rights</h3>
      <p>
        You may request to view, edit, or delete your data at any time. Contact
        us at the email below for data requests.
      </p>

      <h3 className="text-xl font-semibold mt-6">Changes to This Policy</h3>
      <p>
        We may update this Privacy Policy occasionally. When we do, we’ll notify
        you through the site or by email.
      </p>

      <p className="mt-6 font-semibold">
        If you have any questions about this policy, please feel free to{" "}
        <Link to="/contact" className="underline hover:text-pnp-purple">
          contact us!
        </Link>
      </p>
    </div>
  );
};

export default Privacy;
