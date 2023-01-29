import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";

import { getUser, patchUser, postImage } from "../api/userAPI";

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

const Input = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid #62b6b7;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes.fs16};
`;

export default function MyPageEdit() {
  const [userInfo, setUserInfo] = useState([]);
  const [fileImage, setFileImage] = useState("");
  const [request, setRequest] = useState({
    username: "",
    password: "",
    profileImageUrl: "",
  });
  const [validityCheck, setValidityCheck] = useState({
    usernameMessage: "",
    passwordMeassge: "",
    isUsernamePass: false,
    isPasswordPass: false,
  });
  const inputRef = useRef();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    async function getUserInfo() {
      const res = await getUser(token);
      setUserInfo(res.data.body.user);
    }
    getUserInfo();
  }, []);

  const onImageAttachClick = () => {
    inputRef.current.click();
  };

  const onUploadImage = async () => {
    const file = inputRef.current.files[0];

    if (!file) {
      return;
    }

    setFileImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("files", file);
    const res = await postImage(formData);
    let profilImageUrl = res.data[0].split("?")[0];
    setRequest({
      ...request,
      profileImageUrl: profilImageUrl,
    });
  };

  const onChangeInput = (e) => {
    setRequest({
      ...request,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async () => {
    patchUser(request);
  };

  const onCancleButtonClick = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
    navigate("/mypage");
  };

  return (
    <>
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
                  />
                </div>
                <input
                  className="hidden"
                  id="profileImageUrl"
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={onUploadImage}
                />
                <Button width="120px" onClick={onImageAttachClick}>
                  이미지 첨부
                </Button>
              </div>
            </div>
            <div className="contour flex">
              <div className="title br"> 닉네임 </div>
              <div className="content fd-c">
                <Input
                  id="username"
                  width="80%"
                  height="40px"
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="flex">
              <div className="title br"> 비밀번호 </div>
              <div className="content fd-c">
                <Input
                  id="password"
                  width="80%"
                  height="40px"
                  type="password"
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>
          <div className="buttoncontainer flex">
            <Button className="gray" onClick={onCancleButtonClick}>
              취소
            </Button>
            <Button onClick={onSubmit}>수정</Button>
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
