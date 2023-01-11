import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import theme from "../../Theme";
import Category from "./WritingCategory";

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
const SpanTitle = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  margin-left: 92px;
  margin-bottom: 24px;
  span {
    font-size: ${({ theme }) => theme.fontSizes.fs24};
    margin-right: 28px;
  }
  input {
    width: 850px;
    height: 42px;
    border-radius: 8px;
    border: none;
    margin-right: 32px;
  }
  .menu {
    width: 180px;
    height: 42px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.white};
    align-items: center;
    justify-content: center;
    display: flex;
    border: none;

    span {
      margin-right: 4px;
      font-size: 16px;
    }

    button {
      border: none;
      background-color: ${({ theme }) => theme.colors.white};
      cursor: pointer;
    }
  }
`;
const TitleBottom = styled.div`
  width: 0;
  height: 0;
  margin-left: 12px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid ${({ theme }) => theme.colors.main};
`;
const BottomDiv = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 40px;
`;
const ViewButton = styled.button`
  width: 120px;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.bgColor};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.fs24};
  margin: 0 60px 0 60px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.ckColor};
  }
`;
const CategoryMenu = styled.div`
  background-color: gray;
  position: absolute;
  top: 52px;
  left: 50%;
  width: 100px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;
const CategoryUl = styled.ul`
  & > li {
    margin-bottom: 10px;
  }
  & > li:first-of-type {
    margin-top: 10px;
  }
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default function Writing() {
  const [answer, setAnswer] = useState("");
  const [categoryIsopen, categoryRef, categoryHandler] = Category(false);

  return (
    <TotalContainer>
      <ContainerView>
        <SpanTitle>
          <span>제목</span>
          <input type="text" />
          <div className="menu">
            <span>
              카테고리
              <button onClick={categoryHandler} ref={categoryRef}>
                <TitleBottom />
              </button>
              <CategoryMenu isDropped={categoryIsopen}>
                <CategoryUl>
                  <li>일반</li>
                </CategoryUl>
                <CategoryUl>
                  <li>정보</li>
                </CategoryUl>
                <CategoryUl>
                  <li>질문</li>
                </CategoryUl>
              </CategoryMenu>
            </span>
          </div>
        </SpanTitle>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onChange={(event, editor) => {
            const data = editor.getData();
            setAnswer({
              ...answer,
              content: data,
            });
            console.log(answer);
          }}
          config={{
            toolbar: {
              items: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "imageUpload",
                "insertTable",
                "mediaEmbed",
                "undo",
                "redo",
                "alignment",
                "fontSize",
                "highlight",
              ],
            },
          }}
        />
        <BottomDiv>
          <ViewButton bgColor="#CCCCCC" ckColor="#BBBBBB">
            취소
          </ViewButton>
          <ViewButton bgColor="#62B6B7" ckColor="#439A97">
            등록
          </ViewButton>
        </BottomDiv>
      </ContainerView>
    </TotalContainer>
  );
}
