import styled from "styled-components";
import * as React from "react";
import WritingMui from "./WritingMui";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const TotalContainer = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 80px;

  @media (max-width: 1336px) {
    width: 100%;
    height: 100%;
  }

  // 글 쓰는 창 중앙으로 정렬
  .ck-editor__main {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1336px) {
      padding: 0 4% 0 4%;
    }
  }
  // 글 쓰는 창 크기 조절
  .ck-editor__editable {
    min-height: 400px;
    margin-bottom: 20px;
    width: 1121px;
    @media (max-width: 1336px) {
      width: 100%;
      height: 100%;
    }
  }
  // 글 쓰는 창
  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
    border-radius: 0 0 10px 10px;
    outline: none;
  }

  // 아이콘 부분
  .ck-reset_all :not(.ck-reset_all-excluded *),
  .ck.ck-reset_all {
    @media (max-width: 1336px) {
      width: 97.93%;
    }
  }

  .ck-reset_all {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1336px) {
      margin-left: 3%;
    }
  }

  // 아이콘 끝 버튼
  .ck.ck-button.ck-disabled .ck-button__icon,
  a.ck.ck-button.ck-disabled .ck-button__icon {
    @media (max-width: 570px) {
      display: none;
    }
  }

  // 아이콘들 세부 기능
  .ck.ck-toolbar.ck-toolbar_grouping > .ck-toolbar__items {
    button {
      @media (max-width: 1336px) {
        width: 80px;
      }
      svg {
        width: 31px;
      }
    }
    div {
      @media (max-width: 1336px) {
        width: 100px;
      }
    }
  }

  // 이미지 버튼 기능
  .ck-file-dialog-button {
    @media (max-width: 631px) {
      display: none;
    }
  }

  // 아이콘 있는 창
  .ck-toolbar {
    width: 1141px;
    border-radius: 20px 20px 0 0;
    @media (max-width: 1336px) {
      /* margin-top: 4%; 위 아래로 정렬시 필요!!!*/
    }
  }

  //아이콘 크기
  .ck.ck-icon {
    @media (max-width: 1336px) {
    }
  }

  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
    border-radius: 10px 10px 0 0;
    @media (max-width: 1336px) {
    }
  }

  // 아이콘 클릭 안되게 하는 classname
  [dir="ltr"]
    .ck.ck-dropdown
    .ck-button.ck-dropdown__button:not(.ck-button_with-text) {
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

export const ContainerView = styled.div`
  width: ${({ theme }) => theme.deviceSizes.tablet};
  background-color: ${({ theme }) => theme.colors.container};
  height: ${(props) => (props.height ? props.height : "704px")};
  border-radius: ${(props) => (props.radius ? props.radius : "20px")};
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  @media (max-width: 1336px) {
    width: 95%;
    height: 100%;
  }
`;

export default function Writing() {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  return (
    <>
      {Token !== undefined ? (
        <TotalContainer>
          <ContainerView>
            <WritingMui />
          </ContainerView>
        </TotalContainer>
      ) : (
        <>
          {alert("로그인이 되어 있지 않습니다!")}
          <Navigate to="/login" />
        </>
      )}
    </>
  );
}
