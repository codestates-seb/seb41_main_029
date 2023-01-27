import React, { useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { TablePagination } from "@mui/material";

const CommentsLayout = styled.div`
  /* display: flex; */
  width: 100%;
  max-width: 1250px;
  margin-top: 120px;
  /* padding: 0 4% 0 4%; */
`;

const CommentsHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  /* align-items: center; */
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

const CommentsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PageNationLayout = styled.div`
  display: flex;
  margin-right: -14px;
  @media screen and (max-width: 1336px) {
    margin-right: 12px;
  }
`;
const PageNation = styled(TablePagination).attrs({})`
  .MuiToolbar-root,
  .MuiToolbar-gutters,
  .MuiToolbar-regular,
  .MuiTablePagination-toolbar,
  .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar {
    /* font-size: 16px; */
  }
`;

const Comments = ({ commented, comments }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * limit;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(comments);
  return (
    <>
      <CommentsLayout>
        <CommentsContainer>
          <CommentsHeader>댓글 ({commented})</CommentsHeader>
          {/* <PageNationLayout>
            <PageNation
              component="div"
              count={commented}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={"댓글 수"}
            />
          </PageNationLayout> */}
        </CommentsContainer>
        {comments?.slice(offset, limit)?.map((item, index) => (
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
