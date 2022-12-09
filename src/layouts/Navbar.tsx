import React from "react";
import { Link } from "react-router-dom";

import { initState } from "../App";

//TS
import { IUser } from "../App";

interface IProps {
  userName: string;
  loggedIn: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<IProps> = ({ loggedIn, setUserInfo, setLoggedIn, userName }) => {
  const logout = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    setLoggedIn(false);
    setUserInfo(initState);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <div className="navbar-brand text-info">ToDo 2.0</div>
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
                <Link className="nav-link btn" to="/mytodos">
                  My Todos
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
