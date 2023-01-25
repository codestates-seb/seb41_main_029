import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../Input";
import { BiReply } from "react-icons/bi";
import { MainBtn } from "../Button";
import { postReply } from "../../api/reply";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
const CommentReplyLayout = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  /* height: 20px; */
  padding-top: 12px;
  flex-direction: row-reverse;
  /* margin-right: 40px; */
  margin-left: 20px;
  align-items: center;
  /* justify-content: center; */
  cursor: pointer;
  @media screen and (max-width: 1336px) {
    margin-left: 0px;
    margin-right: 35px;
    /* max-width: 630px;  */
    /* margin-top: 20px; */
  }
  .icon {
    width: 30px;
    height: 30px;
    transform: rotate(180deg);
  }
`;

const CommentReplyLayout1 = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  padding-top: 12px;
  /* flex-direction: row-reverse; */
  /* margin-right: 40px; */
  align-items: center;
  margin-top: 50px;
  margin-right: 150px;
  /* margin-left: 24px; */
  justify-content: center;
  @media screen and (max-width: 1336px) {
    /* width: 70%;
    max-width: 630px; */
    /* margin-top: 20px; */
  }
  .form {
    @media screen and (max-width: 1336px) {
      width: 80%;
      margin-right: 450px;
      /* max-width: 630px; 
     margin-top: 20px; */
    }
  }
`;
const Line = styled.div`
  width: 100%;
  border: 1px dotted black;
  margin-bottom: 20px;
  @media screen and (max-width: 1336px) {
    /* width: 70%; */
    /* max-width: 630px; 
     margin-top: 20px; */
  }
`;
const ReplyContainer = styled.div`
  display: flex;
  float: right;
  width: 100%;
  /* height: 100px; */
  /* .input {
    @media screen and (max-width: 1336px) {
      width: 100%; */
  /* max-width: 630px; 
     margin-top: 20px; */
`;

const CommentReply = ({ commentSeq }) => {
  const [reply, setReply] = useState();
  const cookie = new Cookies();
  const { boardSeq } = useParams();
  // console.log(commentSeq);
  const token = cookie.get("token");
  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
    postReply(token, data, boardSeq, commentSeq);
    window.location.reload();
  };

  const handleReply = () => {
    setReply(!reply);
  };

  return (
    <>
      {reply ? (
        <>
          <CommentReplyLayout1>
            <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
              <Line />
              <FormProvider {...methods}>
                <ReplyContainer>
                  <Input
                    fieldName="content"
                    className="input"
                    width="1135px"
                    height="65px"
                  />
                </ReplyContainer>
                <MainBtn text={"등록"} />
              </FormProvider>
            </form>
          </CommentReplyLayout1>
        </>
      ) : (
        <CommentReplyLayout onClick={handleReply}>
          <span style={{ width: "30px" }}> 답글</span>

          <BiReply className="icon" />
        </CommentReplyLayout>
      )}
    </>
  );
};

export default CommentReply;
