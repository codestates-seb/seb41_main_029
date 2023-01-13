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

  // 아이콘 창 밑에 틀
  .ck-editor__editable {
    min-height: 400px;
    margin-bottom: 20px;
    margin-left: 92px;
    width: 1120px;
  }
  //아이콘들 설정
  .ck.ck-icon {
  }
  //아이콘 라인 틀
  .ck-toolbar {
    width: 1141px;
    margin-left: 92px;
    border-radius: 20px 20px 0 0;
  }
  //아이콘 창 밑에 border-radius
  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
    border-radius: 0 0 10px 10px;
  }
  //아이콘 창에 border-radius
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
    border-radius: 10px 10px 0 0;
  }
  //Paragraph의 설정
  .ck.ck-dropdown .ck-button.ck-dropdown__button {
    border-radius: 8px;
  }
`;

const ContainerView = styled.div`
  width: ${({ theme }) => theme.deviceSizes.tablet};
  background-color: ${({ theme }) => theme.colors.container};
  height: 704px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export default function Writing() {
  return (
    <TotalContainer>
      <ContainerView>
        <WritingEditor />
      </ContainerView>
    </TotalContainer>
  );
}
