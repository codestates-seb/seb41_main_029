import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../Input";

const CommentReplyLayout = styled.div`
  width: 100%;
  /* max-width: 1000px; */
  display: flex;
  padding-top: 12px;
  /* flex-direction: row-reverse; */
  margin-left: 30px;
  align-items: center;
  /* justify-content: center; */
`;

const CommentReply = () => {
  const [reply, setReply] = useState();
  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const handleReply = () => {
    setReply(!reply);
  };

  return (
    <>
      {reply ? (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <Input />
          </FormProvider>
        </form>
      ) : (
        <CommentReplyLayout onClick={handleReply}>답글</CommentReplyLayout>
      )}
    </>
  );
};

export default CommentReply;
