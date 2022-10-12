import React from "react";
import styled from "styled-components";
import { handleTodoDelete, handleComplete } from "../../api/handleTodo";

function TodoList({ datas, setDatas }) {
  const TODO_URL = "https://pre-onboarding-selection-task.shop/todos";

  return (
    <TodoListContainer>
      <h1>Todo</h1>
      {datas.map((el) => (
        <div className="todo-item">
          <input type="checkbox" onClick={handleComplete(el.id, el.todo, el.isCompleted)} />
          <div className="todo-list">{el.todo}</div>
          <div className="button-area">
            <div
              className="delete-button"
              onClick={() => handleTodoDelete(`${TODO_URL}/${el.id}`, datas, setDatas)}>
              삭제
            </div>
          </div>
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
  }
  .modify-button {
    padding: 10px;
    border: 1px solid black;
  }

  .delete-button {
    padding: 10px;
    border: 1px solid black;
  }
`;

export default TodoList;
