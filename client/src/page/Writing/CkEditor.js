import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getCookie } from "../../Cookies";
import { useNavigate } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";
import theme from "../../Theme";
import { Cookies } from "react-cookie";

const BottomDiv = styled.div`
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
const ViewButton = styled.a`
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

export default function CkEditor({ setImage, title, category }) {
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const API_URL =
    "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";
  const UPLOAD_ENDPOINT = "uploadFiles";

  const uploadAdapter = (loader) => {
    // (2)
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((files) => {
            body.append("files", files);

            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
              files: files,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: res[0] });
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
        <ViewButton bgColor="#CCCCCC" ckColor="#BBBBBB" href="/community">
          취소
        </ViewButton>
        <ViewButton onClick={onClicks} bgColor="#62B6B7" ckColor="#439A97">
          등록
        </ViewButton>
      </BottomDiv>
    </>
  );
}
