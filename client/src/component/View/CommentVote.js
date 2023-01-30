import React, { useState } from "react";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { commentDownVote, commentUpVote } from "../../api/commentAPI";

const VoteBtn = styled.button`
  margin-top: 12px;
  margin-left: 24px;
  border: 1px solid grey;
  border-radius: 10px;
  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;
const VoteBtn1 = styled.button`
  margin-top: 12px;
  margin-left: 12px;
  border: 1px solid grey;
  border-radius: 10px;
  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;
const VoteActBtn1 = styled.button`
  margin-top: 12px;
  margin-left: 24px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.main_hover};
  border: 1px solid #439a97;
`;
const VoteActBtn2 = styled.button`
  margin-top: 12px;
  margin-left: 12px;
  border-radius: 10px;
  color: red;
  border: 1px solid red;
`;
const VoteContainer = styled.div`
  display: flex;
`;

const Count = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  margin-top: 3px;
  margin-left: 5px;
`;

const CommentVote = ({ commentSeq, liked, disliked }) => {
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
      let upVote = liked + 1;
      setupVoteCount(upVote);
      commentUpVote(Token, commentSeq);
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

      let DownVote = disliked + 1;
      setDownVoteCount(DownVote);
      commentDownVote(Token, commentSeq);
      setIsDownVote(true);
    }
  };
  // console.log(commentSeq);
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
            <Count>{upVoteCount === 0 ? 0 : upVoteCount || liked}</Count>
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
            <Count>{upVoteCount === 0 ? 0 : upVoteCount || liked}</Count>
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
            <Count>{downVoteCount === 0 ? 0 : downVoteCount || disliked}</Count>
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
            <Count>{downVoteCount === 0 ? 0 : downVoteCount || disliked}</Count>
          </VoteContainer>
        </VoteBtn1>
      )}
    </>
  );
};

export default CommentVote;
