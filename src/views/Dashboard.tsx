import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";
import { reqRoutes } from "../utils/reqRoutes";

//COMPS
import CardWrapper from "../layouts/CardWrapper";

import { IUser } from "../App";
//TS
interface IProps {
  userInfo: IUser;
}

const Dashboard: React.FC<IProps> = ({ userInfo }) => {
  const [uncompleted, setUncompleted] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    fetchData();
    console.log("UseEffect Triggered");
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch(`${reqRoutes()}/api`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userInfo.id }),
      });
      const rawData = await res.json();
      const completedTodos = [];
      const uncompletedTodos = [];
      for (let todo of rawData) {
        if (todo.completed === true) {
          completedTodos.push(todo);
        } else {
          uncompletedTodos.push(todo);
        }
      }
      setUncompleted(uncompletedTodos.length);
      setCompleted(completedTodos.length);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <CardWrapper>
      <div className="card mt-3">
        <div className="card-title mt-3">{userInfo.username}'s Dashboard</div>
        <hr />
        <div className="card-body">Active Tasks: {uncompleted}</div>
        <Link to="/mytodos">
          <button className="btn btn-primary">View</button>
        </Link>
        <hr />
        <div className="card-body">Completed Tasks: {completed}</div>
        <Link to="/mycompletedtodos">
          <button className="btn btn-primary">View</button>
        </Link>
        <br />
      </div>
    </CardWrapper>
  );
};

export default Dashboard;
