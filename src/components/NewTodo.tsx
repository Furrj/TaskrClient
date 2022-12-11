import React, { useState } from "react";

interface IProps {
  toggleAdding: () => void;
  renderAgain: () => void;
  userID: string;
}

interface IState {
  title: string;
  text: string;
  due: string;
}

interface ITodo {
  title: string;
  text: string;
  due: string;
  completed: boolean;
  user: string;
}

const initState = {
  title: "",
  text: "",
  due: "",
  completed: false,
};

const NewTodo: React.FC<IProps> = ({ renderAgain, toggleAdding, userID }) => {
  const [info, setInfo] = useState<IState>(initState);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const onAdd = (e: React.MouseEvent<HTMLButtonElement>): void => {
    sendPost();
    toggleAdding();
  };

  const sendPost = async (): Promise<any> => {
    const newTodo: ITodo = {
      title: info.title,
      text: info.text,
      due: info.due,
      completed: false,
      user: userID,
    };

    try {
      const res = await fetch("http://localhost:5000/api/newTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      await res.json();
      renderAgain();
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <div
      className="card m-3"
      style={{ width: "30%", backgroundColor: "aquamarine" }}
    >
      <div className="card-body">
        <h3 className="card-title">
          <input
            className="form-control"
            onChange={inputHandler}
            value={info.title}
            type="text"
            name="title"
            placeholder="Title"
          />
        </h3>
        <hr />
        <div className="card-text">
          <textarea
            className="form-control mb-3"
            onChange={inputHandler}
            value={info.text}
            name="text"
            placeholder="Tasks"
          />
        </div>
        <hr />
        <label htmlFor="due">Due By: </label>{" "}
        <input
          type="date"
          name="due"
          id="due"
          onChange={inputHandler}
          value={info.due}
        />
        <hr />
        <div className="card-text">
          <button onClick={onAdd} className="btn btn-info me-3 text-light">
            Add
          </button>
          <button onClick={toggleAdding} className="btn btn-danger text-light">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTodo;
