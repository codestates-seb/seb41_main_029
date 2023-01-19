import React, { useState } from "react";
import styled from "styled-components";

const VoteBtn = styled.button`
  margin-top: 12px;
  margin-left: 24px;
  border-radius: 10px;
`;
const VoteBtn1 = styled.button`
  margin-top: 12px;
  margin-left: 12px;
  border-radius: 10px;
`;
const VoteActBtn1 = styled.button`
  margin-top: 12px;
  margin-left: 24px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.main_hover};
  border: 2px solid #439a97;
`;
const VoteActBtn2 = styled.button`
  margin-top: 12px;
  margin-left: 12px;
  border-radius: 10px;
  color: red;
  border: 2px solid red;
`;
const VoteContainer = styled.div`
  display: flex;
`;

const Count = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  margin-top: 3px;
  margin-left: 5px;
`;

const CommentVote = ({ voteResult }) => {
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [upVoteCount, setupVoteCount] = useState();
  const [downVoteCount, setDownVoteCount] = useState();
  const handleClickUp = () => {
    if (isUpVote) return;
    let upVote = voteResult + 1;
    setupVoteCount(upVote);
    // commentUpVote(id, userId, answer.answerId, Token);
    setIsUpVote(true);
  };
  const handleDownVote = () => {
    if (isDownVote) return;

    let DownVote = voteResult + 1;
    setDownVoteCount(DownVote);
    // commentDownVote(id, userId, answer.answerId, Token);
    setIsDownVote(true);
  };

  return (
    <>
      {isUpVote ? (
        <VoteActBtn1 onClick={handleClickUp}>
          <VoteContainer>
            <img
              src={process.env.PUBLIC_URL + "/image/upVote.svg"}
              alt="delete"
              width="30px"
            />
            <Count>{upVoteCount === 0 ? 0 : upVoteCount || voteResult}</Count>
          </VoteContainer>
        </VoteActBtn1>
      ) : (
        <VoteBtn onClick={handleClickUp}>
          <VoteContainer>
            <img
              src={process.env.PUBLIC_URL + "/image/upVote.svg"}
              alt="delete"
              width="30px"
            />
            <Count>{upVoteCount === 0 ? 0 : upVoteCount || voteResult}</Count>
          </VoteContainer>
        </VoteBtn>
      )}
      {isDownVote ? (
        <VoteActBtn2 onClick={handleDownVote}>
          <VoteContainer onClick={handleDownVote}>
            <img
              src={process.env.PUBLIC_URL + "/image/downVote.svg"}
              alt="delete"
              width="30px"
              height="27px"
            />
            <Count>
              {downVoteCount === 0 ? 0 : downVoteCount || voteResult}
            </Count>
          </VoteContainer>
        </VoteActBtn2>
      ) : (
        <VoteBtn1 onClick={handleDownVote}>
          <VoteContainer>
            <img
              src={process.env.PUBLIC_URL + "/image/downVote.svg"}
              alt="delete"
              width="30px"
              height="27px"
            />
            <Count>
              {downVoteCount === 0 ? 0 : downVoteCount || voteResult}
            </Count>
          </VoteContainer>
        </VoteBtn1>
      )}
    </>
  );
};

export default CommentVote;
