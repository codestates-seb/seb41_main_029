import React, { useState } from "react";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const navigate = useNavigate();
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [upVoteCount, setupVoteCount] = useState();
  const [downVoteCount, setDownVoteCount] = useState();
  const handleClickUp = () => {
    if (!Token) {
      if (window.confirm("로그인 상태가 아닙니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      if (isUpVote) return;
      let upVote = voteResult + 1;
      setupVoteCount(upVote);
      // commentUpVote(id, userId, answer.answerId, Token);
      setIsUpVote(true);
    }
  };
  const handleDownVote = () => {
    if (!Token) {
      if (window.confirm("로그인 상태가 아닙니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      if (isDownVote) return;

      let DownVote = voteResult + 1;
      setDownVoteCount(DownVote);
      // commentDownVote(id, userId, answer.answerId, Token);
      setIsDownVote(true);
    }
  };

  return (
    <>
      {isUpVote ? (
        <VoteActBtn1 onClick={handleClickUp}>
          <VoteContainer>
            <img
              className="up"
              src={process.env.PUBLIC_URL + "/image/upVote.svg"}
              alt="Up"
              width="30px"
            />
            <Count>{upVoteCount === 0 ? 0 : upVoteCount || voteResult}</Count>
          </VoteContainer>
        </VoteActBtn1>
      ) : (
        <VoteBtn onClick={handleClickUp}>
          <VoteContainer>
            <img
              className="up"
              src={process.env.PUBLIC_URL + "/image/upVote.svg"}
              alt="Up"
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
              alt="Down"
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
              alt="Down"
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
