import CrossedSwordssvg from "../../assets/crossedSwords.svg?react";
import Groupssvg from "../../assets/groups.svg?react";
import Accountsvg from "../../assets/account.svg?react";
import Usersvg from "../../assets/user.svg?react";
import Chatbubblesvg from "../../assets/chatbubble.svg?react";
import { Link } from "react-router";

const NavDesktop = ({ logo, user }) => {
  return (
    <div className="flex justify-between items-center h-[8vh]">
      <Link to="/">
        <img
          src={logo}
          className="cursor-pointer hover:scale-98 *:ease-in-out duration-200"
          alt="pnpmatch logo"
        ></img>
      </Link>
      {/* Navigation Links */}
      {user ? (
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="btn-secondary-light btn-icon h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200"
          >
            <CrossedSwordssvg className="max-h-[1rem]" />
            Find players!
          </Link>
          <div className="tooltip tooltip-bottom">
            <div className="tooltip-content opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full mb-2 px-3 py-1 rounded-xl text-pnp-white text-sm font-semibold bg-pnp-blue shadow-lg animate-none group-hover:animate-tooltip-pop transition-all">
              CHAT
            </div>
            <Link to="/">
              <Chatbubblesvg className={`btn-desktopnavi`} />
            </Link>
          </div>

          <div className="tooltip tooltip-bottom">
            <div className="tooltip-content opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full mb-2 px-3 py-1 rounded-xl text-pnp-white text-sm font-semibold bg-pnp-blue shadow-lg animate-none group-hover:animate-tooltip-pop transition-all">
              PROFILE
            </div>
            <Link to="/">
              <Usersvg className={`btn-desktopnavi max-h-[1.2rem]`} />
            </Link>
          </div>

          <div className="tooltip tooltip-bottom">
            <div className="tooltip-content opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full mb-2 px-3 py-1 rounded-xl text-pnp-white text-sm font-semibold bg-pnp-blue shadow-lg animate-none group-hover:animate-tooltip-pop transition-all">
              GROUPS
            </div>
            <Link to="/">
              <Groupssvg className={`btn-desktopnavi`} />
            </Link>
          </div>

          <div className="tooltip tooltip-bottom group">
            <div className="tooltip-content opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full mb-2 px-3 py-1 rounded-xl text-pnp-white text-sm font-semibold bg-pnp-blue shadow-lg animate-none group-hover:animate-tooltip-pop transition-all">
              ACCOUNT
            </div>
            <Link to="/">
              <Accountsvg className={`btn-desktopnavi`} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="btn-secondary-light btn-icon border-none h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200"
          >
            <CrossedSwordssvg className="max-h-[1rem]" />
            Find players!
          </Link>
          <Link
            to="/login"
            className="btn-secondary-light  h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="btn-primary-light  h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200"
          >
            Sign up!
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavDesktop;
