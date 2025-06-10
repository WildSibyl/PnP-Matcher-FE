import purpleAt from "../assets/purpleAt.png";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-start text-left bg-pnp-white text-pnp-black gap-5 p-5 max-w-4xl mx-auto rounded-3xl">
      <h2 className="text-3xl font-bold mt-3 mb-4">Contact Us</h2>

      <p className="text-lg">
        Have a question, bug to report, or want to share your epic campaign
        story?
      </p>
      <p className="text-lg">We’d love to hear from you!</p>

      <p className="font-semibold">
        💬 Join our community on Discord:{" "}
        <a
          href="https://discord.gg/GnMhu7jyUQ"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pnp-purple underline"
        >
          discord.gg/plothook
        </a>
      </p>
      <p className="font-semibold">✉️ Email us anytime at: </p>
      <p className="font-semibold">
        <a
          href="mailto:contact.plothook@gmail.com"
          className="text-pnp-purple underline flex items-center justify-center"
        >
          contact.plothook
          <span className="h-[20px] w-[20px]">
            <img src={purpleAt} alt="at" />
          </span>
          gmail.com
        </a>
      </p>
    </div>
  );
};

export default Contact;
