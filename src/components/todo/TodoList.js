import React, { useState } from "react";
import styled from "styled-components";
import InputGroup from "../inputGroup/InputGroup";
import { deleteTodo, handleCheck, putModify } from "../../api/axiosTodo";
import { BsCheckCircle, BsCircle, BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

function TodoList({ datas, setDatas, todo, setTodo }) {
  const TODO_URL = "https://pre-onboarding-selection-task.shop/todos";
  const [isModifying, setIsModifying] = useState();
  const [modifyTodo, setModifyTodo] = useState("");

  function cancelModify() {
    setIsModifying();
  }

  function startModify(el) {
    setIsModifying(el.id);
    setModifyTodo(el.todo);
  }

  return (
    <TodoListContainer>
      <h1>남은 할일 {datas.filter((el) => el.isCompleted === false).length} 개</h1>
      {datas.map((el) => (
        <div className="todo-item" key={el.id}>
          {el.isCompleted ? (
            <BsCheckCircle
              className="done check-area"
              onClick={() => handleCheck(el.id, el.todo, el.isCompleted, setDatas)}
            />
          ) : (
            <BsCircle
              className="doing check-area"
              onClick={() => handleCheck(el.id, el.todo, el.isCompleted, setDatas)}
            />
          )}
          {/* TODO PUT 수정중인 id는 input창 뜨도록 작성 */}
          {isModifying === el.id ? (
            <>
              <InputGroup
                placeholder="투두리스트"
                value={modifyTodo}
                setValue={setModifyTodo}
                className="todo-list"
              />
              <div className="modify-button-area">
                <div
                  className="modify-button"
                  onClick={() =>
                    putModify(
                      el.id,
                      modifyTodo,
                      el.isCompleted,
                      setIsModifying,
                      setModifyTodo,
                      setDatas
                    )
                  }>
                  확인
                </div>
                <div className="delete-button" onClick={cancelModify}>
                  취소
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={`todo-list ${el.isCompleted ? "done-list" : ""}`}>{el.todo}</div>
              <div className="button-area">
                <BsFillPencilFill className="modify-button" onClick={() => startModify(el)} />

                <BsFillTrashFill
                  className="delete-button"
                  onClick={() => deleteTodo(`${TODO_URL}/${el.id}`, datas, setDatas)}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </TodoListContainer>
  );
}

const TodoListContainer = styled.div`
  width: 500px;
  height: 100%;
  margin-top: 10px;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid black;
  /* box-shadow: 5px 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.22); */

  .check-area {
    font-size: 25px;
  }
  .todo-item {
    margin: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .todo-list {
    margin-left: 10px;
  }

  .done-list {
    opacity: 0.4;
  }

  .button-area {
    display: flex;
    margin-left: auto;
    cursor: pointer;
    color: gray;
  }

  .modify-button-area {
    display: flex;
    margin-left: auto;
    cursor: pointer;
  }

  .modify-button {
    cursor: pointer;
  }

  .modify-button:hover {
    color: blue;
  }

  .delete-button {
    margin-left: 10px;
    cursor: pointer;
  }

  .delete-button:hover {
    color: red;
  }
`;

export default TodoList;
