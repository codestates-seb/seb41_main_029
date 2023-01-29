import { useState } from "react";
import styled from "styled-components";
import theme from "../../Theme";
import * as React from "react";
import CkEditor from "./CkEditor";
import Box from "@mui/material/Box";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SpanContainer = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  .SpanTitle {
    font-size: ${({ theme }) => theme.fontSizes.fs24};
    /* margin-left: -24px; */
    width: 45px;
    display: flex;
    //패딩으로 제목 왼쪽에 공간을 만들어서 밀리자 않ㅡ다 좋ㅏ
    @media (max-width: 1336px) {
      /* width: 70px; */
      /* width: 100%; */
      padding-left: 5%;
      white-space: nowrap;
      /* display: none; */
    }
    @media (max-width: 500px) {
      font-size: ${theme.fontSizes.fs18};
      display: none;
    }
  }
  input {
    width: 860px;
    /* min-width: 150px; */
    height: 40px;
    border-radius: 8px;
    outline: none;
    border: none;

    ::placeholder {
      font-size: ${theme.fontSizes.fs18};
    }
    @media (max-width: 1336px) {
      width: 71.5%;
      /* width: 920px; */
    }
    @media (max-width: 500px) {
      width: 50%;
    }
  }
`;

const SpanContent = styled.div`
  /* width: 1070px; */
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;

  @media (max-width: 1336px) {
    display: flex;
    /* flex-direction: column-reverse; // 세로 */
    align-items: center;
  }
  @media (max-width: 355px) {
    display: flex;
    justify-content: space-between;
  }
`;
const MuiContainer = styled.div`
  @media (max-width: 500px) {
    /* width: 100%; */
    /* border: 2px solid red; */
    /* width: 30%; */
    /* margin-top: 8%; // 세로 */
  }
  button {
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }
`;
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// 전체 사이즈 테스트
const CategoryBox = styled(Box)`
  width: 180px;
  display: flex;
  /* justify-content: right; */
  /* padding-left: 20px; */
  @media (max-width: 1336px) {
    /* margin-top: 8%; // 세로 */
    /* width: 100%; // 남은 공간의 퍼센트 */
    width: 150px;
  }

  @media (max-width: 500px) {
    display: flex;
    /* border: 2px solid blue; */
    float: right;

    /* margin-top: 27%; // 세로 */
    width: 115px;
  }

  // 딱 박스 사이즈 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  .css-1nrlq1o-MuiFormControl-root {
    @media (max-width: 1336px) {
      width: 80%;
      /* border: 2px solid red; */
    }
    @media (max-width: 500px) {
      width: 90%;
      margin-left: 12px;
      /* border: 2px solid red; */
    }
  }
`;
// 카테고리 글씨 움직이는 틀
const CategoryInputLabel = styled(InputLabel)`
  width: 100%;
  margin: -8px 0 0px 12px;
  .CategorySpan {
    display: none;
    @media (max-width: 1336px) {
      font-size: 12px;
    }
  }
  .CategorySpan {
    @media (max-width: 360px) {
      display: none;
    }
  }
`;
//.
const CategorySelect = styled(Select)`
  height: 40px;

  // icon
  // 반응형을 줬을 때 아이콘이 변함
  .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon {
    color: ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fontSizes.fs64};
    margin-right: 8px;

    @media (max-width: 1336px) {
      width: 30%;
      /* margin-left: 32px; */
    }
  }
`;

// 전체 크기
const CategoryFormControl = styled(FormControl)`
  width: 100%;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  label {
    font-weight: 800;
    font-family: "Noto Sans CJK KR";
  }
  // X 이건 전체 박스 사이즈에서 위로 더 높음 그러니 딱히 필요없는 듯 한데 밑에 전체 크기가 신경쓰인다
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select {
    /* margin: 8px 0 0 12px; */
    font-size: ${({ theme }) => theme.fontSizes.fs18};
    /* border: 2px solid red; */
  }
  //전체 크기
  @media (max-width: 1336px) {
    /* border: 2px solid blue; */
    width: 70%;
    /* width: 600px; */
  }
  @media (max-width: 360px) {
    width: 45%;
  }
`;
const CategoryMenuItem = styled(MenuItem)``;

const WritingMui = ({ setImage }) => {
  const [category, setCategory] = useState(""); // M ui

  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(category);
  };
  const titleChange = (event) => {
    setTitle(event.target.value);
    console.log(title);
  };

  return (
    <div>
      <SpanContainer>
        <SpanContent>
          <span className="SpanTitle">제목</span>
          <input
            type="text"
            value={title.title}
            // placeholder="제목"
            onChange={titleChange}
          />

          {/* <Mui /> */}
          <MuiContainer>
            <CategoryBox>
              <CategoryFormControl>
                <CategoryInputLabel id="demo-simple-select-label">
                  <span className="CategorySpan">카테고리</span>
                  {/* 카테고리 */}
                </CategoryInputLabel>
                <CategorySelect
                  sx={{
                    // 카테고리 테두리 지우는 부분
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="category"
                  onChange={handleChange}
                >
                  <CategoryMenuItem value={"GENERAL"}>일 반</CategoryMenuItem>
                  <CategoryMenuItem value={"INFORMATION"}>
                    정 보
                  </CategoryMenuItem>
                  <CategoryMenuItem value={"QUESTION"}>질 문</CategoryMenuItem>
                </CategorySelect>
              </CategoryFormControl>
            </CategoryBox>
          </MuiContainer>
        </SpanContent>
      </SpanContainer>
      <CkEditor title={title} category={category} />
    </div>
  );
};

export default WritingMui;
