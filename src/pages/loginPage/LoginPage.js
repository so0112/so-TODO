import styled from "styled-components";
import Login from "../../components/login/Login";

function LoginPage() {
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
