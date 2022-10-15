import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Login from "../../components/login/Login";

function LoginPage() {
  const isLogin = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/todo");
    }
  }, [isLogin, navigate]);

  return (
    <LoginLayout>
      <Login />
    </LoginLayout>
  );
}

const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export default LoginPage;
