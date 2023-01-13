import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import styled from "styled-components";
import theme from "../../Theme";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import WritingButton from "./WritingButton";

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
  .menu > {
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

const CategoryBox = styled(Box)``;
const CategoryInputLabel = styled(InputLabel)`
  margin: -8px 0 0px 12px;
`;
const CategorySelect = styled(Select)`
  height: 40px;

  // icon
  .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon {
    color: ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fontSizes.fs64};
    margin-right: 8px;
  }
`;
const CategoryFormControl = styled(FormControl)`
  width: 180px;
  background-color: black;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  label {
    font-weight: 800;
    font-family: "Noto Sans CJK KR";
  }
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select {
    margin: 8px 0 0 12px;
    font-size: ${({ theme }) => theme.fontSizes.fs18};
  }
  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root {
    display: none;
  }
`;
const CategoryMenuItem = styled(MenuItem)`
  &:hover {
    background-color: red;
  }
`;
const WritingEditor = ({ setImage }) => {
  const [answer, setAnswer] = useState(""); //editor
  // const [flag, setFlag] = useState(false);
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState({
    //input
    title: "",
  });

  const onClick = (e) => {
    // answer와 detail을 값을 넘겨줘서 클릭시 콘솔에 찍히게 해줘야 한다
    // setDetail(e.target.value),
    // setAnswer(e.target.value)
  };
  /** */
  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(category);
  };
  const editorChange = (event) => {
    setAnswer({
      ...answer,
      content: event.target.value,
    });
    console.log(answer);
  };
  const titleChange = (event) => {
    setDetail({
      ...detail,
      title: event.target.value,
    });
    console.log(detail);
  };
  const API_URL = "https://noteyard-backend.herokuapp.com";
  const UPLOAD_ENDPOINT = "api/blogs/uploadImg";

  const uploadAdapter = (loader) => {
    // (2)
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("uploadImg", file);
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: `${API_URL}/${res.url}` });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    // (3)
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <>
      <SpanTitle>
        <span>제목</span>
        <input type="text" value={detail.title} onChange={titleChange} />
        <div className="menu">
          {/* mui 사용 */}
          <CategoryBox sx={{ minWidth: 180 }}>
            <CategoryFormControl>
              <CategoryInputLabel id="demo-simple-select-label">
                카테고리
              </CategoryInputLabel>
              <CategorySelect
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="category"
                onChange={handleChange}
              >
                <CategoryMenuItem value={"일반"}>일 반</CategoryMenuItem>
                <CategoryMenuItem value={"정보"}>정 보</CategoryMenuItem>
                <CategoryMenuItem value={"질문"}>질 문</CategoryMenuItem>
              </CategorySelect>
            </CategoryFormControl>
          </CategoryBox>
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
          extraPlugins: [uploadPlugin],
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
      <WritingButton
        title={detail.title}
        setDetail={setDetail}
        handleChange={handleChange}
        titleChange={titleChange}
        answer={answer}
        onClicks={onClick}
        editorChange={editorChange}
      />
    </>
  );
};

export default WritingEditor;
