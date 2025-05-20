import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import NavMenu from "../navbar-comp/NavMenu";
import NavMobile from "../navbar-comp/NavMobile";

import logo from "../../assets/logo.svg";

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

  return (
    <>
      <div
        className={`sticky top-0 w-full mt-0 pt-4 pb-3 px-6 z-40 transition-colors duration-300 ease-in-out ${
          scrolled
            ? "h-full w-full rounded-md bg-[rgba(112,36,219,0.1)] bg-clip-padding backdrop-filter backdrop-blur-sm pnp-shadow"
            : "bg-transparent"
        }`}
      >
        <NavMobile
          logo={logo}
          user={user}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </div>
      <NavMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        user={user}
        logOut={logOut}
      />
    </>
  );
};

export default Navbar;
