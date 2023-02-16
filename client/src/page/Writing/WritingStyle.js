import Box from "@mui/material/Box";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import theme from "../../Theme";

// mui
export const SpanContainer = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  .SpanTitle {
    font-size: ${({ theme }) => theme.fontSizes.fs24};
    width: 45px;

    @media (max-width: 1336px) {
      margin-left: 5%;
      white-space: nowrap;
    }
    @media (max-width: 500px) {
      display: none;
    }
  }

  input {
    width: 860px;
    height: 40px;
    border-radius: 8px;
    outline: none;
    border: none;
    @media (max-width: 500px) {
      width: 100%;
      margin-left: 20px;
    }
  }
`;

export const SpanContent = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;

  @media (max-width: 1336px) {
    display: flex;
    align-items: center;
  }
`;

export const MuiContainer = styled.div`
  @media (max-width: 1336px) {
    margin-right: 18px;
  }
  button {
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }
`;

// 전체 사이즈
export const CategoryBox = styled(Box)`
  width: 180px;
  display: flex;

  @media (max-width: 1336px) {
    width: 150px;
  }
  @media (max-width: 1250px) {
    width: 120px;
  }

  @media (max-width: 500px) {
    display: flex;
    float: right;
    width: 115px;
  }

  // 맞춤 사이즈
  .css-1nrlq1o-MuiFormControl-root {
    @media (max-width: 1336px) {
      width: 80%;
    }
    @media (max-width: 500px) {
      width: 90%;
      margin-left: 12px;
    }
  }
`;
// 카테고리 글씨 움직이는 틀
export const CategoryInputLabel = styled(InputLabel)`
  width: 100%;
  margin: -8px 0 0px 12px;
  display: none;

  @media (max-width: 1336px) {
    margin: -10px 0 0 0;
  }
  .CategorySpan {
    @media (max-width: 1336px) {
      font-size: ${theme.fontSizes.fs12};
    }
  }
`;
//
export const CategorySelect = styled(Select)`
  height: 40px;

  // icon(삼각형)
  .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon {
    color: ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fontSizes.fs64};
    width: 60px;

    @media (max-width: 1336px) {
      width: 35%;
    }
  }
`;

// 전체 크기
export const CategoryFormControl = styled(FormControl)`
  width: 100%;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  label {
    font-weight: 800;
    font-family: "Noto Sans CJK KR";
  }
  // 카테고리 위에 뜨는 텍스트 지워주는 classname
  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root {
    display: none;
  }

  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select {
    font-size: 14px;
  }
  //전체 크기
  @media (max-width: 1336px) {
    width: 70%;
  }
  @media (max-width: 360px) {
    width: 45%;
  }
`;
export const CategoryMenuItem = styled(MenuItem)``;
//

// CkEditor
export const TotalContainer = styled.div`
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
    width: 1130px;
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
  .ck.ck-button.ck-disabled.ck-button__icon,
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
    width: 1130px;
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
  height: ${(props) => (props.height ? props.height : "")};
  border-radius: ${(props) => (props.radius ? props.radius : "20px")};
  justify-content: center;
  align-items: center;
  /* overflow-y: auto; */
  /* overflow-x: hidden; */
  @media (max-width: 1336px) {
    width: 95%;
    height: 100%;
  }
`;

// 버튼
export const BottomDiv = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  margin-top: 40px;
  margin-bottom: 24px;
  @media (max-width: 1336px) {
    width: 100%;

    margin-bottom: 10%;
  }
`;
// button or a 태그
export const ViewButton = styled.a`
  width: 100px;
  height: 45px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.bgColor};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.fs24};
  margin: 0 36px 0px 36px;
  align-items: center;
  justify-content: center;
  display: flex;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.ckColor};
  }
  @media (max-width: 400px) {
    font-size: ${theme.fontSizes.fs18};
  }
`;
