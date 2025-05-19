import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import NavMenu from "../navbar-comp/NavMenu";

import logo from "../../assets/logo.svg";
import Chatbubblesvg from "../../assets/chatbubble.svg?react";
import Closesvg from "../../assets/close.svg?react";
import Burgermenuesvg from "../../assets/burgermenu.svg?react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  //Check if page is scrolled
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

  //Check if menu is opened
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  const setIconColor = () => {
    if (scrolled) return "text-pnp-white";
    return "text-pnp-white";
  };

  return (
    <>
      <div
        className={`sticky top-0 w-full mt-0 pt-6 pb-3 px-6 z-40 transition-colors duration-300 ease-in-out ${
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
          <div className="flex gap-6">
            {user ? (
              <Chatbubblesvg
                className={`min-w-[8vw] fill-current ${setIconColor()} `}
              />
            ) : (
              ""
            )}

            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <Closesvg
                  className={`min-w-[8vw] fill-current ${setIconColor()} `}
                />
              ) : (
                <Burgermenuesvg
                  className={`min-w-[8vw] fill-current ${setIconColor()} `}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <NavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={user} />
    </>
  );
};

export default Navbar;
