import styled from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
import { useRef } from "react";
import Input from "../component/Input";
import AlertWarning from "../component/AlertWarning";
import { MainBtn } from "../component/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let SignupBackground = styled.div`
  margin: 120px 16px 0 16px;
  width: 316px;
  background-color: ${({ theme }) => theme.colors.container};
  border-radius: 10px;
  align-items: center;
`;

const InputLayout = styled.div`
  margin-top: 30px;
  margin-left: 35px;
`;

const LabelLayout = styled.div`
  margin-top: 12px;
`;

let Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs24};
`;

let InputForm = styled.div``;
let InputBox = styled.div``;
let SignupBtn = styled.button``;

let BtnLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
`;

const InputContainer = styled.div`
  margin-top: 4px;
`;

// 소셜로그인

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

export default function Signup() {
  const methods = useForm();
  const getValues = methods?.getValues;
  const password = useRef();

  const navigate = useNavigate();

  const idValidation = {
    required: "아이디를 입력해주세요.",
    minLength: {
      value: 4,
      message: "최소 4자 이상의 아이디를 입력해주세요.",
    },
    maxLength: {
      value: 12,
      message: "최대 12자 이하의 아이디를 입력해주세요.",
    },
  };

  const nicknameValidation = {
    required: "닉네임을 입력해주세요.",
    maxLength: {
      value: 8,
      message: "최대 8자 이하의 닉네임을 입력해주세요.",
    },
  };

  const pwdValidation = {
    required: "비밀번호를 입력해주세요.",
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      message: "8자리이상, 숫자,문자,특수문자가 들어가야됩니다.",
    },
  };
  const confirmPwdValidation = {
    required: "비밀번호를 입력해주세요.",
    validate: {
      check: (val) => {
        if (getValues("password") !== val) {
          return "비밀번호가 일치하지 않습니다.";
        }
      },
    },
  };

  const error = methods?.formState?.errors;

  // 회원가입 요청
  const onSubmit = (data) => {
    // console.log(data);
    axios
      .post(
        "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users/signup",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        // console.log(res.data);
        navigate("/signupnotice");
      })
      .catch((err) => {
        // console.log(err);
        alert("이미 등록된 아이디입니다.");
      });
  };

  return (
    <>
      <LoginLayout>
        <SignupBackground>
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
                  {error?.id && <AlertWarning text={error.id?.message} />}
                </InputContainer>
                <LabelLayout>
                  <label>닉네임</label>
                </LabelLayout>
                <InputContainer>
                  <Input
                    id="id"
                    width="15rem"
                    height="40px"
                    fieldName="username"
                    validation={nicknameValidation}
                    error={error.nickname}
                  />
                  {error?.nickname && (
                    <AlertWarning text={error.nickname?.message} />
                  )}
                </InputContainer>
                <LabelLayout>
                  <label>비밀번호</label>
                </LabelLayout>
                <InputContainer>
                  <Input
                    type="password"
                    width="15rem"
                    height="40px"
                    fieldName="password"
                    validation={pwdValidation}
                    error={error.password}
                  />
                  {error?.password && (
                    <AlertWarning text={error.password?.message} />
                  )}
                </InputContainer>
              </InputLayout>
              <BtnLayout>
                <MainBtn
                  type="submit"
                  text={"회원 가입"}
                  width="210px"
                  height="40px"
                />
              </BtnLayout>
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
        </SignupBackground>
      </LoginLayout>
    </>
  );
}
