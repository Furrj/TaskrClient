import React, { useState, useEffect } from "react";
import { reqRoutes } from "../utils/reqRoutes";

//COMPS
import Listings from "../components/Listings";

//TS
import { ITodo } from "./MyTodos";

interface IProps {
  userID: string;
}

const MyCompletedTodos: React.FC<IProps> = ({ userID }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  //HELPER FUNCTIONS
  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch(`${reqRoutes()}/api`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userID }),
      });
      const rawData = await res.json();
      const filteredData: ITodo[] = [];
      for (let todo of rawData) {
        if (todo.completed === true) {
          filteredData.push(todo);
        }
      }
      setTodos(filteredData);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <div className="allTodosCont mt-3">
      {todos.map((el) => {
        return (
          <div key={el._id} className="card m-3 todo">
            <div className="card-body">
              <div className="card-title">{el.title}</div>
              <hr />
              <div className="card-text">
                {el.text}
                <hr />
                {el.due}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyCompletedTodos;
