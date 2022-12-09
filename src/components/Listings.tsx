import React, { Fragment } from "react";

import { ITodo } from "../views/MyTodos";
import Todo from "./Todo";

interface IProps {
  data: ITodo[];
  renderAgain: () => void;
}

const Listings: React.FC<IProps> = ({ data, renderAgain }) => {
  const createTodos = (): JSX.Element[] => {
    return data.map((el) => {
      return <Todo key={el._id} todo={el} renderAgain={renderAgain} />;
    });
  };

  return <Fragment>{createTodos()}</Fragment>;
};

export default Listings;
