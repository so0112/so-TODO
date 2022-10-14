import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import InputGroup from "../inputGroup/InputGroup";
import useCheck from "../../hooks/useCheck";
import { postSignup } from "../../api/axiosSignup";
import { checkEmail, checkPassword } from "../../function/checkSignup";

function Signup() {
  const SIGNUP_URL = `https://pre-onboarding-selection-task.shop/auth/signup`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 유효성 검사 state
  const [isEmail, setIsEmail] = useState(false);
  const [ispassword, setIsPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  // 유효성 검사 커스텀 훅
  useCheck(checkEmail, email, setIsEmail);
  useCheck(checkPassword, password, setIsPassword);

  /** 회원가입 axios 요청 버튼 */
  const submitSignup = (e) => {
    postSignup(SIGNUP_URL, email, password, setIsError);
  };

  return (
    <SignupFrame>
      <SignUpForm>
        <h1>회원가입</h1>

        <InputGroup
          placeholder="이메일"
          value={email}
          setValue={setEmail}
          setIsError={setIsError}
        />
        {isError === true ? (
          <ContentCheck>중복된 계정입니다.</ContentCheck>
        ) : isEmail === true ? (
          <></>
        ) : (
          <ContentCheck>올바른 형식의 이메일을 입력해주세요(@ 필수 포함)</ContentCheck>
        )}

        <InputGroup
          placeholder="비밀번호"
          value={password}
          setValue={setPassword}
          type="password"
        />
        {ispassword === true ? (
          <></>
        ) : (
          <ContentCheck>8자 이상의 비밀번호를 입력해주세요</ContentCheck>
        )}

        {isEmail && ispassword ? (
          <button type="button" className="allow-signup" onClick={submitSignup}>
            가입하기
          </button>
        ) : (
          <button type="button" className="block-signup">
            가입하기
          </button>
        )}
        <div className="sign-up">
          <div>이미 계정이 있으신가요?</div>
          <div className="move-sign-up">
            <Link to="/">로그인</Link>
          </div>
        </div>
      </SignUpForm>
    </SignupFrame>
  );
}

/** div - 회원가입 프레임 */
const SignupFrame = styled.div`
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

/** div - 회원가입 레이아웃 */
const SignUpForm = styled.form`
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

  .allow-signup:active {
    transform: scale(0.99);
  }

  .allow-signup:focus {
    outline: none;
  }

  .allow-signup.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }

  .allow-signup:hover {
    opacity: 0.93;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 400px;
  }

  .social-container {
    margin: 20px 0;
  }

  .goggle-icon {
    margin-right: 10px;
    font-size: 25px;
  }
  .social-container a {
    border: 1px solid #dddddd;
    border-radius: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 50px;
    width: 400px;
    font-size: 20px;
    font-weight: bold;
    color: gray;
    cursor: pointer;
  }

  .social-container p {
    opacity: 0.6;
  }

  .sign-up {
    margin-right: auto;
    margin-top: 15px;
    display: flex;
  }

  .move-sign-up {
    margin-left: 15px;
    margin-bottom: 15px;
  }

  .block-signup {
    opacity: 0.5;
  }

  .block-signup:hover {
    opacity: 0.5;
  }

  .block-signup {
    opacity: 0.5;
  }

  .block-signup:hover {
    opacity: 0.5;
  }
`;

const ContentCheck = styled.p`
  margin: 0px auto 15px 10px;
  font-size: 13px;
  color: red;
  opacity: 0.8;
`;

export default Signup;
