import React from "react";

interface IProps {
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
  setMainPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<IProps> = ({ setLoginPage, setMainPage }) => {
  const openLoginPage = (): void => {
    setMainPage(false);
    setLoginPage(true);
  };

  const openMainPage = (): void => {
    setLoginPage(false);
    setMainPage(true);
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
              <button className="nav-link btn" onClick={openMainPage}>
                Home
              </button>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn" onClick={openLoginPage}>
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
