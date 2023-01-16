import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import styled from "styled-components";
import theme from "../../Theme";
import WritingEditor from "./WritingEditor";

const BottomDiv = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 40px;
`;
// button or a 태그
// button 이면 align,justify,display 삭제하기
const ViewButton = styled.a`
  width: 120px;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.bgColor};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.fs24};
  margin: 0 60px 0px 60px;
  align-items: center;
  justify-content: center;
  display: flex;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.ckColor};
  }
`;
// title > detail.title
// content> 에디터

const WritingButton = ({
  title,
  setDetail,
  handleChange,
  titleChange,
  answer,
  onClicks,
  editorChange,
}) => {
  const [register, setRegister] = useState("");
  const onClick = (e) => {
    setRegister({
      ...register,
      title: e.target.value,
      answer: e.target.value,
    });
    console.log(register);
  };
  return (
    <BottomDiv>
      <ViewButton bgColor="#CCCCCC" ckColor="#BBBBBB" href="community">
        취소
      </ViewButton>
      <ViewButton
        bgColor="#62B6B7"
        ckColor="#439A97"
        href="community"
        // onClick={() => {
        //   editorChange();
        // }}
      >
        등록
      </ViewButton>
    </BottomDiv>
  );
};

export default WritingButton;
