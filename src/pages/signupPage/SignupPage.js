import React from "react";
import styled from "styled-components";
import Signup from "../../components/signup/Signup";

function SignUpPage() {
  return (
    <SignUpLayout>
      <Signup />
    </SignUpLayout>
  );
}

const SignUpLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 800px;
`;

export default SignUpPage;
