import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import styled from "styled-components";
import theme from "../../Theme";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import WritingButton from "./WritingButton";

const SpanTitle = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  span {
    font-size: ${({ theme }) => theme.fontSizes.fs24};
    width: 100px;
    /* margin-left: -24px; */
    display: flex;

    @media (max-width: 1336px) {
      width: 10%;
      display: flex;
      margin-left: 4%;
    }
  }
  input {
    width: 800px;
    height: 40px;
    border-radius: 8px;
    border: none;
    /* margin-right: 28px; */

    @media (max-width: 1336px) {
      width: 90%;
    }
  }
  .menu > {
    button {
      border: none;
      background-color: ${({ theme }) => theme.colors.white};
      cursor: pointer;
    }
  }
`;
const SpanContent = styled.div`
  /* width: 1070px; */
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
`;
const CategoryBox = styled(Box)`
  width: 100%;
`;
// 카테고리 글씨 움직이는 틀
const CategoryInputLabel = styled(InputLabel)`
  width: 100%;
  margin: -8px 0 0px 12px;

  /* @media (max-width: 1336px) {
    width: 50%;
  } */
`;
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
    }
  }
`;
// 전체 크기
const CategoryFormControl = styled(FormControl)`
  width: 100%;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  /* @media (max-width: 1336px) {
    width: 100%;
  } */

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
  //전체 크기 확인 해보기
  @media (max-width: 1336px) {
    width: 75%;
  }
`;

// 아무 변화도 없음
const CategoryMenuItem = styled(MenuItem)``;
const WritingEditor = ({ setImage }) => {
  const [answer, setAnswer] = useState(""); //editor
  // const [flag, setFlag] = useState(false);
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState({
    //input
    title: "",
  });
  // 온클릭 3개 합치기
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
                resolve({ default: `https://ibb.co/TWfQMJN` });
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
    <div>
      <SpanTitle>
        <SpanContent>
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
        </SpanContent>
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
    </div>
  );
};

export default WritingEditor;
