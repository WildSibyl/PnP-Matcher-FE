import purpleAt from "../assets/purpleAt.png";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-start text-left bg-pnp-white text-pnp-black gap-5 p-5 max-w-4xl mx-auto rounded-3xl">
      <h2 className="text-3xl font-bold mt-3 mb-4">Contact Us</h2>

      <p className="text-lg">
        Have a question, bug to report, or want to share your epic campaign
        story? We’d love to hear from you!
      </p>

      <p className="font-semibold">
        ✉️ Email us anytime at:{" "}
        <a
          href="mailto:support@pnpmatch.com"
          className="text-pnp-purple underline flex my-4 items-center justify-center"
        >
          support
          <span className="h-[20px] w-[20px]">
            <img src={purpleAt} alt="at" />
          </span>
          pnpmatch.com
        </a>
      </p>

      <p className="font-semibold">
        💬 Join our community on Discord:{" "}
        <a
          href="https://discord.gg/your-invite-code"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pnp-purple underline"
        >
          discord.gg/pnpmatch
        </a>
      </p>

      <p className="font-semibold">
        🛠 For bug reports and feature suggestions, visit our{" "}
        <a
          href="https://github.com/your-project/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pnp-purple underline"
        >
          GitHub Issues page
        </a>
        .
      </p>
    </div>
  );
};

export default Contact;
