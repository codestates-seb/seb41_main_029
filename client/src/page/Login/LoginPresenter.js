import React from "react";
import LoginContainer from "./LoginContainer";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 700px;
`;

const LoginBackground = styled.div`
  margin-top: 120px;
  width: 100%;
  max-width: 316px;
  background-color: ${({ theme }) => theme.colors.container};
  border-radius: 10px;
  align-items: center;
`;

const SearchSignup = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.gray_03};
  margin-right: 16px;
  cursor: pointer;
`;

const SearSignLay = styled.div`
  margin-top: 12px;
`;

const LoginPresenter = () => {
  return (
    <LoginLayout>
      <LoginBackground>
        <LoginContainer />
      </LoginBackground>
      <SearSignLay></SearSignLay>
    </LoginLayout>
  );
};

export default LoginPresenter;
