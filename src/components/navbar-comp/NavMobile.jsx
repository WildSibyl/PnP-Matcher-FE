import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo.svg";
import Chatbubblesvg from "../../assets/chatbubble.svg?react";
import Closesvg from "../../assets/close.svg?react";
import Burgermenuesvg from "../../assets/burgermenu.svg?react";

const NavMobile = ({ user, menuOpen, setMenuOpen }) => {
  return (
    <div className="flex justify-between items-center h-[7vh]">
      <Link to="/">
        <img
          src={logo}
          className="cursor-pointer hover:scale-98 *:ease-in-out duration-200"
          alt="pnpmatch logo"
        ></img>
      </Link>
      {/* Test Link for debugging */}
      <Link to="/test">
        <div className="btn-secondary-light btn-icon p-3 h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200">
          🛠
        </div>
      </Link>
      <div className="flex gap-6">
        {user ? (
          <div className="flex items-center gap-2">
            {user.permission === "admin" ? (
              <Link to="/admin">
                <div className="btn-secondary-light btn-icon p-2 h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200">
                  👑
                </div>
              </Link>
            ) : null}
            <Chatbubblesvg
              className={`min-w-[8vw] fill-current cursor-pointer text-pnp-white`}
            />
          </div>
        ) : (
          <NavLink
            onClick={() => setMenuOpen(false)}
            className="btn-primary-light max-h-[35px]"
            to="/register"
          >
            Sign up!
          </NavLink>
        )}

        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <Closesvg
              className={`min-w-[8vw] fill-current cursor-pointer text-pnp-white `}
            />
          ) : (
            <Burgermenuesvg
              className={`min-w-[8vw] fill-current cursor-pointer text-pnp-white `}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavMobile;
