import React, { useState } from "react";

//UI
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

//VIEWS
import MainPage from "./views/MainPage";
import LoginPage from "./views/LoginPage";

const App: React.FC = () => {
  //VIEW CONTROLS
  const [mainPage, setMainPage] = useState<boolean>(true);
  const [loginPage, setLoginPage] = useState<boolean>(false);

  return (
    <div>
      <Navbar setLoginPage={setLoginPage} setMainPage={setMainPage} />
      {mainPage && <MainPage />}
      {loginPage && <LoginPage />}
      <Footer />
    </div>
  );
};

export default App;
