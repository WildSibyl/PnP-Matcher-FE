import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <div>
      <a>NAVBAR</a>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            PnPMatcher
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              {user ? <NavLink to="/create">Create group</NavLink> : null}
            </li>
            <li>
              {user ? (
                <span>{`Hi, ${user.firstName}!`}</span>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
