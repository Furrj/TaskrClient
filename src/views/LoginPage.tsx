import React, { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { reqRoutes } from "../utils/reqRoutes";

//LAYOUTS
import CardWrapper from "../layouts/CardWrapper";

//TS
import { IUser } from "../App";

interface IState {
  username: string;
  password: string;
}

const initState: IState = {
  username: "",
  password: "",
};

//PROPS
interface IProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

const LoginPage: React.FC<IProps> = ({
  setLoggedIn,
  userInfo,
  setUserInfo,
}) => {
  //Init State
  const [userInput, setUserInuput] = useState<IState>(initState);
  const [invalidInfo, setInvalidInfo] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  //LOGIN FUNCTION
  const login = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<any> => {
    try {
      const res = await fetch(`${reqRoutes()}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });

      const data: IUser = await res.json();
      console.log(data);
      if (data.valid) {
        setLoggedIn(true);
        setUserInfo(data);
        setInvalidInfo(false);
        return navigate("/dashboard");
      } else {
        setInvalidInfo(true);
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  //INPUT HANDLER
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInuput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  //TOGGLE PASSWORD VIEW
  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const passwordBox = document.querySelector("#passwordBox");
    if (passwordBox) {
      const type =
        passwordBox.getAttribute("type") === "password" ? "text" : "password";
      passwordBox.setAttribute("type", type);
    }
    const eye3 = document.querySelector("#eye3");
    if (eye3) {
      if (eye3.classList.contains("fa-eye-slash")) {
        eye3.classList.remove("fa-eye-slash");
      } else {
        eye3.classList.toggle("fa-eye-slash");
      }
    }
  };

  return (
    <CardWrapper>
      <div className="card mt-3 loginCard">
        <div>Username: </div>
        <input
          type="text"
          name="username"
          value={userInput.username}
          onChange={inputHandler}
          className="form-control"
        />
        <br />
        <div id="loginPasswordBox">
          <div>Password:</div>
          <input
            type="password"
            name="password"
            id="passwordBox"
            value={userInput.password}
            onChange={inputHandler}
            className="form-control"
          />
          <i
            className={`fa-solid fa-eye fa-eye-slash`}
            id="eye3"
            onClick={togglePassword}
          />
        </div>
        <br />
        {invalidInfo && (
          <div>
            <div>Invalid Login Information</div>
            <br />
          </div>
        )}
        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
      </div>
    </CardWrapper>
  );
};

export default LoginPage;
