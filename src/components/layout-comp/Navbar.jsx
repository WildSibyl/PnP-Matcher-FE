import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.svg";
import Chatbubblesvg from "../../assets/chatbubble.svg?react";
import Closesvg from "../../assets/close.svg?react";
import Burgermenuesvg from "../../assets/burgermenu.svg?react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let isScrolling = false;
    const handleScroll = () => {
      if (window.scrollY > 10) {
        isScrolling = true;
      } else {
        isScrolling = false;
      }

      setScrolled(isScrolling);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setIconColor = () => {
    if (scrolled) return "text-pnp-white";
    return "text-pnp-white";
  };

  return (
    <div
      className={`sticky top-0 w-full mt-0 pt-6 pb-3 px-6 z-15 transition-colors duration-300 ease-in-out ${
        scrolled
          ? "h-full w-full rounded-md bg-[rgba(112,36,219,0.1)] bg-clip-padding backdrop-filter backdrop-blur-sm pnp-shadow"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between">
        <Link to="/">
          <img
            src={logo}
            className="cursor-pointer hover:scale-98 *:ease-in-out duration-200"
            alt="pnpmatch logo"
          ></img>
        </Link>
        <div className="flex gap-8">
          <Chatbubblesvg className={`fill-current ${setIconColor()} `} />
          <Burgermenuesvg className={`fill-current ${setIconColor()} `} />
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              {user ? <NavLink to="/create">Create group</NavLink> : null}
            </li>
            <li>
              {user ? (
                <span>{`Hi, ${user.userName}!`}</span>
              ) : (
                <NavLink to="/register">Register</NavLink>
              )}
            </li>
            <li>
              {user ? (
                <span onClick={logOut}>Log out</span>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </li>
          </ul>
        </div> */
}

export default Navbar;
