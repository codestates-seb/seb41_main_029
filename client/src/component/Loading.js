import React from "react";
import styled from "styled-components";

const Background = styled.div`
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
`;

const LoadingText = styled.div`
  /* margin-top: 220px; */
`;

const Loading = () => {
  return (
    <Background>
      <LoadingText>데이터를 불러오고 있는 중입니다.</LoadingText>
      <img
        src={process.env.PUBLIC_URL + "/image/Loading.gif"}
        alt="Loading"
        width="40px"
      />
    </Background>
  );
};

export default Loading;
