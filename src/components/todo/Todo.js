import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputGroup from "../inputGroup/InputGroup";
import { postTodo, getTodos } from "../../api/handleTodo";
import TodoList from "./TodoList";

function Todo() {
  const TODO_CREATE_URL = `https://pre-onboarding-selection-task.shop/todos`;
  const TODO_GET_URL = "https://pre-onboarding-selection-task.shop/todos";

  const [todo, setTodo] = useState("");
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getTodos(TODO_GET_URL, setDatas); // 닉네임 로컬 스토리지 저장
  }, []);

  /** todo 제출 함수 */
  const submitTodo = async (event) => {
    event.preventDefault();
    postTodo(TODO_CREATE_URL, todo, setTodo, datas, setDatas);
  };

  return (
    <TodoFrame>
      <TodoForm>
        <h1>Todo 생성</h1>
        <InputGroup
          placeholder="투두리스트"
          value={todo}
          setValue={setTodo}
          // error={error.userId}
        />

        <button type="button" className onClick={submitTodo}>
          할일 목록 생성
        </button>
      </TodoForm>

      <TodoList datas={datas} setDatas={setDatas} />
    </TodoFrame>
  );
}

/** div - 로그인 프레임 */
const TodoFrame = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/**form - 아이디, 비밀번호, 로그인 버튼 */
const TodoForm = styled.form`
  width: 500px;
  height: 250px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px;
  text-align: center;

  border-radius: 10px;
  border: 1px solid black;
  /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.22); */

  button {
    margin-top: 20px;
    width: 400px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid;
    background-color: green;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 1ms ease-in;
    cursor: pointer;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 400px;
  }

  .allow-button:active {
    transform: scale(0.99);
  }

  .allow-button:focus {
    outline: none;
  }

  .allow-button.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }

  .allow-button:hover {
    opacity: 0.93;
  }

  .block-button {
    opacity: 0.5;
  }

  .block-button:hover {
    opacity: 0.5;
  }
`;

export default Todo;
