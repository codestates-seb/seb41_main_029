import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { Cookies } from "react-cookie";

import { getUser, patchUser } from "../api/userAPI";
import Input from "../component/Input";
import AlertWarning from "../component/AlertWarning";

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.container};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 500px;
  justify-content: center;
  margin: 120px auto 0 auto;
  max-width: 500px;
  width: 100%;
  img {
    border-radius: 10px;
    height: 90%;
    width: 90%;
  }
  .br {
    border-right: 3px solid ${(props) => props.theme.colors.container} !important;
  }
  .buttoncontainer {
    align-items: center;
    display: flex;
    justify-content: space-around;
    width: calc(100% - 150px);
    margin-bottom: 30px;
  }
  .container {
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: calc(100% - 50px);
    margin: 30px 0 30px 0;
  }
  .content {
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
  }
  .contour {
    border-top: 3px solid ${(props) => props.theme.colors.container};
    border-bottom: 3px solid ${(props) => props.theme.colors.container};
  }
  .flex {
    display: flex;
    flex-grow: 1;
  }
  .fd-c {
    flex-direction: column;
    justify-content: center;
  }
  .gray {
    background-color: ${(props) => props.theme.colors.gray_02};
    &:hover {
      background-color: ${(props) => props.theme.colors.gray_03};
    }

    &:active {
      transform: scale(0.95);
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
  }
  .hidden {
    display: none;
  }
  .profile {
    align-items: center;
    background-color: ${(props) => props.theme.colors.container};
    border-radius: 10px;
    display: flex;
    height: 100%;
    justify-content: center;
    max-height: 100px;
    max-width: 100px;
    width: 100%;
  }
  .title {
    align-items: center;
    border-right: 1px solid;
    display: flex;
    justify-content: center;
    min-width: 20%;
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0px;
  border-radius: 5px;
  width: ${(props) => props.width || "80px"};
  height: ${(props) => props.height || "30px"};
  &:hover {
    background-color: ${({ theme }) => theme.colors.main_hover};
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

export default function MyPageEdit() {
  const [userInfo, setUserInfo] = useState([]);
  const [fileImage, setFileImage] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const methods = useForm();
  const error = methods?.formState?.errors;

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

  useEffect(() => {
    async function getUserInfo() {
      const res = await getUser(token);
      setUserInfo(res.data.body.user);
    }
    getUserInfo();
  }, []);

  const onUploadImage = (e) => {
    if (!e.target.files) {
      return;
    }

    setFileImage(URL.createObjectURL(e.target.files[0]));
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    for (const keyValue of formData) console.log(keyValue);
  };

  const onUploadImageButtonClick = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  const onCancleButtonClick = () => {
    navigate("/mypage");
  };

  const onSubmit = async (data) => {
    const res = await patchUser(data);
    console.log(res);
  };

  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {token !== undefined ? (
            <Wrapper>
              <div className="container">
                <div className="flex">
                  <div className="title br">
                    {" "}
                    프로필 <br /> 사진{" "}
                  </div>
                  <div className="content">
                    <div className="profile">
                      <img
                        src={fileImage || userInfo.profileImageUrl}
                        alt="profile"
                        fieldName="profileImageUrl"
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={onUploadImage}
                      className="hidden"
                    />
                    <Button
                      onClick={onUploadImageButtonClick}
                      width="120px"
                      height="35px"
                    >
                      이미지 업로드
                    </Button>
                  </div>
                </div>
                <div className="contour flex">
                  <div className="title br"> 닉네임 </div>
                  <div className="content fd-c">
                    <Input
                      id="id"
                      width="280px"
                      height="40px"
                      fieldName="username"
                      validation={nicknameValidation}
                      error={error.nickname}
                      placeholder={userInfo.username}
                    />
                    {error?.nickname && (
                      <AlertWarning text={error.nickname?.message} />
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="title br"> 비밀번호 </div>
                  <div className="content fd-c">
                    <Input
                      id="password"
                      width="15rem"
                      height="40px"
                      fieldName="password"
                      type="password"
                      validation={pwdValidation}
                      error={error?.password}
                    />
                    {error?.password && (
                      <AlertWarning text={error.password?.message} />
                    )}
                  </div>
                </div>
              </div>
              <div className="buttoncontainer flex">
                <Button className="gray" onClick={onCancleButtonClick}>
                  취소
                </Button>
                <Button>수정</Button>
              </div>
            </Wrapper>
          ) : (
            <>
              {alert("로그인이 되어 있지 않습니다!")}
              <Navigate to="/login" />
            </>
          )}
        </form>
      </FormProvider>
    </>
  );
}
