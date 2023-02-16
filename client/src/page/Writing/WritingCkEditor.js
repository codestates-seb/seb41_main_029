import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "../../Cookies";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import * as s from "./WritingStyle";
import { uploadAdapter } from "../../api/writingAPI";

export default function WritingCkEditor({ setImage, title, category }) {
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // const API_URL =
  //   "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";
  // const UPLOAD_ENDPOINT = "uploadFiles";

  // const uploadAdapter = (loader) => {
  //   // (2)
  //   return {
  //     upload: () => {
  //       return new Promise((resolve, reject) => {
  //         const body = new FormData();
  //         loader.file.then((files) => {
  //           body.append("files", files);

  //           fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
  //             method: "post",
  //             body: body,
  //             files: files,
  //           })
  //             .then((res) => res.json())
  //             .then((res) => {
  //               resolve({ default: res[0] });
  //             })
  //             .catch((err) => {
  //               reject(err);
  //             });
  //         });
  //       });
  //     },
  //   };
  // };

  function uploadPlugin(editor) {
    // (3)
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  const files1 = new FormData();
  files1.append("image", null);

  const cookie = new Cookies();
  const token = cookie.get("token");

  const onClicks = async () => {
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
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      )
      .then((res) => {
        navigate("/community");
      })
      .catch((err) => {});
    if (category === "") {
      return alert("카테고리를 입력하세요");
    } else if (title === "") {
      return alert("제목을 입력하세요");
    } else if (answer === "") {
      return alert("내용을 입력하세요");
    }
  };

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onChange={(event, editor) => {
          setAnswer(editor.getData());
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
              "insertTable",
              "mediaEmbed",
              // "undo",
              // "redo",
              "alignment",
              "fontSize",
              "highlight",
              "imageUpload",
            ],
          },
        }}
      />

      <s.BottomDiv>
        <s.ViewButton bgColor="#CCCCCC" ckColor="#BBBBBB" href="/community">
          취소
        </s.ViewButton>
        <s.ViewButton onClick={onClicks} bgColor="#62B6B7" ckColor="#439A97">
          등록
        </s.ViewButton>
      </s.BottomDiv>
    </>
  );
}
