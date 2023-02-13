import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { viewDownVote, viewUpVote } from "../../api/writingAPI";

const Count = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  margin-top: 3px;
  margin-left: 5px;

  @media screen and (max-width: 1336px) {
    margin-top: 7px;
  }
`;
const VoteLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
`;

const VoteContainer = styled.div`
  display: flex;
  width: 55px;
  @media screen and (max-width: 1336px) {
    height: 35px;
    width: 50px;
  }
`;
const VoteBtn = styled.button`
  border-radius: 10px;
  background-color: white;
  /* margin-left: 20px; */
  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
  border: 1px solid grey;
  @media screen and (max-width: 1336px) {
    /* margin-left: 10px; */
  }
`;
const VoteActBtn = styled.button`
  /* margin-left: 20px; */
  background-color: white;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.main_hover};
  border: 1px solid #439a97;
  /* background-color: ${({ theme }) => theme.colors.main_hover}; */
`;
const VoteActBtn1 = styled.button`
  background-color: white;
  border-radius: 10px;
  margin-left: 20px;
  color: red;
  border: 1px solid red;
  /* background-color: ${({ theme }) => theme.colors.main_hover}; */
`;

const ViewVote = ({ likeCount, dislikeCount }) => {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const navigate = useNavigate();
  const { boardSeq } = useParams();
  const [isUpVote, setIsUpVote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const [voteCount, setVoteCount] = useState();
  const [downVoteCount, setDownVoteCount] = useState();

  const handleClickUp = () => {
    if (!Token) {
      if (window.confirm("로그인 상태가 아닙니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      viewUpVote(Token, boardSeq);
      if (isUpVote) return;
      let updateVote = likeCount + 1;
      setVoteCount(updateVote);
      setIsUpVote(updateVote);
    }
  };
  const handleDownVote = () => {
    if (!Token) {
      if (window.confirm("로그인 상태가 아닙니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      if (isDownVote) return;
      let DownVote = dislikeCount + 1;
      setDownVoteCount(DownVote);
      viewDownVote(Token, boardSeq);
      setIsDownVote(true);
    }
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
                width="36px"
                height="30px"
                style={{ marginTop: "2px" }}
              />
              <Count>{voteCount === 0 ? 0 : voteCount || likeCount}</Count>
            </VoteContainer>
          </VoteActBtn>
        ) : (
          <VoteBtn onClick={handleClickUp}>
            <VoteContainer>
              <img
                src={process.env.PUBLIC_URL + "/image/upVote.svg"}
                style={{ marginTop: "2px" }}
                alt="Up"
                width="36px"
                height="30px"
              />
              <Count>{voteCount === 0 ? 0 : voteCount || likeCount}</Count>
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
                {downVoteCount === 0 ? 0 : downVoteCount || dislikeCount}
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
                {downVoteCount === 0 ? 0 : downVoteCount || dislikeCount}
              </Count>
            </VoteContainer>
          </VoteBtn>
        )}
      </VoteLayout>
    </>
  );
};

export default ViewVote;
