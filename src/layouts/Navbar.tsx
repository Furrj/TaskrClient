import React from "react";
import { Link } from "react-router-dom";
import { initState } from "../App";
import { reqRoutes } from "../utils/reqRoutes";

//TS
import { IUser } from "../App";

interface IProps {
  userName: string;
  loggedIn: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

const Navbar: React.FC<IProps> = ({
  loggedIn,
  setUserInfo,
  userName,
}) => {
  const logout = async (e: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
    setUserInfo(initState);

    const req = await fetch(`${reqRoutes()}/logout`, {
      credentials: "include",
    });
    await req.json();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <div className="navbar-brand text-info">Taskr</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link btn" to="/">
                Home
              </Link>
            </li>
          </ul>
          {!loggedIn && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link btn" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          )}
          {loggedIn && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link btn text-info" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn" to="/login" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
