import styled from "styled-components";
import Login from "../../components/login/Login";

const isLogin = Boolean(localStorage.getItem("token"));

function LoginPage() {
  // 토큰 유무 확인
  if (isLogin) {
    window.location.replace("/todo");
  }

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
