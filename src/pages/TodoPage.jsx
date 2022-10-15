import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Todo } from '../components';

export function TodoPage() {
  const isLogin = Boolean(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

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
