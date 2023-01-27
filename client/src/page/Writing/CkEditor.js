import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getCookie } from "../../Cookies";
import { useNavigate } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
const ViewButton = styled.a`
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
  const [answer, setAnswer] = useState(""); //editor이 부분에 html을 막는 기능으 넣으면 될까?
  const navigate = useNavigate();

  // const API_URL = "https://noteyard-backend.herokuapp.com";
  // const UPLOAD_ENDPOINT = "api/blogs/uploadImg";
  const API_URL =
    "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";
  const UPLOAD_ENDPOINT = "boards/articles";

  const uploadAdapter = (loader) => {
    // (2)
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("uploadImg", file);
            //  res.url로 작성 할거 같다
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
            })
              .then((res) => {
                // resolve({ default: `https://ibb.co/TWfQMJN` });
                resolve({ default: `https://ifh.cc/g/HkGCpv.png` }); // 구글 이미지 호스팅 한것
                // resolve({ default: res.profileImageUrl }); // 사진은 나오지만 콘솔에 img 주소가 안찍힌다
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

  const onClicks = async () => {
    const formdata = {
      title: title,
      content: answer,
      category: category,
      files: "",
    };
    await axios
      .post(
        "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/articles",
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${Token}`,
            Authorization: `Bearer ${getCookie("token")}`,
          },
        },
        {
          data: formdata,
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/community");
      })
      .catch((err) => {
        console.log(err);
      });
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
