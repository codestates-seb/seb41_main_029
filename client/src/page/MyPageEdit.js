import { useRef } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";

import { MainBtn } from "../component/Button";

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.container};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 900px;
  justify-content: center;
  margin: 120px auto 0 auto;
  max-width: 900px;
  width: 100%;
  img {
    border-radius: 10px;
    height: 90%;
    width: 90%;
  }
  .br {
    border-right: 1px solid;
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
  .profile {
    align-items: center;
    background-color: ${(props) => props.theme.colors.container};
    border-radius: 10px;
    display: flex;
    height: 100%;
    justify-content: center;
    max-height: 200px;
    max-width: 200px;
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

export default function MyPageEdit() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const inputRef = useRef();

  const onUploadImage =
    ((e) => {
      if (!e.target.files) {
        return;
      }
      console.log(e.target.files[0].name);
    },
    []);

  const onUploadImageButtonClick =
    (() => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.click();
    },
    []);

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
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/image/maciek-sulkowski-58tP7g7x1LQ-unsplash.jpg"
                    }
                    alt="profile"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={onUploadImage}
                />
                <MainBtn
                  text="이미지 업로드"
                  width="120px"
                  onClick={onUploadImageButtonClick}
                />
              </div>
            </div>
            <div className="contour flex">
              <div className="title"> 닉네임 </div>
              <div className="content">
                <div>닉네임 칸</div>
              </div>
            </div>
            <div className="flex">
              <div className="title"> 비밀번호 </div>
              <div className="content">
                <div>비밀번호 칸</div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div> 취소</div>
            <div> 등록</div>
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
