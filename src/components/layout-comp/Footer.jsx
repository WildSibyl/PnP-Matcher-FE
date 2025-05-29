import { Link } from "react-router";

const Footer = () => {
  return (
    <footer>
      <div className="text-pnp-white flex flex-col items-center justify-center gap-5 m-5">
        <h1 className="w-[60%] flex flex-col text-center justify-center">
          YOUR ADVENTURE IS ABOUT TO BEGIN.
        </h1>
        <div className="border border-pnp-white w-full"></div>
        <div className="flex flex-col gap-3 w-full">
          <p>2025 - PnPMatch</p>
          <div className="text-pnp-white underline flex flex-wrap gap-4 ">
            <Link to="/login" className="hover:text-pnp-purple">
              Login
            </Link>
            <Link to="/register" className="hover:text-pnp-purple">
              Register
            </Link>
            <Link to="/imprint" className="hover:text-pnp-purple">
              Imprint
            </Link>
            <Link to="/privacy" className="hover:text-pnp-purple">
              Privacy
            </Link>
            <Link to="/contact" className="hover:text-pnp-purple">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
