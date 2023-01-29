import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../Input";
import { BiReply } from "react-icons/bi";
import { MainBtn } from "../Button";
import { postReply } from "../../api/reply";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CommentReplyLayout = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  /* height: 20px; */
  padding-top: 12px;
  flex-direction: row-reverse;
  /* margin-right: 40px; */
  margin-left: 30px;
  align-items: center;
  /* justify-content: center; */
  cursor: pointer;
  @media screen and (max-width: 1336px) {
    margin-left: 0px;
    margin-right: 35px;
    /* max-width: 630px;  */
    /* margin-top: 20px; */
  }
  /* .icon {
    width: 30px;
    height: 30px;
    transform: rotate(180deg);
  } */
  .replybtn {
    cursor: pointer;
    width: 60px;
    height: 38px;
    border: 1px solid #62b6b7;
    border-radius: 10px;
    &:active {
      transform: scale(0.95);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
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
    /* width: 100%; */
    /* max-width: 720px; */
    /* margin-top: 20px; */
  }
  .form {
    @media screen and (max-width: 1336px) {
      width: 80%;
      margin-right: 450px;
      /* max-width: 630px; 
     margin-top: 20px; */
    }
    @media screen and (max-width: 750px) {
      width: 60%;
      max-width: 300px;
      margin-right: 850px;
      /* max-width: 630px; 
     margin-top: 20px; */
    }
  }
  .cancle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
    margin-left: 100px;
    width: 80px;
    height: 30px;
    border-radius: 5px;
    color: white;
    background-color: #bbbbbb;
    &:hover {
      background-color: #aaaaaa;
    }

    &:active {
      transform: scale(0.95);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
  }
`;
const BtnLayout = styled.div`
  /* display: flex; */
`;
const Line = styled.div`
  width: 100%;
  border: 1px dotted black;
  margin-bottom: 20px;
  @media screen and (max-width: 750px) {
    width: 227%;
    /* max-width: 630px; 
     margin-top: 20px; */
  }
`;
const ReplyContainer = styled.div`
  display: flex;
  float: right;
  width: 100%;
  max-width: 1440px;
  /* height: 100px; */
  .input {
    @media screen and (max-width: 1336px) {
      /* width: 100%; */
      /* width: 630px; */
      /* width: fit-content; */
      /* width: 63rem; */
      /* max-width: 600px; */
    }
  }
`;

const CommentReply = ({ commentSeq }) => {
  const [reply, setReply] = useState();
  const cookie = new Cookies();
  const { boardSeq } = useParams();
  const navigate = useNavigate();
  // console.log(commentSeq);
  const token = cookie.get("token");
  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
    postReply(token, data, boardSeq, commentSeq);
    window.location.reload();
  };
  const EditCancle = () => {
    setReply(!reply);
  };

  const handleReply = () => {
    if (!token) {
      if (window.confirm("로그인 상태가 아닙니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      setReply(!reply);
    }
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
                <BtnLayout>
                  <MainBtn text={"등록"} />
                  <div onClick={EditCancle} className="cancle" text={"취소"}>
                    취소
                  </div>
                </BtnLayout>
              </FormProvider>
            </form>
          </CommentReplyLayout1>
        </>
      ) : (
        <CommentReplyLayout onClick={handleReply}>
          <button className="replybtn">
            <span style={{ width: "30px" }}> 답글</span>
          </button>
        </CommentReplyLayout>
      )}
    </>
  );
};

export default CommentReply;
