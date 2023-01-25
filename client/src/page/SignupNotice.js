import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { MainBtn } from "../component/Button";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const NoticeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 290px;
  width: 430px;
  margin: 0 16px;
  /* border: 5px solid gray; */
  border-radius: 20px;
  background-color:
  /* ${({ theme }) => theme.colors.container}; */ #f2f2f2;
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
  margin-top: 10px;
`;

const SignupNotice = () => {
  return (
    <>
      <Container>
        <NoticeDiv>
          <CheckImg>
            <FontAwesomeIcon icon={faCircleCheck} color="#62B6B7" size="3x" />
          </CheckImg>
          <SignupComplete>회원가입 완료</SignupComplete>
          <LoginInfo>로그인 후 서비스를 이용하실 수 있습니다.</LoginInfo>
          <MainBtn
            type="button"
            text={"로그인"}
            width="170px"
            height="40px"
            // onClick={() => {
            //   alert("안녕");
            // }}
          />
        </NoticeDiv>
      </Container>
    </>
  );
};

export default SignupNotice;
