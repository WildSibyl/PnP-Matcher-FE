import { Link, NavLink } from "react-router";
import { useWebSocketContext } from "../../context/WSContextProvider";
import CrossedSwordssvg from "../../assets/crossedSwords.svg?react";
import Groupssvg from "../../assets/groups.svg?react";
import Accountsvg from "../../assets/account.svg?react";
import Usersvg from "../../assets/user.svg?react";
import dragonImage from "../../assets/dragonimage.png";
import profilePic from "../../assets/exampleProfilePic.jpg";
import Chatbubblesvg from "../../assets/chatbubble.svg?react";

const NavMenu = ({ menuOpen, setMenuOpen, user, logOut }) => {
  const { totalUnreadCount, totalInvitesCount } = useWebSocketContext();

  return (
    <div
      className={`fixed top-0 left-0 w-[100vw] h-[100vh] z-[50] flex flex-col justify-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-[rgba(8,11,31,0.80)] ease-in-out duration-200 ${
        menuOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      } `}
    >
      <div className="grid grid-cols-2 w-[80vw] mx-auto gap-4">
        {user ? (
          <div className="flex col-span-2 text-pnp-white justify-center items-center gap-4">
            <img
              className="rounded-full h-[8vh] border-pnp-white border-1"
              src={profilePic}
              alt="username"
            ></img>
            <h3 className="font-semibold normal-case">{`Hi, ${user.userName}!`}</h3>
          </div>
        ) : (
          ""
        )}
        <Link
          to="/search"
          style={{ backgroundImage: `url(${dragonImage})` }}
          onClick={() => setMenuOpen(false)}
          className="bg-center bg-cover rounded-2xl items-center justify-center h-[18vh] text-pnp-white col-span-2 flex gap-2"
        >
          <CrossedSwordssvg />
          <h3>START MATCHING!</h3>
        </Link>

        {user ? (
          <>
            <Link
              to="/profile"
              className="btn-navi"
              onClick={() => setMenuOpen(false)}
            >
              <Usersvg />
              <h3 className="font-semibold normal-case">Profile</h3>
            </Link>
            <Link
              to="/chat"
              className="btn-navi"
              onClick={() => setMenuOpen(false)}
            >
              <div className="relative">
                <Chatbubblesvg />
                {totalUnreadCount > 0 && (
                  <div
                    className="absolute top-3 left-3.5 min-w-[18px] w-5 h-5 rounded-full bg-pnp-darkpurple text-pnp-white text-xs font-bold flex items-center justify-center select-none"
                    aria-label={`${totalUnreadCount} unread messages`}
                    title={`${totalUnreadCount} unread messages`}
                  >
                    {totalUnreadCount}
                  </div>
                )}
              </div>
              <h3 className="font-semibold normal-case ">Messages</h3>
            </Link>
            <Link
              to="/grouplist"
              className="btn-navi"
              onClick={() => setMenuOpen(false)}
            >
              <div className="relative">
                <Groupssvg />
                {totalInvitesCount > 0 && (
                  <div
                    className="absolute top-[16px] left-4.5 min-w-[18px] w-5 h-5 rounded-full bg-pnp-darkpurple text-pnp-white text-xs font-bold flex items-center justify-center select-none"
                    aria-label={`${totalInvitesCount} group invites pending`}
                    title={`${totalInvitesCount} group invites pending`}
                  >
                    {totalInvitesCount}
                  </div>
                )}
              </div>
              <h3 className="font-semibold normal-case ">Groups</h3>
            </Link>
            <Link
              to="/settings"
              className="btn-navi"
              onClick={() => setMenuOpen(false)}
            >
              <Accountsvg />
              <h3 className="font-semibold normal-case ">Settings</h3>
            </Link>
          </>
        ) : (
          ""
        )}
      </div>

      {user ? (
        <div className="flex flex-col col-span-2 gap-4 mt-5 justify-center text-center">
          <button
            className="btn-secondary-light font-semibold normal-case cursor-pointer mx-auto"
            onClick={logOut}
          >
            <h3 className="font-semibold normal-case">Log out</h3>
          </button>
        </div>
      ) : (
        <div className="flex flex-col col-span-2 gap-4 justify-center text-center">
          <div className="flex gap-4 justify-center mt-5">
            <NavLink
              onClick={() => setMenuOpen(false)}
              className="btn-secondary-light"
              to="/register"
            >
              Register
            </NavLink>
            <NavLink
              onClick={() => setMenuOpen(false)}
              className="btn-secondary-light"
              to="/login"
            >
              Login
            </NavLink>
          </div>
        </div>
      )}

      <div className="flex text-pnp-white normal-case w-full justify-center gap-6 mt-10">
        <h3 className="normal-case">Imprint</h3>
        <h3 className="normal-case">Privacy</h3>
      </div>
    </div>
  );
};

export default NavMenu;
