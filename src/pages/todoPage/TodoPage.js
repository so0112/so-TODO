import React from "react";
import Todo from "../../components/todo/Todo";
import styled from "styled-components";

const isLogin = Boolean(localStorage.getItem("token"));

function TodoPage() {
  if (!isLogin) {
    window.location.replace("/");
  }

  return (
    <TodoLayout>
      <Todo />
    </TodoLayout>
  );
}

const TodoLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default TodoPage;
