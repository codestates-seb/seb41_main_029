import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { MainBtn } from "../Button";
import Input from "../Input";

const CommentsLayout = styled.div`
  width: 1250px;
  margin-top: 160px;
  /* align-items: center;
  justify-content: center; */
  margin-left: 88px;
`;

const CommentLayout = styled.div`
  width: 1160px;
  /* height: 160px; */
  background-color: ${({ theme }) => theme.colors.gray_02};
  border-radius: 10px;
  margin-top: 24px;
  padding-bottom: 20px;
`;

const CommentInfo = styled.div`
  padding-top: 16px;
  padding-left: 24px;
  height: 35px;
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
  width: 1100px;
  height: 65px;
  border-radius: 10px;
  margin-left: 24px;
  background-color: #f9f7f7;
  padding-top: 8px;
  padding-left: 8px;
`;

const InputLayout = styled.div``;
const InputContainer = styled.div`
  margin-top: 20px;
`;

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
const VoteContainer = styled.div`
  display: flex;
`;

const Count = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  margin-top: 3px;
  margin-left: 5px;
`;
const Comments = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <CommentsLayout>
        댓글 (1)
        <CommentLayout>
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
          <CommentInfo>박승철 (23/01/04)</CommentInfo>
          <CommentContainer>좋은 글이네요! </CommentContainer>
          <VoteBtn>
            <VoteContainer>
              <img
                src={process.env.PUBLIC_URL + "/image/upVote.svg"}
                alt="delete"
                width="30px"
              />
              <Count>3</Count>
            </VoteContainer>
          </VoteBtn>
          <VoteBtn1>
            <VoteContainer>
              <img
                src={process.env.PUBLIC_URL + "/image/downVote.svg"}
                alt="delete"
                width="28px"
              />
              <Count>0</Count>
            </VoteContainer>
          </VoteBtn1>
        </CommentLayout>
        <InputLayout>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
              <InputContainer>
                <Input width="1033px" height="50px" placeholder="..." />
                <MainBtn
                  style={{ marginLeft: "30px" }}
                  width="90px"
                  height="50px"
                  text={"등록"}
                />
              </InputContainer>
            </FormProvider>
          </form>
        </InputLayout>
      </CommentsLayout>
    </>
  );
};

export default Comments;
