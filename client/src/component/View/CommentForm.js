import React from "react";
import styled from "styled-components";
import { MainBtn } from "../Button";
import Input from "../Input";
import { FormProvider, useForm } from "react-hook-form";

const InputLayout = styled.div`
  margin-left: 88px;
`;
const InputContainer = styled.div`
  margin-top: 20px;
`;

const CommentForm = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <InputLayout>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <InputContainer>
              <Input
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
