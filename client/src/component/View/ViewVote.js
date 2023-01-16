import React, { useState } from "react";
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
  margin-left: 20px;
`;
const VoteActBtn = styled.button`
  margin-left: 20px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.main_hover};
  border: 2px solid #439a97;
  /* background-color: ${({ theme }) => theme.colors.main_hover}; */
`;
const VoteActBtn1 = styled.button`
  border-radius: 10px;
  margin-left: 20px;
  color: red;
  border: 2px solid red;
  /* background-color: ${({ theme }) => theme.colors.main_hover}; */
`;

const ViewVote = ({ voteResult }) => {
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [voteCount, setVoteCount] = useState();
  const [downVoteCount, setDownVoteCount] = useState();
  const handleClickUp = () => {
    if (isUpVote) return;
    let updateVote = voteResult + 1;
    setVoteCount(updateVote);
    // commentUpVote( Token);
    setIsUpVote(updateVote);
  };
  const handleDownVote = () => {
    if (isDownVote) return;

    let DownVote = voteResult + 1;
    setDownVoteCount(DownVote);
    // commentDownVote( Token);
    setIsDownVote(true);
  };

  return (
    <>
      <VoteLayout>
        {isUpVote ? (
          <VoteActBtn onClick={handleClickUp}>
            <VoteContainer>
              <img
                src={process.env.PUBLIC_URL + "/image/upVote.svg"}
                alt="Up"
                width="40px"
              />
              <Count>{voteCount === 0 ? 0 : voteCount || voteResult}</Count>
            </VoteContainer>
          </VoteActBtn>
        ) : (
          <VoteBtn onClick={handleClickUp}>
            <VoteContainer>
              <img
                src={process.env.PUBLIC_URL + "/image/upVote.svg"}
                alt="Up"
                width="40px"
              />
              <Count>{voteCount === 0 ? 0 : voteCount || voteResult}</Count>
            </VoteContainer>
          </VoteBtn>
        )}
        {isDownVote ? (
          <VoteActBtn1 onClick={handleDownVote} style={{ marginLeft: "20px" }}>
            <VoteContainer>
              <img
                src={process.env.PUBLIC_URL + "/image/downVote.svg"}
                alt="Down"
                width="40px"
              />
              <Count style={{ marginTop: "7px" }}>
                {downVoteCount === 0 ? 0 : downVoteCount || voteResult}
              </Count>
            </VoteContainer>
          </VoteActBtn1>
        ) : (
          <VoteBtn onClick={handleDownVote} style={{ marginLeft: "20px" }}>
            <VoteContainer>
              <img
                src={process.env.PUBLIC_URL + "/image/downVote.svg"}
                alt="Down"
                width="40px"
              />
              <Count style={{ marginTop: "7px" }}>
                {downVoteCount === 0 ? 0 : downVoteCount || voteResult}
              </Count>
            </VoteContainer>
          </VoteBtn>
        )}
      </VoteLayout>
    </>
  );
};

export default ViewVote;
