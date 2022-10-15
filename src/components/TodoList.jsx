import React, { useState } from 'react';
import styled from 'styled-components';
import { InputGroup } from './';
import { deleteTodo, postTodoCheck, putModify } from '../apis/todo';
import {
  BsCheckCircle,
  BsCircle,
  BsFillTrashFill,
  BsFillPencilFill,
  BsCheckLg,
  BsXLg,
} from 'react-icons/bs';

export function TodoList({ datas, setDatas }) {
  const [isModifying, setIsModifying] = useState();
  const [modifyTodo, setModifyTodo] = useState('');

  const handleCancel = () => {
    setIsModifying();
  };

  const startModify = el => {
    setIsModifying(el.id);
    setModifyTodo(el.todo);
  };

  const handlePutTodo = (e, { id, isCompleted }) => {
    e.preventDefault();
    putModify({
      id,
      modifyTodo,
      isCompleted,
      setIsModifying,
      setModifyTodo,
      setDatas,
    });
  };

  return (
    <TodoListContainer>
      <h1>
        남은 할일 {datas.filter(el => el.isCompleted === false).length} 개
      </h1>
      {datas.map(({ id, todo, isCompleted, userId }) => (
        <div className="todo-list-area" key={id}>
          {isCompleted ? (
            <BsCheckCircle
              className="done check-area"
              onClick={() => postTodoCheck({ id, todo, isCompleted, setDatas })}
            />
          ) : (
            <BsCircle
              className="doing check-area"
              onClick={() => postTodoCheck({ id, todo, isCompleted, setDatas })}
            />
          )}
          {/* TODO PUT 수정중인 id는 input창 뜨도록 작성 */}
          {isModifying === id ? (
            <>
              <form onSubmit={e => handlePutTodo(e, { id, isCompleted })}>
                <InputGroup
                  placeholder=""
                  value={modifyTodo}
                  setValue={setModifyTodo}
                  className="todo-list"
                />
              </form>
              <div className="modify-button-area">
                <BsCheckLg
                  className="modify-post-button"
                  onClick={e => handlePutTodo(e, { id, isCompleted })}
                />
                <BsXLg
                  className="modify-cancel-button"
                  onClick={handleCancel}
                />
              </div>
            </>
          ) : (
            <>
              <div className={`todo-list ${isCompleted ? 'done-list' : ''}`}>
                {todo}
              </div>
              <div className="button-area">
                <BsFillPencilFill
                  className="modify-button"
                  onClick={() => startModify({ id, todo, isCompleted, userId })}
                />

                <BsFillTrashFill
                  className="delete-button"
                  onClick={() => deleteTodo({ id: id, setDatas })}
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

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    width: 300px;
    margin-left: 10px;
  }

  .check-area {
    font-size: 25px;
  }

  .todo-list-area {
    margin: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .todo-list {
    margin-left: 10px;
  }

  .done-list {
    opacity: 0.3;
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
  }

  .modify-button {
    cursor: pointer;
  }

  .modify-button:hover {
    color: blue;
  }
  .modify-post-button {
    color: green;
    cursor: pointer;
  }
  .modify-cancel-button {
    margin-left: 10px;
    color: red;
    cursor: pointer;
  }
  .delete-button {
    margin-left: 10px;
    cursor: pointer;
  }

  .delete-button:hover {
    color: red;
  }
`;
