import React, { useState } from "react";

//LAYOUTS
import CardWrapper from "../layouts/CardWrapper";

//TS
interface IState {
  username: string;
  password: string;
}

const initState: IState = {
  username: "",
  password: "",
};

const RegisterPage: React.FC = () => {
  const [userInput, setUserInuput] = useState<IState>(initState);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInuput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <CardWrapper>
      <div className="card mt-3 regCard">
        <div>Username: </div>
        <input
          type="text"
          name="username"
          value={userInput.username}
          onChange={inputHandler}
          className="form-control"
        />
        <br />
        <div>Password:</div>
        <input
          type="text"
          name="password"
          value={userInput.password}
          onChange={inputHandler}
          className="form-control"
        />
        <br />
      </div>
    </CardWrapper>
  );
};

export default RegisterPage;
