import React from "react";
import styled from "styled-components";
import { CommentDate } from "../DateCalculator";

const ReplyLayout = styled.div`
  /* align-items: center; */
  display: flex;
  justify-content: center;
`;
const ReplyLayout1 = styled.div`
  margin-left: 36px;
`;

const UserInfo = styled.div`
  display: flex;
`;
const Line = styled.div`
  width: 90%;
  margin-top: 20px;
  border: 1px dashed black;
`;

const Reply = ({ reply }) => {
  console.log(reply);
  return (
    <>
      <ReplyLayout>
        <Line />
      </ReplyLayout>
      <ReplyLayout1>
        <UserInfo>
          {reply?.username}
          {/* <CommentDate createdAt={reply?.createdAt} /> */}(
          {reply?.createdAt})
        </UserInfo>
      </ReplyLayout1>
      <ReplyLayout1>{reply?.content}</ReplyLayout1>
    </>
  );
};

export default Reply;
