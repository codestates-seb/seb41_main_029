import styled from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
import { useRef } from "react";
import Input from "../component/Input";
import AlertWarning from "../component/AlertWarning";
import { MainBtn } from "../component/Button";

const InputLayout = styled.div`
  margin-top: 30px;
  margin-left: 30px;
`;

let Container = styled.div`
  margin-top: 200px;
  width: 316px;
  /* height: 400px; */
  background-color: ${({ theme }) => theme.colors.container};
  border-radius: 10px;
  align-items: center;
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
  align-items: center;
`;

// ---------------FormPractice------------------------

let Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
// ---------------SocialLogin------------------------

let SocialLogin = styled.div`
  display: flex;
  justify-content: center;
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
      message: "최대 12자 이하의 아이디를 입력해주세요.",
    },
  };

  const nicknameValidation = {
    required: "입력해 주세요.",
    maxLength: {
      value: 8,
      message: "최대 8자 이하의 아이디를 입력해주세요.",
    },
  };

  const pwdValidation = {
    required: "입력해 주세요.",
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      message: "8자리이상, 숫자,문자,특수문자가 들어가야됩니다.",
    },
  };
  // const confirmPwdValidation = {
  //   required: "입력해 주세요.",
  //   validate: {
  //     check: (value) => {
  //       if (getValues("password") !== value) {
  //         return "비밀번호가 일치하지 않습니다";
  //       }
  //     },
  //   },
  // };
  const confirmPwdValidation = {
    required: "입력해주세요",
    validate: {
      check: (val) => {
        if (getValues("password") !== val) {
          return "비밀번호가 일치하지 않습니다.";
        }
      },
    },
  };

  const error = methods?.formState?.errors;

  return (
    <>
      <Container>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputLayout>
              <label>아이디</label>
              <div>
                <Input
                  id="id"
                  width="15rem"
                  height="35px"
                  fieldName="id"
                  validation={idValidation}
                  error={error.id}
                />
                {error?.id && <AlertWarning text={error.id?.message} />}
              </div>
              <label>닉네임</label>
              <div>
                <Input
                  id="id"
                  width="15rem"
                  height="35px"
                  fieldName="nickname"
                  validation={nicknameValidation}
                  error={error.nickname}
                />
                {error?.nickname && (
                  <AlertWarning text={error.nickname?.message} />
                )}
              </div>
              <label>비밀번호</label>
              <div>
                <Input
                  type="password"
                  width="15rem"
                  height="35px"
                  fieldName="password"
                  validation={pwdValidation}
                  error={error.password}
                />
                {error?.password && (
                  <AlertWarning text={error.password?.message} />
                )}
              </div>
              <label>비밀번호 확인</label>
              <div>
                <Input
                  type="password"
                  width="15rem"
                  height="35px"
                  fieldName="confirmPassword"
                  validation={confirmPwdValidation}
                  error={error.confirmPassword}
                />
                {error?.confirmPassword && (
                  <AlertWarning text={error.confirmPassword?.message} />
                )}
              </div>
            </InputLayout>
            <BtnLayout>
              <MainBtn text={"회원가입"} />
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
      </Container>
    </>
  );
}

// confirm할때 useRef 사용?
// watch() 사용?
