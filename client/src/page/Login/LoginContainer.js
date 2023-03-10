import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../component/Input";
import AlertWarning from "../../component/AlertWarning";
import { guestLogin, guestSignup, login, socialLogin } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import { MainBtn } from "../../component/Button";
import { Cookies } from "react-cookie";
import { setCookie } from "../../Cookies";
import axios from "axios";

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
  max-width: 40px;
  height: 40px;
  margin: 20px;
`;
const GuestLayout = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;
const GuestBtn = styled.button`
  background-color: #cccccc;
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0px;
  border-radius: 5px;
  margin-top: 20px;
  width: 200px;
  height: 40px;
  &:hover {
    background-color: #bbbbbb;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;
const LoginContainer = () => {
  const [isAuthorized, setisAuthorized] = useState(true);

  const navigate = useNavigate();
  const cookie = new Cookies();
  const methods = useForm();
  const error = methods?.formState?.errors;

  const guestHandle = () => {
    guestSignup();
    setTimeout(async () => {
      const res = await guestLogin();

      const userId1 = res?.data?.body?.token?.userId;
      localStorage.setItem("userId", JSON.stringify(userId1));
      const token = res.data?.body?.token?.refreshToken;
      cookie.set("token", token);
      navigate("/");
      window.location.reload();
    }, 200);
  };

  const idValidation = {
    required: "???????????? ??????????????????.",
    minLength: {
      value: 4,
      message: "?????? 4??? ????????? ???????????? ??????????????????.",
    },
    maxLength: {
      value: 12,
      message: "?????? 12??? ????????? ???????????? ??????????????????.",
    },
  };

  const passwordValidation = {
    required: "??????????????? ??????????????????.",
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      message: "8????????????, ??????,??????,??????????????? ?????????????????????.",
    },
  };

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res?.response?.data?.status) {
      alert("????????? ????????? ????????????.");
      return setisAuthorized(false);
    } else if (res?.status === 200) {
      const userId1 = res?.data?.body?.token?.userId;

      localStorage.setItem("userId", JSON.stringify(userId1));
      const token = res.data?.body?.token?.refreshToken;
      cookie.set("token", token);
      navigate("/");
      window.location.reload();
      return setisAuthorized(true);
      // dispatch(setUser({ token, userId1 }));
    } else {
      alert("????????? ?????????????????? ????????????.");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputLayout>
            <LabelLayout>
              <label>?????????</label>
            </LabelLayout>
            <InputContainer>
              <Input
                id="id"
                width="15rem"
                height="40px"
                fieldName="userId"
                validation={idValidation}
                error={error.userId}
              />
              {error?.userId && <AlertWarning text={error.userId?.message} />}
            </InputContainer>
            <LabelLayout>
              <label>????????????</label>
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
                <AlertWarning text="???????????? ??????????????? ?????? ??????????????????." />
              )}
            </InputContainer>
          </InputLayout>
          <LoginBtnLayout>
            <MainBtn height="40px" width="200px" text={"?????????"} />
          </LoginBtnLayout>
        </form>
      </FormProvider>
      <GuestLayout>
        <GuestBtn onClick={guestHandle}>????????? ?????????</GuestBtn>
      </GuestLayout>
    </>
  );
};

export default LoginContainer;
{
  /* <SocialLogin> */
}
{
  /* <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email"> */
}
{
  /* <SocialLoginLogo
  src={process.env.PUBLIC_URL + "/image/google.svg"}
  alt="GOOGLE" */
}
// onClick={handleSocial}/>
{
  /* </a> */
}
{
  /* <SocialLoginLogo
  src={process.env.PUBLIC_URL + "/image/naver.svg"}
  alt="NAVER"
/> */
}
{
  /* `https://kauth.kakao.com/oauth/authorize?client_id=${8e9ebc53811a31af7c567edfb77bff91}&redirect_uri=${http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/kakao}&response_type=code` */
}
{
  /* <a href="https://kauth.kakao.com/oauth/authorize?client_id=8e9ebc53811a31af7c567edfb77bff91&redirect_uri=http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/kakao&response_type=code">
  <SocialLoginLogo
    src={process.env.PUBLIC_URL + "/image/cacao.svg"}
    alt="KAKAO"
  />
</a>
</SocialLogin> */
}
