import React from "react";
import styled from "styled-components";
import ViewContainer from "./ViewContainer";

const ViewLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ViewBackground = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  width: 100%;
  max-width: 1336px;
  padding-bottom: 60px;
  background-color: ${({ theme }) => theme.colors.container};
  border-radius: 10px;
  display: flex;
  /* align-items: center; */
`;

const ViewPresenter = () => {
  return (
    <ViewLayout>
      <ViewBackground>
        <ViewContainer />
      </ViewBackground>
    </ViewLayout>
  );
};

export default ViewPresenter;
