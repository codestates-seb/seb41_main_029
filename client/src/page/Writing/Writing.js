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
  /* !importantf를 하면 css 안먹는걸 우선적으로 적용하게 해준다  */
  /* css 커스텀  바디로 작업 헤드가 오면 다시 헤더로 작업 */

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

export const ContainerView = styled.div`
  width: ${({ theme }) => theme.deviceSizes.tablet};
  background-color: ${({ theme }) => theme.colors.container};
  height: ${(props) => (props.height ? props.height : "704px")};
  border-radius: ${(props) => (props.radius ? props.radius : "20px")};
  justify-content: center;
  align-items: center;
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
