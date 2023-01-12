import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { reqRoutes } from "./utils/reqRoutes";

//UI
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

//VIEWS
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import HomePage from "./views/HomePage";
import MyTodos from "./views/MyTodos";
import MyCompletedTodos from "./views/MyCompletedTodos";
import Dashboard from "./views/Dashboard";
import TestPage from "./views/TestPage";

//STATE
export type IUser = {
  username: string;
  id: string;
  valid: boolean;
};

export const initState = {
  username: "",
  id: "",
  valid: false,
};

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUser>(initState);

  useEffect(() => {
    validateUser();
  }, []);

  const validateUser = async () => {
    try {
      const req = await fetch(`${reqRoutes()}/api/validate`, {
        credentials: "include",
      });
      const res = await req.json();
      setUserInfo(res);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar
          userName={userInfo.username}
          loggedIn={userInfo.valid}
          setUserInfo={setUserInfo}
        />
        <Routes>
          <Route path="/testpage" element={<TestPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <LoginPage userInfo={userInfo} setUserInfo={setUserInfo} />
            }
          />
          <Route
            path="/register"
            element={<RegisterPage setUserInfo={setUserInfo} />}
          />
          <Route path="/mytodos" element={<MyTodos userId={userInfo.id} />} />
          <Route
            path="mycompletedtodos"
            element={<MyCompletedTodos userID={userInfo.id} />}
          />
          <Route path="dashboard" element={<Dashboard userInfo={userInfo} />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
