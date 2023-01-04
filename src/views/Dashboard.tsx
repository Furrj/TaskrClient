import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";

//COMPS
import CardWrapper from "../layouts/CardWrapper";

import { IUser } from "../App";
//TS
interface IProps {
  userInfo: IUser;
}

const Dashboard: React.FC<IProps> = ({ userInfo }) => {
  const [uncompleted, setUncompleted] = useState<number>(0);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (userInfo.valid === false) {
      return navigate("/login");
    } 
    fetchData();
    console.log("UseEffect Triggered");
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:5000/api", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userInfo.id }),
      });
      const rawData = await res.json();
      console.log(rawData);
      setUncompleted(rawData.length);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return <CardWrapper>
    <div className="card mt-3">
      <div className="card-title mt-3">{userInfo.username}'s Dashboard</div>
      <hr />
      <div className="card-body">Active Tasks: {uncompleted}</div>
      <Link to="/mytodos" className="btn btn-primary">View</Link>
      <hr />
      <div className="card-body">Completed Tasks:</div>
    </div>
  </CardWrapper>;
};

export default Dashboard;
