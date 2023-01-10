import React from "react";
import LoginContainer from "./LoginContainer";
import styled from "styled-components";

const LooginLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBackground = styled.div`
  margin-top: 110px;
  width: 316px;
  height: 343px;
  background-color: ${({ theme }) => theme.colors.container};
  border-radius: 10px;
  align-items: center;
`;

const LoginPresenter = () => {
  return (
    <LooginLayout>
      <LoginBackground>
        <LoginContainer />
      </LoginBackground>
    </LooginLayout>
  );
};

export default LoginPresenter;
