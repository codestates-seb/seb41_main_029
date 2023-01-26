import React from "react";
import styled from "styled-components";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentsLayout = styled.div`
  width: 100%;
  max-width: 1250px;
  margin-top: 160px;
  /* padding: 0 4% 0 4%; */
`;

const CommentsHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  @media screen and (max-width: 1336px) {
    margin-left: 24px;
  }
`;

const CommentLayout = styled.div`
  width: 100%;
  align-items: center;
  /* max-width: 1160px; */
  background-color: ${({ theme }) => theme.colors.gray_01};
  /* background-color: white; */
  border-radius: 10px;
  margin: 24px 0px;
  /* margin-top: 24px; */
  padding-bottom: 12px;

  //이부분 수정해야됨
  @media screen and (max-width: 1336px) {
    width: 94%;
    /* max-width: 400px; */
    margin-top: 24px;
    margin-left: 24px;
    /* margin-right: 24px; */
  }
`;

const Comments = ({ commented, comments }) => {
  // console.log(comments);
  return (
    <>
      <CommentsLayout>
        <CommentsHeader>
          {/* 댓글 (1) */}
          댓글 ({commented})
        </CommentsHeader>
        {/* <CommentLayout>
          <Comment />
        </CommentLayout> */}
        {comments?.map((item, index) => (
          <CommentLayout key={index}>
            <Comment comment={item} />
          </CommentLayout>
        ))}
        <CommentForm />
      </CommentsLayout>
    </>
  );
};

export default Comments;
