import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";

import { getUser, patchUser } from "../api/userAPI";
import Input from "../component/Input";

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
    border-right: 1px solid;
  }
  .buttoncontainer {
    align-items: center;
    display: flex;
    justify-content: space-around;
    width: calc(100% - 50px);
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
    border-top: 1px solid;
    border-bottom: 1px solid;
  }
  .flex {
    display: flex;
    flex-grow: 1;
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
  const cookies = new Cookies();
  const token = cookies.get("token");
  const inputRef = useRef();
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

  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    async function getUserInfo() {
      const res = await getUser(token);
      setUserInfo(res.data.body.user);
    }
    getUserInfo();
  }, []);
  // 응답 확인용 테스트 코드! 마무리하고 지울 것!
  console.log(userInfo);

  const onUploadImage = (e) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0].name);

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

  return (
    <>
      {token !== undefined ? (
        <Wrapper>
          <div className="container">
            <div className="flex">
              <div className="title">
                {" "}
                프로필 <br /> 사진{" "}
              </div>
              <div className="content">
                <div className="profile">
                  <img src={userInfo.profileImageUrl} alt="profile" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={onUploadImage}
                  className="hidden"
                />
                <Button onClick={onUploadImageButtonClick} width="120px">
                  이미지 업로드
                </Button>
              </div>
            </div>
            <div className="contour flex">
              <div className="title"> 닉네임 </div>
              <div className="content">
                <input placeholder={userInfo.username} />
              </div>
            </div>
            <div className="flex">
              <div className="title"> 비밀번호 </div>
              <div className="content">
                <input />
              </div>
            </div>
          </div>
          <div className="buttoncontainer flex">
            <Button className="gray">취소</Button>
            <Button>수정</Button>
          </div>
        </Wrapper>
      ) : (
        <>
          {alert("로그인이 되어 있지 않습니다!")}
          <Navigate to="/login" />
        </>
      )}
    </>
  );
}
