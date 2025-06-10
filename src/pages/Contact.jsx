import RenContact from "../assets/ren/Ren-contact.png";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-start text-left bg-pnp-white text-pnp-black gap-5 p-5 pb-10 max-w-4xl mx-auto rounded-3xl">
      <h2 className="text-3xl font-bold mt-3 mb-4">Contact Us</h2>

      <p className="text-lg -mb-2">
        Have a question, bug to report, or want to share your epic campaign
        story?
      </p>
      <img
        src={RenContact}
        alt="Ren holding a book, super happy"
        className="w-[200px] h-[200px] object-contain"
      />
      <p className="text-lg">We’d love to hear from you!</p>

      {[
        <p
          className="font-semibold flex flex-wrap items-center gap-2"
          key="discord"
        >
          Join our community on Discord:
          <a
            href="https://discord.gg/GnMhu7jyUQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pnp-purple hover:underline hover:text-pnp-darkpurple"
          >
            discord.gg/plothook
          </a>
        </p>,
        <div key="email">
          <p className="font-semibold flex flex-wrap items-center gap-2">
            Email us anytime at:
            <a
              href="mailto:contact.plothook@gmail.com"
              className="text-pnp-purple hover:underline hover:text-pnp-darkpurple flex items-center justify-center"
            >
              contact.plothook@gmail.com
            </a>
          </p>
        </div>,
      ].map((content, i) => (
        <li key={i} className="flex items-start gap-2">
          <svg
            className="w-4 h-4 text-pnp-darkpurple mt-1 flex-shrink-0"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="6,0 12,6 6,12 0,6" fill="currentColor" />
          </svg>
          {content}
        </li>
      ))}
    </div>
  );
};

export default Contact;
