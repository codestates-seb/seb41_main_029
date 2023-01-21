import React from "react";
import styled from "styled-components";
import { MainBtn } from "../Button";
import Input from "../Input";
import { FormProvider, useForm } from "react-hook-form";
import { postComment } from "../../api/commentAPI";
import { useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const InputLayout = styled.div`
  display: flex;
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
      width: 620px;
      margin-top: 20px;
    }
    @media screen and (max-width: 800px) {
      width: 120%;
      margin-top: 20px;
    }
  }
`;

const CommentForm = () => {
  const methods = useForm();
  const id = useParams();
  const cookie = new Cookies();
  const Token = cookie.get("token");
  // const userSeq = JSON.parse(localStorage.getItem("userId"));

  const onSubmit = (data) => {
    // const res = await postComment(data, Token, id, userSeq);
    // if (res.status === 201) {
    //   window.location.replace(`/boards/${id.id}`);
    console.log(data);
  };

  return (
    <>
      <InputLayout>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <InputContainer>
              <Input
                className="input"
                width="1033px"
                height="50px"
                placeholder="..."
                fieldName="content"
              />
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
    </>
  );
};

export default CommentForm;
