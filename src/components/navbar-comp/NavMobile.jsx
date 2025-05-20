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
      <div className="flex gap-6">
        {user ? (
          <Chatbubblesvg
            className={`min-w-[8vw] fill-current cursor-pointer text-pnp-white`}
          />
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
