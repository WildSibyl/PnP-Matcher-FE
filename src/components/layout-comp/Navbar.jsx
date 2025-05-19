import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";

import logo from "../../assets/logo.svg";
import dragonImage from "../../assets/dragonimage.png";
import profilePic from "../../assets/exampleProfilePic.jpg";
import Chatbubblesvg from "../../assets/chatbubble.svg?react";
import Closesvg from "../../assets/close.svg?react";
import Burgermenuesvg from "../../assets/burgermenu.svg?react";
import CrossedSwordssvg from "../../assets/crossedSwords.svg?react";
import Groupssvg from "../../assets/groups.svg?react";
import Accountsvg from "../../assets/account.svg?react";
import Usersvg from "../../assets/user.svg?react";

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
            <Chatbubblesvg
              className={`min-w-[8vw] fill-current ${setIconColor()} `}
            />
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
      {/* OPENED MENU */}

      <div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] z-10 flex flex-col justify-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-[rgba(8,11,31,0.80)] ease-in-out duration-200 ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        } `}
      >
        <div className="grid grid-cols-2 w-[80vw] mx-auto gap-4">
          <div className="flex col-span-2 text-pnp-white justify-center items-center gap-4">
            <img
              className="rounded-full h-[8vh] border-pnp-white border-1"
              src={profilePic}
              alt="username"
            ></img>
            <h3 className="font-semibold normal-case">Hi, Username!</h3>
          </div>
          <button
            style={{ backgroundImage: `url(${dragonImage})` }}
            className="bg-center bg-cover rounded-2xl items-center justify-center h-[18vh] text-pnp-white col-span-2 flex justify-center gap-2"
          >
            <CrossedSwordssvg />
            <h3>START MATCHING!</h3>
          </button>
          <button className="btn-navi">
            <Usersvg />
            <h3 className="font-semibold normal-case">Profile</h3>
          </button>
          <button className="btn-navi">
            <Chatbubblesvg />
            <h3 className="font-semibold normal-case ">Messages</h3>
          </button>
          <button className="btn-navi">
            <Groupssvg />
            <h3 className="font-semibold normal-case ">Groups</h3>
          </button>
          <button className="btn-navi">
            <Accountsvg />
            <h3 className="font-semibold normal-case ">Account</h3>
          </button>
        </div>
        <div className="flex text-pnp-white normal-case w-full justify-center gap-6 mt-10">
          <h3 className="normal-case">Imprint</h3>
          <h3 className="normal-case">Privacy</h3>
        </div>
      </div>
    </>
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
