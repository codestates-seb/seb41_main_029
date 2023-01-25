import styled from "styled-components";
import theme from "../../Theme";
import axios from "axios";
import * as React from "react";
import EditWritingEditor from "./EditWritingContainer";
import { useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import EditWritingMui from "./EditWritingMui";

const TotalContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  margin-top: 80px;
  /* !importantf를 하면 css 안먹는걸 우선적으로 적용하게 해준다  */

  // outline: none; 적용되는 걸 찾자
  // 글 쓰는 창 중앙으로 정렬
  .ck-editor__main {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1336px) {
      padding: 0 4% 0 4%;
      /* margin: 0 4% 0 4%; */
    }
  }
  // 글 쓰는 창 크기 조절
  .ck-editor__editable {
    min-height: 400px;
    margin-bottom: 20px;
    width: 1120px;

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

  //--------------------------------------------------------------------------------------------

  // 아이콘 부분 ,반응형 크기 조절
  // 앤 그냥 전체 부분이네 아예
  .ck-reset_all :not(.ck-reset_all-excluded *),
  .ck.ck-reset_all {
    // 처음 이걸 써서 왼쪽으로 살짝 밀려 있는 걸
    @media (max-width: 1336px) {
      /* width: 1123px; */
      width: 97.8%;
      // 이게 줄이는 순간 아이콘들 간격이 벌어진다
      // %로 설정하면 아이콘들이 다 보이고 px로 하면 ...으로 표시가 된다
    }
  }

  .ck-reset_all {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1336px) {
      // 애가 밀려 있는 걸 오른쪽으로 밀어서 위치를 밑이랑 같이 맞춰줌
      /* margin-left: 3.1%; // ok! */ /* width: 97.8%; 같이 세트 */
      /* margin-left: 3.9%; width: 1123px; 사이즈 세트 인데 ... 으로 나온다 // ok! */
      margin-left: 3.1%;
    }
  }

  // 아이콘 끝의 버튼 2개 건들이지 말것@@@@@@@
  .ck.ck-button.ck-disabled .ck-button__icon,
  a.ck.ck-button.ck-disabled .ck-button__icon {
    /* @media (max-width: 1336px) {
      width: 50px;
    } */
    @media (max-width: 560px) {
      display: none;
    }
  }
  /* .ck.ck-dropdown {
    @media (max-width: 1336px) {
      width: 500px;
    }
  } */
  // 이미지 아이콘 옆의 아이콘 4개가 사라진다 ㅅㅂ 뭔 4개야 맨 앞에 아이콘도 같이 사라진다
  .ck.ck-dropdown {
    /* @media (max-width: 390px) {
      display: none;
    } */
  }
  // 아이콘들 세부 기능 건드리지 말것@@@@@@@
  .ck.ck-toolbar.ck-toolbar_grouping > .ck-toolbar__items {
    button {
      @media (max-width: 1336px) {
        width: 80px;
      }
      svg {
        /* border: 2px solid red; */
        width: 31px;
      }
    }
    div {
      /* border: 2px solid red; */
      @media (max-width: 1336px) {
        width: 100px;
      }
    }
  }

  // 이미지 버튼 기능 570 되면 사라짐 건들이지 말것@@@@@@@ 크기만 조절
  .ck-file-dialog-button {
    @media (max-width: 625px) {
      display: none;
    }
  }
  /* .ck.ck-button.ck-off.ck-dropdown__button
    .ck.ck-button.ck-off.ck-button_with-text.ck-dropdown__button {
    width: 100px; // 작동 안함확인 하기
  } */

  // 아이콘 있는 창 중앙으로 정렬 건들이지 말것@@@@@@@
  // 아이콘 있는 창 크기 조절 반응형 줘도 효과 없음 신경 쓰지 말자
  .ck-toolbar {
    width: 1141px;
    border-radius: 20px 20px 0 0;
    @media (max-width: 1336px) {
      margin-top: 4%;

      // 앨 하면 이것만 하면 된다
    }
  }

  //아이콘들 설정 건들이지 말것@@@@@@@@@@@@@
  //반응형 시 아이콘의 크기들이 줄어든다
  .ck.ck-icon {
    @media (max-width: 1336px) {
    }
  }

  //아이콘 창에 border-radius 건들이지 말것@@@@@@@
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
    border-radius: 10px 10px 0 0;
  }
  //아이콘 Paragraph의 설정 와 2개더 아이콘
  /* .ck.ck-dropdown .ck-button.ck-dropdown__button {
    border-radius: 8px;

    @media (max-width: 1336px) {
      width: 100%;
    }
  } */
  .ck.ck-button.ck-dropdown__button {
    svg {
      @media (max-width: 470px) {
        display: none;
      }
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

  @media (max-width: 1336px) {
    width: 100%;
    height: 100%;
  }
`;
// ${(props) => props.editMode ? '':'filter: blur(1rem);'}
export default function EditWriting() {
  const cookie = new Cookies();
  const token = cookie.get("token");
  return (
    <>
      {token ? (
        <TotalContainer>
          <ContainerView>
            {/* <EditWritingMui /> */}
            <EditWritingEditor></EditWritingEditor>
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
