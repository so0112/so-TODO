import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputGroup from "../inputGroup/InputGroup";
import { postTodo, getTodos } from "../../api/axiosTodo";
import TodoList from "./TodoList";

function Todo() {
  const [todo, setTodo] = useState("");
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getTodos({ setDatas });
  }, []);

  const submitTodo = async (event) => {
    event.preventDefault();
    postTodo({ todo, setTodo, datas, setDatas });
  };

  return (
    <TodoFrame>
      <TodoForm onSubmit={submitTodo}>
        <h1>Todo List</h1>
        <div className="todo-input">
          <InputGroup
            className="post-input"
            placeholder="todo 생성하기"
            value={todo}
            setValue={setTodo}
          />

          <button type="button" className="post-button" onClick={submitTodo}>
            +
          </button>
        </div>
      </TodoForm>

      <TodoList datas={datas} setDatas={setDatas} todo={todo} setTodo={setTodo} />
    </TodoFrame>
  );
}

/** div -  Todo 프레임 */
const TodoFrame = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

/**form - Todo */
const TodoForm = styled.form`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  .todo-input {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .post-button {
    width: 45px;
    height: 45px;

    margin-left: 10px;
    border-radius: 5px;
    background-color: green;
    color: #ffffff;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 1px;
    transition: transform 1ms ease-in;
    cursor: pointer;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 400px;
    height: 45px;
  }
`;

export default Todo;
