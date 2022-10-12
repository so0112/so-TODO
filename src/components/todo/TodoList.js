import React, { useState } from "react";
import styled from "styled-components";
import InputGroup from "../inputGroup/InputGroup";
import { handleTodoDelete, handleCheck, putModify } from "../../api/handleTodo";
import { BsCheckCircle, BsCircle } from "react-icons/bs";

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
              className="done"
              onClick={() => handleCheck(el.id, el.todo, el.isCompleted, setDatas)}
            />
          ) : (
            <BsCircle
              className="doing"
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
                // error={error.userId}
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
              <div className="todo-list">{el.todo}</div>
              <div className="button-area">
                <div className="modify-button" onClick={() => startModify(el)}>
                  수정
                </div>
                <div
                  className="delete-button"
                  onClick={() => handleTodoDelete(`${TODO_URL}/${el.id}`, datas, setDatas)}>
                  삭제
                </div>
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

  .todo-item {
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .button-area {
    display: flex;
    margin-left: auto;
    cursor: pointer;
  }

  .modify-button-area {
    display: flex;
    margin-left: auto;
    cursor: pointer;
  }
  .modify-button {
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
  }

  .delete-button {
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
  }
`;

export default TodoList;
