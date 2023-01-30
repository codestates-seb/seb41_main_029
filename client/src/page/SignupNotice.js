import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 290px;
  width: 430px;
  margin: 150px 16px;
  border-radius: 20px;
  background-color: #f2f2f2;
`;

const CheckImg = styled.div``;

const SignupComplete = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs30};
  font-weight: 500;
  margin: 10px;
`;

const LoginInfo = styled.div`
  color: gray;
`;

const LoginBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0;
  border-radius: 5px;
  margin-top: 20px;
  width: 170px;
  height: 40px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.main_hover};
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

const SignupNotice = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <NoticeDiv>
          <CheckImg>
            <FontAwesomeIcon icon={faCircleCheck} color="#62B6B7" size="3x" />
          </CheckImg>
          <SignupComplete>회원가입 완료</SignupComplete>
          <LoginInfo>로그인 후 서비스를 이용하실 수 있습니다.</LoginInfo>
          <LoginBtn
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </LoginBtn>
        </NoticeDiv>
      </Container>
    </>
  );
};

export default SignupNotice;
