import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getCookie } from "../../Cookies";

const BottomDiv = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  margin-top: 40px;

  @media (max-width: 1336px) {
    width: 100%;

    margin-bottom: 5%;
  }
`;
// button or a 태그
// button 이면 align,justify,display 삭제하기
const ViewButton = styled.button`
  width: 120px;
  height: 50px;
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
`;
export default function CkEditor({ setImage, title, category }) {
  const [answer, setAnswer] = useState(""); //editor
  // const API_URL = "https://noteyard-backend.herokuapp.com";
  // const UPLOAD_ENDPOINT = "api/blogs/uploadImg";

  // const uploadAdapter = (loader) => {
  //   // (2)
  //   return {
  //     upload: () => {
  //       return new Promise((resolve, reject) => {
  //         const body = new FormData();
  //         loader.file.then((file) => {
  //           body.append("uploadImg", file);
  //           fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
  //             method: "post",
  //             body: body,
  //           })
  //             .then((res) => res.json())
  //             .then((res) => {
  //               resolve({ default: `https://ibb.co/TWfQMJN` });
  //             })
  //             .catch((err) => {
  //               reject(err);
  //             });
  //         });
  //       });
  //     },
  //   };
  // };

  // function uploadPlugin(editor) {
  //   // (3)
  //   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
  //     return uploadAdapter(loader);
  //   };
  // }

  //데이터
  // const data = {
  //   // WritingEditor > detail
  //   title: detail,
  //   content: answer,
  //   category: category,
  // };
  console.log("제목", title);
  console.log("글내용", answer);
  console.log("카테코리", category);

  const onClicks = async (Token) => {
    await axios
      .post(
        "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/articles",
        {
          title: title,
          content: answer,
          category: category,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onChange={(event, editor) => {
          setAnswer(editor.getData());
          console.log(answer);
          // const data = editor.getData();
          // setAnswer({
          //   ...answer,
          //   content: data,
          // });
          console.log(answer);
        }}
        config={{
          // extraPlugins: [uploadPlugin],
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
              "insertTable",
              "mediaEmbed",
              "undo",
              "redo",
              "alignment",
              "fontSize",
              "highlight",
              "imageUpload",
            ],
          },
        }}
      />

      <BottomDiv>
        <ViewButton bgColor="#CCCCCC" ckColor="#BBBBBB">
          취소
        </ViewButton>
        <ViewButton onClick={onClicks} bgColor="#62B6B7" ckColor="#439A97">
          등록
        </ViewButton>
      </BottomDiv>
    </>
  );
}
