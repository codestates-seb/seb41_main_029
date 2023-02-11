import { useState } from "react";
import * as React from "react";
import * as s from "./WritingStyle";
import WritingCkEditor from "./WritingCkEditor";
import { Navigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const WritingMui = ({ setImage }) => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const cookie = new Cookies();
  const Token = cookie.get("token");
  return (
    <>
      {Token !== undefined ? (
        <s.TotalContainer>
          <s.ContainerView>
            <s.SpanContainer>
              <s.SpanContent>
                <span className="SpanTitle">제목</span>
                <input type="text" value={title.title} onChange={titleChange} />
                {/* <Mui /> */}
                <s.MuiContainer>
                  <s.CategoryBox>
                    <s.CategoryFormControl>
                      <s.CategoryInputLabel id="demo-simple-select-label">
                        <span className="CategorySpan">카테고리</span>
                      </s.CategoryInputLabel>
                      <s.CategorySelect
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
                        <s.CategoryMenuItem value={"GENERAL"}>
                          일 반
                        </s.CategoryMenuItem>
                        <s.CategoryMenuItem value={"INFORMATION"}>
                          정 보
                        </s.CategoryMenuItem>
                        <s.CategoryMenuItem value={"QUESTION"}>
                          질 문
                        </s.CategoryMenuItem>
                      </s.CategorySelect>
                    </s.CategoryFormControl>
                  </s.CategoryBox>
                </s.MuiContainer>
              </s.SpanContent>
            </s.SpanContainer>
            <WritingCkEditor title={title} category={category} />
          </s.ContainerView>
        </s.TotalContainer>
      ) : (
        <>
          {alert("로그인이 되어 있지 않습니다!")}
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default WritingMui;
