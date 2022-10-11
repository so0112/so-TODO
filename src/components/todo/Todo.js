import React, { useState } from "react";
import styled from "styled-components";
import InputGroup from "../inputGroup/InputGroup";
import handleTodo from "../../api/handleTodo";
import GetTodo from "./GetTodo";

function Todo() {
  const TODO_CREATE_URL = `https://pre-onboarding-selection-task.shop/todos`;

  const [todo, setTodo] = useState("");

  /** todo 제출 함수 */
  const submitTodo = async (event) => {
    event.preventDefault();
    handleTodo(TODO_CREATE_URL, todo, setTodo);
  };

  return (
    <>
      <LoginFrame>
        <h1>Todo 생성하기</h1>

        <LoginForm>
          <InputGroup
            placeholder="투두리스트"
            value={todo}
            setValue={setTodo}
            // error={error.userId}
          />

          <button type="button" className onClick={submitTodo}>
            할일 목록 생성
          </button>
        </LoginForm>
      </LoginFrame>
    </>
  );
}

/** div - 로그인 프레임 */
const LoginFrame = styled.div`
  width: 500px;
  padding: 15px;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

/**form - 아이디, 비밀번호, 로그인 버튼 */
const LoginForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px;
  text-align: center;

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

const SignupContainer = styled.div`
  margin: 15px auto 0 0;
  display: flex;

  .move-sign-up {
    margin-left: 15px;
    font-size: 14px;
    text-decoration: none;
    color: gray;
  }
`;

const ContentCheck = styled.p`
  margin: 0px auto 15px 10px;
  font-size: 13px;
  color: red;
  opacity: 0.8;
`;

export default Todo;
