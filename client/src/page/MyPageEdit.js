import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";

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
  .br {
    border-right: 1px solid;
  }
  .container {
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 10px;
    height: 87%;
    width: 90%;
  }
  .contour {
    border-top: 1px solid;
    border-bottom: 1px solid;
  }
  .flex {
    display: flex;
  }
`;

export default function MyPageEdit() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return (
    <>
      {token !== undefined ? (
        <Wrapper>
          <div className="container">
            <div className="flex">
              <div> 프로필 사진 이름</div>
              <div>
                프로필 사진 내용
                <div>프로필 사진</div>
                <div>이미지 첨부 버튼</div>
              </div>
            </div>
            <div className="contour flex">
              <div> 닉네임 이름</div>
              <div>
                닉네임 내용
                <div>닉네임 칸</div>
              </div>
            </div>
            <div className="flex">
              <div> 비밀번호 이름</div>
              <div>
                비밀번호 내용
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
