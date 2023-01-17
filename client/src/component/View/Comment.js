import React from "react";
import styled from "styled-components";
import { CommentDate } from "../DateCalculator";
import CommentVote from "./CommentVote";

const CommentInfo = styled.div`
  display: flex;
  padding-top: 16px;
  padding-left: 24px;
  height: 35px;
  width: 100%;
  max-width: 440px;
`;

const EtcIcon = styled.span`
  float: right;
  margin-top: 5px;
  margin-right: 5px;
`;
const EditImg = styled.img`
  width: 28px;
  height: 30px;
  margin-bottom: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

const DeleteImg = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  margin-right: 15px;
  cursor: pointer;
`;
const CommentContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 65px;
  border-radius: 10px;
  margin-left: 24px;
  background-color: #f9f7f7;
  padding-top: 8px;
  padding-left: 8px;
`;

const Comment = ({ comment }) => {
  return (
    <>
      <EtcIcon>
        <EditImg
          src={process.env.PUBLIC_URL + "/image/editIcon.svg"}
          alt="edit"
        />
        <DeleteImg
          src={process.env.PUBLIC_URL + "/image/deleteIcon.svg"}
          alt="delete"
        />
      </EtcIcon>
      {/* <CommentInfo>박승철 (23/01/04)</CommentInfo> */}
      <CommentInfo>
        {comment?.userName}
        <CommentDate createdAt={comment?.createdAt} />
      </CommentInfo>
      {/* <CommentContainer>좋은 글이네요! </CommentContainer> */}
      <CommentContainer>{comment?.content} </CommentContainer>
      <CommentVote voteResult={comment?.voteResult} />
    </>
  );
};

export default Comment;
