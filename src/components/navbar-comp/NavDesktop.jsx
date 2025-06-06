import { Link } from "react-router";
import { useWebSocketContext } from "../../context/WSContextProvider";
import CrossedSwordssvg from "../../assets/crossedSwords.svg?react";
import Groupssvg from "../../assets/groups.svg?react";
import Accountsvg from "../../assets/account.svg?react";
import Usersvg from "../../assets/user.svg?react";
import Chatbubblesvg from "../../assets/chatbubble.svg?react";
import Logoutsvg from "../../assets/logout.svg?react";

const NavDesktop = ({ logo, user, logOut }) => {
  const { totalUnreadCount, totalInvitesCount } = useWebSocketContext();

  return (
    <div className="flex justify-between items-center h-[8vh] overscroll-none">
      <Link to="/">
        <img
          src={logo}
          className="cursor-pointer hover:scale-98 *:ease-in-out duration-200"
          alt="plothook logo"
        ></img>
      </Link>
      {/* Test Link for debugging */}
      <Link to="/test">
        <div className="btn-secondary-light btn-icon h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200">
          🛠
        </div>
      </Link>
      {/* Navigation Links */}
      {user ? (
        <div className="flex items-center gap-8 xl:gap-10 mr-2">
          {user.permission === "admin" ? (
            <Link to="/admin">
              <div className="btn-secondary-light btn-icon h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200">
                👑
              </div>
            </Link>
          ) : null}
          <Link
            to="/search"
            className="btn-secondary-light btn-icon h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200"
          >
            <CrossedSwordssvg className="max-h-[1rem]" />
            Find players!
          </Link>
          <div className="tooltip tooltip-bottom group">
            <div className="tooltip-content opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full mb-2 px-3 py-1 rounded-xl text-pnp-white text-sm font-semibold bg-pnp-blue shadow-lg animate-none group-hover:animate-tooltip-pop transition-all">
              CHAT
            </div>
            <Link to="/chat">
              <div className="relative">
                <Chatbubblesvg className={`btn-desktopnavi`} />
                {totalUnreadCount > 0 && (
                  <div
                    className="absolute top-3 left-3.5 min-w-[18px] w-5 h-5 rounded-full bg-pnp-darkpurple text-white text-xs font-bold flex items-center justify-center select-none"
                    aria-label={`${totalUnreadCount} unread messages`}
                    title={`${totalUnreadCount} unread messages`}
                  >
                    {totalUnreadCount}
                  </div>
                )}
              </div>
            </Link>
          </div>

          <div className="tooltip tooltip-bottom group">
            <div className="tooltip-content opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full mb-2 px-3 py-1 rounded-xl text-pnp-white text-sm font-semibold bg-pnp-blue shadow-lg animate-none group-hover:animate-tooltip-pop transition-all">
              PROFILE
            </div>
            <Link to="/profile">
              <Usersvg className={`btn-desktopnavi max-h-[1.2rem]`} />
            </Link>
          </div>

          <div className="tooltip tooltip-bottom group">
            <div className="tooltip-content opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full mb-2 px-3 py-1 rounded-xl text-pnp-white text-sm font-semibold bg-pnp-blue shadow-lg animate-none group-hover:animate-tooltip-pop transition-all">
              GROUPS
            </div>
            <Link to="/grouplist">
              <div className="relative">
                <Groupssvg className={`btn-desktopnavi`} />
                {totalInvitesCount > 0 && (
                  <div
                    className="absolute top-[12px] left-3.5 min-w-[18px] w-5 h-5 rounded-full bg-pnp-darkpurple text-white text-xs font-bold flex items-center justify-center select-none"
                    aria-label={`${totalInvitesCount} group invites pending`}
                    title={`${totalInvitesCount} group invites pending`}
                  >
                    {totalInvitesCount}
                  </div>
                )}
              </div>
            </Link>
          </div>

          <div className="tooltip tooltip-bottom group">
            <div className="tooltip-content opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full mb-2 px-3 py-1 rounded-xl text-pnp-white text-sm font-semibold bg-pnp-blue shadow-lg animate-none group-hover:animate-tooltip-pop transition-all">
              SETTINGS
            </div>
            <Link to="/settings">
              <Accountsvg className={`btn-desktopnavi`} />
            </Link>
          </div>

          <div className="tooltip tooltip-bottom group">
            <div className="tooltip-content opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full mb-2 px-3 py-1 rounded-xl text-pnp-white text-sm font-semibold bg-pnp-blue shadow-lg animate-none group-hover:animate-tooltip-pop transition-all">
              LOGOUT
            </div>
            <button
              className=" flex items-center p-0 m-0 h-5 w-5"
              onClick={logOut}
            >
              <Logoutsvg className={`btn-desktopnavi`} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            to="/search"
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
