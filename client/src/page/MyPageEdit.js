import { useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";

import { patchUser, postImage } from "../api/userAPI";

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
  .message {
    margin-top: 10px;
    font-size: ${({ theme }) => theme.fontSizes.fs12};
    word-break: keep-all;
    text-align: center;
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
  background-color: ${(props) =>
    props.disabled === true ? "#CCCCCC" : "#62B6B7"};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0px;
  border-radius: 5px;
  width: ${(props) => props.width || "80px"};
  height: ${(props) => props.height || "30px"};
  &:hover {
    background-color: ${(props) =>
      props.disabled === true ? "#CCCCCC" : "#439A97"};
  }

  &:active {
    transform: ${(props) => (props.disabled === true ? "none" : "scale(0.95)")};
    box-shadow: ${(props) =>
      props.disabled === true
        ? "none"
        : "3px 2px 22px 1px rgba(0, 0, 0, 0.24)"};
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
  const [fileImage, setFileImage] = useState("");
  const [request, setRequest] = useState({
    username: "",
    password: "",
    profileImageUrl: "",
  });
  const [validityCheck, setValidityCheck] = useState({
    isUsernamePass: false,
    isPasswordPass: false,
    isProfileImageUrlPass: false,
  });
  const inputRef = useRef();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");

  const onImageAttachClick = () => {
    inputRef.current.click();
  };

  const onUploadImage = async () => {
    const file = inputRef.current.files[0];

    if (!file) {
      return;
    }

    setFileImage(URL.createObjectURL(file));
    // console.log(file);
    const formData = new FormData();
    formData.append("files", file);
    // console.log(formData);
    const res = await postImage(formData);
    // console.log(res);
    let profilImageUrl = res.data[0].split("?")[0];
    // console.log(profilImageUrl);
    setRequest({
      ...request,
      profileImageUrl: profilImageUrl,
    });
    // console.log(request);
    if (validityCheck.profilImageUrl === "") {
      setValidityCheck({
        ...validityCheck,
        isProfileImageUrlPass: false,
      });
    } else {
      setValidityCheck({
        ...validityCheck,
        isProfileImageUrlPass: true,
      });
    }
  };

  const onChangeUsername = (e) => {
    setRequest({
      ...request,
      [e.target.id]: e.target.value,
    });
    if (e.target.value.length === 0) {
      setValidityCheck({
        ...validityCheck,
        isUsernamePass: false,
      });
    } else if (e.target.value.length > 8) {
      setValidityCheck({
        ...validityCheck,
        isUsernamePass: false,
      });
    } else {
      setValidityCheck({
        ...validityCheck,
        isUsernamePass: true,
      });
    }
  };

  const onChangePassword = (e) => {
    const passwordValidityCheck =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    setRequest({
      ...request,
      [e.target.id]: e.target.value,
    });
    if (!passwordValidityCheck.test(e.target.value)) {
      setValidityCheck({
        ...validityCheck,
        isPasswordPass: false,
      });
    } else {
      setValidityCheck({
        ...validityCheck,
        isPasswordPass: true,
      });
    }
  };

  const onSubmit = () => {
    patchUser(request);
    // console.log(request);
    alert("개인정보 수정이 완료되었습니다!");
    navigate("/mypage");
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
                  {validityCheck.isProfileImageUrlPass ? (
                    <img src={fileImage} alt="profile" />
                  ) : (
                    <div className="message">이미지를 첨부해주세요</div>
                  )}
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
                  onChange={onChangeUsername}
                />
                {validityCheck.isUsernamePass ? (
                  <div />
                ) : (
                  <div className="message">
                    최대 8자 이하의 닉네임을 입력해주세요
                  </div>
                )}
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
                  onChange={onChangePassword}
                />
                {validityCheck.isPasswordPass ? (
                  <div />
                ) : (
                  <div className="message">
                    8자리 이상, 숫자, 문자, 특수문자($@$!%*#?&)가 들어가야
                    됩니다.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="buttoncontainer flex">
            <Button className="gray" onClick={onCancleButtonClick}>
              취소
            </Button>
            <Button
              disabled={
                !(
                  validityCheck.isUsernamePass &&
                  validityCheck.isPasswordPass &&
                  validityCheck.isProfileImageUrlPass
                )
              }
              onClick={onSubmit}
            >
              수정
            </Button>
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
