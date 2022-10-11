import React, { useState } from "react";
import styled from "styled-components";
import InputGroup from "../inputGroup/InputGroup";
import { Link } from "react-router-dom";

function Login() {
  const LOGIN_URL = `https://pre-onboarding-selection-task.shop/auth/signin`;

  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <LoginFrame>
      <h1>로그인</h1>

      <LoginForm>
        <InputGroup
          placeholder="이메일"
          value={userId}
          setValue={setuserId}
          // error={error.userId}
        />

        <InputGroup
          placeholder="비밀번호"
          value={password}
          setValue={setPassword}
          type="password"
          // error={error.email}
        />

        {errors.length !== 0 ? (
          <>
            <small>이메일 또는 비밀번호를 잘못 입력하셨습니다.</small>
            <small>입력하신 내용을 다시 확인해주세요.</small>
          </>
        ) : (
          <></>
        )}

        <LoginButton>로그인</LoginButton>

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
`;

const LoginButton = styled.button`
  margin-top: 20px;
  width: 400px;
  height: 45px;
  border-radius: 5px;
  border: 1px solid;
  background-color: green;
  color: #ffffff;
  font-weight: bold;
  letter-spacing: 2px;
  transition: transform 5ms ease-in;

  cursor: pointer;

  &:active {
    transform: scale(0.99);
  }

  &:hover {
    opacity: 0.93;
  }

  p {
    opacity: 0.7;
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

export default Login;
