import React from "react";
import styled from "styled-components";

const Count = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  margin-top: 3px;
  margin-left: 5px;
`;
const VoteLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  margin-right: 22px;
`;

const VoteContainer = styled.div`
  display: flex;
`;
const VoteBtn = styled.button`
  border-radius: 10px;
`;

const ViewVote = ({ viewInfo }) => {
  return (
    <>
      <VoteLayout>
        <VoteBtn style={{ marginLeft: "20px" }}>
          <VoteContainer>
            <img
              src={process.env.PUBLIC_URL + "/image/upVote.svg"}
              alt="delete"
              width="40px"
            />
            <Count>3</Count>
          </VoteContainer>
        </VoteBtn>

        <VoteBtn style={{ marginLeft: "20px" }}>
          <VoteContainer>
            <img
              src={process.env.PUBLIC_URL + "/image/downVote.svg"}
              alt="delete"
              width="40px"
            />
            <Count style={{ marginTop: "7px" }}>1</Count>
          </VoteContainer>
        </VoteBtn>
      </VoteLayout>
    </>
  );
};

export default ViewVote;
