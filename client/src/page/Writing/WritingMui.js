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
    width: 45px;

    @media (max-width: 1336px) {
      padding-left: 5%;
      white-space: nowrap;
    }
    @media (max-width: 500px) {
      font-size: ${theme.fontSizes.fs18};
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

const SpanContent = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;

  @media (max-width: 1336px) {
    display: flex;

    align-items: center;
  }
`;
const MuiContainer = styled.div`
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
const CategoryBox = styled(Box)`
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
const CategoryInputLabel = styled(InputLabel)`
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
//.
const CategorySelect = styled(Select)`
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
const CategoryFormControl = styled(FormControl)`
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
const CategoryMenuItem = styled(MenuItem)``;

const WritingMui = ({ setImage }) => {
  const [category, setCategory] = useState(""); // M ui

  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <SpanContainer>
        <SpanContent>
          <span className="SpanTitle">제목</span>
          <input type="text" value={title.title} onChange={titleChange} />
          {/* <Mui /> */}
          <MuiContainer>
            <CategoryBox>
              <CategoryFormControl>
                <CategoryInputLabel id="demo-simple-select-label">
                  <span className="CategorySpan">카테고리</span>
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
