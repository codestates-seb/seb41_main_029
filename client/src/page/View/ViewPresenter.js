import React from "react";
import styled from "styled-components";
import ViewContainer from "./ViewContainer";

const ViewLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ViewBackground = styled.div`
  margin-top: 120px;
  width: 1336px;
  height: 1413px;
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
