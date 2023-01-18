import styled from "styled-components";
import theme from "../../Theme";
import axios from "axios";
import * as React from "react";
import WritingEditor from "./WritingEditor";

const TotalContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  margin-top: 80px;

  /* !importantf를 하면 css 안먹는걸 우선적으로 적용하게 해준다  */
  /* .ck ck-sticky-panel__content {
  } */
  .ck-reset_all :not(.ck-reset_all-excluded *),
  .ck.ck-reset_all {
    @media (max-width: 700px) {
      width: 100%;
    }
  }

  // 글 쓰는 창 중앙으로 정렬
  .ck-editor__main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // 글 쓰는 창 크기 조절
  .ck-editor__editable {
    min-height: 400px;
    margin-bottom: 20px;
    width: 1120px;

    @media (max-width: 1336px) {
      width: 90%;
    }
  }
  // 글 쓰는 창 border-radius
  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
    border-radius: 0 0 10px 10px;

    /* @media (max-width: 1336px) {
      width: 80%;
    } */
  }

  // 아이콘 있는 창 중앙으로 정렬
  .ck-reset_all {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // 아이콘 있는 창 크기 조절
  .ck-toolbar {
    width: 1141px;
    border-radius: 20px 20px 0 0;
    @media (max-width: 1336px) {
      width: 100%;
    }
  }

  //아이콘들 설정
  .ck.ck-icon {
  }

  //아이콘 창에 border-radius
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
    border-radius: 10px 10px 0 0;
  }
  //아이콘 Paragraph의 설정
  .ck.ck-dropdown .ck-button.ck-dropdown__button {
    border-radius: 8px;
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
  }
`;
// ${(props) => props.editMode ? '':'filter: blur(1rem);'}
export default function Writing() {
  return (
    <TotalContainer>
      <ContainerView>
        <WritingEditor />
      </ContainerView>
    </TotalContainer>
  );
}
