import React, { useState } from "react";
import { Cookies } from "react-cookie";
import styled from "styled-components";
import { deleteComment, editComment } from "../../api/commentAPI";
import { CommentDate } from "../DateCalculator";
import Input from "../Input";
import CommentVote from "./CommentVote";
import { useForm, FormProvider } from "react-hook-form";

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
  @media screen and (max-width: 1336px) {
    /* width: 90%; */
    height: 0px;
    margin-right: 25px;
  }
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
  height: 100%;
  min-height: 65px;
  border-radius: 10px;
  margin-left: 24px;
  background-color: #f9f7f7;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  @media screen and (max-width: 1336px) {
    width: 90%;
  }
`;
const InputLayout = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 65px;
  border-radius: 10px;
  margin-left: 12px;

  /* background-color: #f9f7f7; */
  padding-top: 8px;
  padding-left: 8px;
  .input {
    @media screen and (max-width: 1336px) {
      width: 95%;
    }
  }
`;
const SubmitEdit = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0px;
  border-radius: 5px;
  margin-top: 15px;
  width: ${(props) => props.width || "80px"};
  height: ${(props) => props.height || "30px"};
  &:hover {
    background-color: ${({ theme }) => theme.colors.main_hover};
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

const SubmitEditLayout = styled.div`
  float: right;
`;

const Comment = ({ comment }) => {
  const methods = useForm();
  const onSubmit = (data) => {
    // const res = await postComment(data, Token, id, userSeq);
    // if (res.status === 201) {
    //   window.location.replace(`/boards/${id.id}`);
    console.log(data);
    window.location.reload();
  };
  const [edit, setEdit] = useState(false);
  // const UserId = JSON.parse(localStorage.getItem("userId"));
  const cookie = new Cookies();
  const token = cookie.get("token");
  const handleClickEdit = () => {
    if (2 !== 2) {
      alert("권한이 없습니다.");
    } else {
      setEdit(!edit);
    }
  };
  const EditSubmit = () => {
    // editComment();
  };
  const handleDelete = () => {
    // deleteComment()
    window.location.reload();
  };
  return (
    <>
      <EtcIcon>
        <EditImg
          src={process.env.PUBLIC_URL + "/image/editIcon.svg"}
          alt="edit"
          onClick={handleClickEdit}
        />
        <DeleteImg
          src={process.env.PUBLIC_URL + "/image/deleteIcon.svg"}
          alt="delete"
          onClick={handleDelete}
        />
      </EtcIcon>
      <CommentInfo>
        {comment?.userName}
        <CommentDate createdAt={comment?.createdAt} />
      </CommentInfo>
      {edit ? (
        <>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
              <InputLayout>
                <Input
                  className="input"
                  width="1100px"
                  height="65px"
                  fieldName="content"
                  defaultValue={comment?.content}
                />
              </InputLayout>
              {/* <EditInput defaultValue={comment?.content} /> */}
              <SubmitEditLayout>
                <SubmitEdit
                  onClick={EditSubmit}
                  width="60px"
                  style={{ marginRight: "35px" }}
                >
                  등록
                </SubmitEdit>
              </SubmitEditLayout>
            </FormProvider>
          </form>
        </>
      ) : (
        <CommentContainer>{comment?.content} </CommentContainer>
      )}

      <CommentVote voteResult={comment?.voteResult} />
    </>
  );
};

export default Comment;
