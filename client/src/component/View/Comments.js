import React from "react";
import styled from "styled-components";

import Comment from "./Comment";

const CommentsLayout = styled.div`
  width: 1250px;
  margin-top: 160px;
  /* align-items: center;
  justify-content: center; */
  margin-left: 88px;
`;
const CommentsHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
`;

const CommentLayout = styled.div`
  width: 1160px;
  /* height: 160px; */
  background-color: ${({ theme }) => theme.colors.gray_02};
  border-radius: 10px;
  margin-top: 24px;
  padding-bottom: 20px;
`;

const Comments = ({ comments }) => {
  return (
    <>
      <CommentsLayout>
        <CommentsHeader>
          {/* 댓글 (1) */}
          댓글 ({comments?.length})
        </CommentsHeader>
        {/* <CommentLayout>
          <Comment />
        </CommentLayout> */}
        {comments?.map((item, index) => (
          <CommentLayout key={index}>
            <Comment comment={item} />
          </CommentLayout>
        ))}
      </CommentsLayout>
    </>
  );
};

export default Comments;
