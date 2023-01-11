import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRef } from "react";

let Container = styled.div`
  margin: 20px;
  width: 316px;
  padding: 20px;
  color: black;
  background-color: ${({ theme }) => theme.colors.container};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
`;

let Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs24};
`;

let InputForm = styled.div``;
let InputBox = styled.div``;
let SignupBtn = styled.button``;

// ---------------FormPractice------------------------

let Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: ;
`;
// ---------------SocialLogin------------------------

let SocialLogin = styled.div``;
let SocialLoginLogo = styled.img`
  width: 40px;
  height: 40px;
  padding: 20px 30px;
`;

export default function Signup() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  console.log(watch("email"));
  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <>
      <div>
        <Container>
          <Title>회원가입</Title>
          <InputForm>
            <InputBox>
              <p>아이디</p>
              <input name="id"></input>
            </InputBox>
            <InputBox>
              <p>닉네임</p>
              <input name="name"></input>
            </InputBox>
            <InputBox>
              <p>비밀번호</p>
              <input name="pwd"></input>
            </InputBox>
            <InputBox>
              <p>비밀번호 확인</p>
              <input name="confirmPwd"></input>
            </InputBox>
          </InputForm>
          <SignupBtn>회원가입</SignupBtn>
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
      </div>

      {/* ------------------------------------------ */}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p>This email field is required</p>}
        <label>Name</label>
        <input
          name="name"
          {...register("name", { required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === "required" && (
          <p>This field is required</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>Your input exceed maximum length</p>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>This field is required</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>Password must have at least 6 characters</p>
        )}
        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <p>This field is required</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "minLength" && (
            <p>Password do not match</p>
          )}
        <input type="submit" />
      </Form>
    </>
  );
}

// confirm할때 useRef 사용?
// watch() 사용?
