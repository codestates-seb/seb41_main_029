import React from "react";
import styled from "styled-components";
import { MainBtn } from "../Button";
import Input from "../Input";
import { FormProvider, useForm } from "react-hook-form";
import { postComment } from "../../api/commentAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const InputLayout = styled.div`
  display: flex;
  /* margin-left: 8px; */
  justify-content: center;
  width: 100%;
`;
const InputContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  @media screen and (max-width: 1336px) {
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
  }
  .input {
    @media screen and (max-width: 1336px) {
      width: 630px;
      margin-top: 20px;
    }
    @media screen and (max-width: 800px) {
      width: 120%;
      /* max-width: 750px; */
      margin-top: 20px;
    }
  }
`;

const CommentForm = () => {
  const methods = useForm();
  const id = useParams();
  const navigate = useNavigate();
  const cookie = new Cookies();
  const Token = cookie.get("token");
  // const userSeq = JSON.parse(localStorage.getItem("userId"));

  const handleInput = () => {
    if (!Token) {
      if (window.confirm("로그인 상태가 아닙니다. 로그인하시겠습니까?")) {
        navigate("/login");
      }
    }
  };
  const onSubmit = (data) => {
    // const res = await postComment(data, Token, id, userSeq);
    // if (res.status === 201) {
    //   window.location.replace(`/boards/${id.id}`);
    if (!Token) {
      if (window.confirm("로그인 상태가 아닙니다. 로그인하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      // postComment()
      // navigate("/writing")
      console.log(data);
    }
  };

  return (
    <>
      <InputLayout>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <InputContainer>
              <Input
                className="input"
                width="1080px"
                height="50px"
                placeholder="..."
                fieldName="content"
                onClick={handleInput}
              />
              <MainBtn
                style={{ marginLeft: "30px" }}
                width="90px"
                height="52px"
                text={"등록"}
              />
            </InputContainer>
          </FormProvider>
        </form>
      </InputLayout>
    </>
  );
};

export default CommentForm;
