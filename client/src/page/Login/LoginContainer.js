import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../component/Input";
import AlertWarning from "../../component/AlertWarning";
import { login } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import { MainBtn } from "../../component/Button";
import { Cookies } from "react-cookie";

import { setCookie } from "../../Cookies";

const InputLayout = styled.div`
  margin-top: 30px;
  margin-left: 35px;
`;

const LabelLayout = styled.div`
  margin-top: 12px;
`;

const LoginBtnLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
`;

const InputContainer = styled.div`
  margin-top: 4px;
`;
let SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 4px;
`;
let SocialLoginLogo = styled.img`
  width: 40px;
  height: 40px;
  margin: 20px;
`;

const LoginContainer = () => {
  const [isAuthorized, setisAuthorized] = useState(true);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookie = new Cookies();
  const methods = useForm();
  const error = methods?.formState?.errors;

  const idValidation = {
    required: "아이디를 입력해주세요.",
    minLength: {
      value: 4,
      message: "최소 4자 이상의 아이디를 입력해주세요.",
    },
    // maxLength: {
    //   value: 12,
    //   message: "최대 12자 이하의 아이디를 입력해주세요.",
    // },
  };

  const passwordValidation = {
    required: "비밀번호를 입력해주세요.",
    // pattern: {
    //   value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
    //   message: "8자리이상, 숫자,문자,특수문자가 들어가야됩니다.",
    // },
  };
  // const expireDate = new Date()
  // expireDate.setMinutes(expireDate.getMinutes() + 10)
  const onSubmit = async (data) => {
    const res = await login(data);
    if (res?.status !== 200) {
      alert("가입된 정보가 없습니다.");
      return setisAuthorized(false);
    } else {
      // console.log(res?.data?.body?.token?.userId);
      const userId1 = res?.data?.body?.token?.userId;
      // console.log(userId1);
      localStorage.setItem("userId", JSON.stringify(userId1));
      const token = res.data?.body?.token?.refreshToken;
      cookie.set("token", token);
      // dispatch(setUser({ token, userId1 }));
      navigate("/");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputLayout>
            <LabelLayout>
              <label>아이디</label>
            </LabelLayout>
            <InputContainer>
              <Input
                id="id"
                width="15rem"
                height="40px"
                fieldName="userId"
                validation={idValidation}
                error={error.id}
              />
              {error?.username && (
                <AlertWarning text={error.username?.message} />
              )}
            </InputContainer>
            <LabelLayout>
              <label>비밀번호</label>
            </LabelLayout>
            <InputContainer>
              <Input
                id="password"
                width="15rem"
                height="40px"
                fieldName="password"
                type="password"
                validation={passwordValidation}
                error={error?.password}
              />
              {error?.password && (
                <AlertWarning text={error.password?.message} />
              )}
              {!error?.password && !isAuthorized && (
                <AlertWarning text="아이디와 비밀번호를 다시 확인해주세요." />
              )}
            </InputContainer>
          </InputLayout>
          <LoginBtnLayout>
            <MainBtn height="40px" width="200px" text={"로그인"} />
          </LoginBtnLayout>
        </form>
      </FormProvider>
      <SocialLogin>
        <SocialLoginLogo
          src={process.env.PUBLIC_URL + "/image/google.svg"}
          alt=""
        />
        <SocialLoginLogo
          src={process.env.PUBLIC_URL + "/image/naver.svg"}
          alt=""
        />
        <SocialLoginLogo
          src={process.env.PUBLIC_URL + "/image/cacao.svg"}
          alt=""
        />
      </SocialLogin>
    </>
  );
};

export default LoginContainer;
