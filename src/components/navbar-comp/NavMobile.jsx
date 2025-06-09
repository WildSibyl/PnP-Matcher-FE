import { Link, NavLink } from "react-router-dom";
import { useWebSocketContext } from "../../context/WSContextProvider";
import logo from "../../assets/logo.svg";
import Chatbubblesvg from "../../assets/chatbubble.svg?react";
import Closesvg from "../../assets/close.svg?react";
import Burgermenuesvg from "../../assets/burgermenu.svg?react";

const NavMobile = ({ user, menuOpen, setMenuOpen }) => {
  const { totalUnreadCount, totalInvitesCount } = useWebSocketContext();

  return (
    <div className="flex justify-between items-center h-[7vh]">
      <Link to="/">
        <img
          src={logo}
          className="cursor-pointer hover:scale-98 *:ease-in-out duration-200"
          alt="plothook logo"
        ></img>
      </Link>
      <div className="flex gap-6">
        {user ? (
          <div className="flex items-center gap-2">
            {user.permission === "admin" ? (
              <>
                {/* Test Link for debugging */}
                <Link to="/test">
                  <div className="btn-secondary-light btn-icon p-3 h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200">
                    🛠
                  </div>
                </Link>
                <Link to="/admin">
                  <div className="btn-secondary-light btn-icon p-2 h-[44px] cursor-pointer hover:scale-98 *:ease-in-out duration-200">
                    👑
                  </div>
                </Link>
              </>
            ) : null}
            <Link to="/chat">
              <div className="relative">
                <Chatbubblesvg className={`btn-desktopnavi`} />
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
            </Link>
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

        {menuOpen ? (
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Closesvg
              className={`fill-current cursor-pointer text-pnp-white `}
            />
          </button>
        ) : (
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <div className="relative translate-y-[3px]">
              <Burgermenuesvg
                className={`fill-current cursor-pointer text-pnp-white`}
              />
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
          </button>
        )}
      </div>
    </div>
  );
};

export default NavMobile;
