import React, { useState } from "react";

import { ITodo } from "../views/MainPage";

interface IProps {
  todo: ITodo;
  renderAgain: () => void;
}

interface IState {
  title: string;
  text: string;
}

const Todo: React.FC<IProps> = ({ todo, renderAgain }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [info, setInfo] = useState<IState>({
    title: todo.title,
    text: todo.text,
  });

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const sendPut = async (data: object): Promise<any> => {
    try {
      const res = await fetch("http://localhost:5000/api", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const sendDelete = async (): Promise<void> => {
    try {
      const res = await fetch(`http://localhost:5000/api/${todo._id}`, {
        method: "DELETE",
      });
      await res.json();
      renderAgain();
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const toggleEdit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (editMode) {
      const sendData: object = {
        id: todo._id,
        title: info.title,
        text: info.text,
      };
      const res = await sendPut(sendData);
    }
    setEditMode(!editMode);
  };

  const toggleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!editMode) {
      sendDelete();
    } else {
      setEditMode(false);
    }
  };

  return (
    <div className="card m-3 todo">
      <div className="card-body">
        <h3 className="card-title">
          {editMode ? (
            <input
              className="form-control"
              onChange={inputHandler}
              type="text"
              name="title"
              value={info.title}
            />
          ) : (
            info.title
          )}
        </h3>
        <hr />
        <div className="card-text">
          {editMode ? (
            <textarea
              className="form-control"
              onChange={inputHandler}
              name="text"
              value={info.text}
            ></textarea>
          ) : (
            info.text
          )}
        </div>
        <hr />
        <div className="card-text">
          <button className="btn btn-info me-3 text-light" onClick={toggleEdit}>
            {editMode ? "Submit" : "Edit"}
          </button>
          <button
            className="btn btn-secondary text-light"
            onClick={toggleDelete}
          >
            {editMode ? "Cancel" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
