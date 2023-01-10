import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../component/Input";
import AlertWarning from "../../component/AlertWarning";
import { login } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";

const InputLayout = styled.div`
  margin-top: 30px;
  margin-left: 30px;
`;

const LoginBtnLayout = styled.div`
  margin-top: 30px;
  margin-left: 90px;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;

const LoginBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0px;
  border-radius: 3px;
  margin-top: 20px;
  width: 80px;
  height: 30px;
  &:active {
    transform: scale(0.9);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

const LoginContainer = () => {
  const methods = useForm();
  const error = methods?.formState?.errors;
  const onSubmit = (data) => {
    console.log(data);
  };
  const idValidation = {
    required: "입력해 주세요.",
    minLength: {
      value: 4,
      message: "최소 4자 이상의 아이디를 입력해주세요.",
    },
    maxLength: {
      value: 12,
      message: "최대 12지 이하의 아이디를 입력해주세요.",
    },
  };

  const passwordValidation = {
    required: "입력해 주세요.",
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      message: "8자리이상, 숫자,문자,특수문자가 들어가야됩니다.",
    },
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputLayout>
            <label>아이디</label>
            <div>
              <Input
                id="id"
                width="10rem"
                height="25.5px"
                fieldName="id"
                validation={idValidation}
                error={error.id}
              />
              {error?.id && <AlertWarning text={error.id?.message} />}
            </div>
            <label>비밀번호</label>
            <div>
              <Input
                id="password"
                width="10rem"
                height="25.5px"
                fieldName="password"
                type="password"
                validation={passwordValidation}
                error={error?.password}
              />
              {error?.password && (
                <AlertWarning text={error.password?.message} />
              )}
              {/* {!error?.password && !isAuthorized && (
            <AlertWarning text="email or password is incorrect" />
          )} */}
            </div>
            <LoginBtnLayout>
              <LoginBtn>로그인</LoginBtn>
            </LoginBtnLayout>
          </InputLayout>
        </form>
      </FormProvider>
    </>
  );
};

export default LoginContainer;
