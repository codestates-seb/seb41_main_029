import React, { useState } from "react";
import styled from "styled-components";
import { CommentDate } from "../DateCalculator";
import ReplyVote from "./ReplyVote";
import { BiReply } from "react-icons/bi";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { deleteReply, editReply } from "../../api/reply";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../Input";

const ReplyContainer = styled.div`
  /* display: flex;
  justify-content: center; */
`;

const ReplyLayout = styled.div`
  /* align-items: center; */
  display: flex;
  justify-content: center;
`;
const ReplyLayout1 = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
  padding-left: 24px;
  height: 35px;
  width: 100%;
  max-width: 440px;
`;

const UserInfo = styled.div`
  width: 100%;
  /* margin-top: 16px; */
  margin-left: 18px;
  display: flex;
  .icon {
    width: 25px;
    height: 25px;
    transform: rotate(180deg);
    /* margin-bottom: 122px; */
  }
`;
const Line = styled.div`
  width: 95%;
  margin-top: 20px;
  border: 1px dashed black;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 100%;
  min-height: 65px;
  border-radius: 10px;
  margin-left: 42px;
  margin-right: 24px;
  background-color: white;
  padding: 8px;
  @media screen and (max-width: 1336px) {
    width: 80%;
  }
`;

const EtcIcon = styled.div`
  float: right;
  margin-top: 4px;
  height: 30px;
  margin-right: 24px;
  @media screen and (max-width: 1336px) {
    /* width: 90%; */
    height: 0px;
    margin-right: 12px;
  }
`;
const EditImg = styled.img`
  width: 24px;
  height: 26px;
  margin-bottom: 15px;
  margin-right: 10px;
  cursor: pointer;
`;
const InputLayout = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 65px;
  border-radius: 10px;
  margin-left: 36px;
  display: flex;
  /* background-color: #f9f7f7; */
  padding-top: 8px;
  padding-left: 8px;
  .input {
    @media screen and (max-width: 1336px) {
      width: 90%;
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
  /* float: right; */
  /* width: -10%; */
  margin-right: -45px;
  display: flex;
  flex-direction: row-reverse;
  .btn {
    margin-left: 12px;
    @media screen and (max-width: 1336px) {
      margin-right: 110px;
      /* display: flex; */
    }
  }
`;
const ContentBottom = styled.div`
  margin-left: 20px;
  display: flex;
  width: 90%;
  height: 50px;
`;
const DeleteImg = styled.img`
  width: 36px;
  height: 36px;
  margin-bottom: 10px;
  margin-right: 15px;
  cursor: pointer;
`;

const Reply = ({ reply }) => {
  const methods = useForm();
  const [edit, setEdit] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("token");
  // const { boardSeq } = useParams();
  const userId1 = JSON.parse(localStorage.getItem("userId"));
  const replySeq = reply?.replySeq;
  const handleClickEdit = () => {
    //수정예정
    if (2 !== 2) {
      alert("권한이 없습니다.");
    } else {
      setEdit(!edit);
    }
  };
  const onSubmit = async (data) => {
    editReply(token, data, replySeq);
    window.location.reload();
    console.log(data);
  };
  const handleDelete = () => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      alert("삭제되었습니다");
      deleteReply(token, replySeq);
      window.location.reload();
    }
  };
  console.log(reply.length);
  return (
    <ReplyContainer>
      {/* {reply.length} */}
      <ReplyLayout>
        <Line />
      </ReplyLayout>
      {userId1 === reply?.userId ? (
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
      ) : null}
      <ReplyLayout1>
        <UserInfo>
          <BiReply className="icon" />
          {reply?.username}
          <CommentDate createdAt={reply?.createdAt} />
        </UserInfo>
      </ReplyLayout1>
      {edit ? (
        <>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
              <InputLayout>
                <Input
                  className="input"
                  width="1030px"
                  height="65px"
                  fieldName="content"
                  defaultValue={reply?.content}
                />
                <SubmitEditLayout>
                  <SubmitEdit className="btn" width="60px">
                    수정
                  </SubmitEdit>
                </SubmitEditLayout>
              </InputLayout>
              {/* <EditInput defaultValue={comment?.content} /> */}
            </FormProvider>
          </form>
        </>
      ) : (
        <ContentContainer>{reply?.content}</ContentContainer>
      )}

      <ContentBottom>
        <ReplyVote
          replySeq={reply?.replySeq}
          liked={reply?.liked}
          disliked={reply?.disliked}
        />
      </ContentBottom>
    </ReplyContainer>
  );
};

export default Reply;
