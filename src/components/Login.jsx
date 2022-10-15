import React, { useState } from 'react';
import styled from 'styled-components';
import { InputGroup } from './';
import { Link } from 'react-router-dom';
import { postLogin } from '../apis/login';
import useCheck from '../hooks/useCheck';
import { checkEmail, checkPassword } from '../utils/checkSignup';

export function Login() {
  const LOGIN_URL = `/auth/signin`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  // 유효성 검사 state
  const [isEmail, setIsEmail] = useState(false);
  const [ispassword, setIsPassword] = useState(false);

  // 커스텀 훅
  useCheck(checkEmail, email, setIsEmail);
  useCheck(checkPassword, password, setIsPassword);

  /** 로그인 제출 함수 */
  const submitLogin = async event => {
    event.preventDefault();
    postLogin(LOGIN_URL, email, password, setIsError);
  };

  return (
    <LoginFrame>
      <h1>로그인</h1>
      <LoginForm onSubmit={submitLogin}>
        <InputGroup
          placeholder="이메일"
          value={email}
          setValue={setEmail}
          setIsError={setIsError}
        />

        {isEmail === true ? (
          <div />
        ) : (
          <ContentCheck>
            올바른 형식의 이메일을 입력해주세요(@ 필수 포함)
          </ContentCheck>
        )}

        <InputGroup
          placeholder="비밀번호"
          value={password}
          setValue={setPassword}
          type="password"
          setIsError={setIsError}
        />

        {ispassword === true ? (
          <div />
        ) : (
          <ContentCheck>8자 이상의 비밀번호를 입력해주세요</ContentCheck>
        )}

        {isError ? (
          <>
            <ContentCheck>
              이메일 또는 비밀번호를 잘못 입력하셨습니다.
            </ContentCheck>
            <ContentCheck>입력하신 내용을 다시 확인해주세요.</ContentCheck>
          </>
        ) : null}

        {isEmail && ispassword ? (
          <button type="submit" className="allow-button">
            로그인
          </button>
        ) : (
          <button type="button" className="block-button">
            로그인
          </button>
        )}

        <SignupContainer>
          <div>계정이 없으신가요?</div>
          <div>
            <Link to="/signup" className="move-sign-up">
              회원가입
            </Link>
          </div>
        </SignupContainer>
      </LoginForm>
    </LoginFrame>
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

const ContentCheck = styled.small`
  margin: 0px auto 5px 5px;
  font-size: 13px;
  color: red;
  opacity: 0.8;
`;
