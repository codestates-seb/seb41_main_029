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
import { useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { getCookie } from "../../Cookies";
import { editWriting, getWriting } from "../../api/writingAPI";

const SpanTitle = styled.div`
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
  /* width: 1070px; */
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
const BottomDiv = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  margin-top: 40px;
  margin-bottom: 24px;
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
const EditWritingEditor = ({ setImage }) => {
  // const user = useSelector((state) => state.currentUser);
  // const { state } = useLocation();
  const { boardSeq } = useParams();
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const [viewInfo, setViewInfo] = useState();
  const navigate = useNavigate();

  async function getInfo() {
    const res = await getWriting(Token, boardSeq);
    // const res = await getWriting(id);
    setViewInfo(res);
    // console.log(res);
    // if (res?.status !== 200) {
    //   setLoading(true);
    // }
    // console.log(isBM);
  }
  useEffect(() => {
    getInfo();
  }, []);
  useEffect(() => {
    if (viewInfo) {
      setDetail(viewInfo?.data?.title);
      setCategory(reqcategory);
      setAnswer(viewInfo?.data?.content);
    }
  }, [viewInfo]);
  // console.log(viewInfo);

  const editwriting = async () => {
    await axios
      .patch(
        `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/${boardSeq}`,
        {
          title: detail,
          content: answer,
          category: category,
        },
        {
          headers: {
            // "Content-Type": "application/json",
            // Authorization: `Bearer ${Token}`,
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        navigate(`/boards/${boardSeq}`);
      })
      .catch((err) => {
        // navigate(`/boards/${boardSeq}`);
        // console.log(err);
      });
  };

  const [answer, setAnswer] = useState(""); //editor
  const [category, setCategory] = useState("");
  const title1 = viewInfo?.data?.title;
  const [detail, setDetail] = useState("");
  const onClick = (e) => {
    // answer와 detail을 값을 넘겨줘서 클릭시 콘솔에 찍히게 해줘야 한다
    // setDetail(e.target.value),
    // setAnswer(e.target.value)
  };
  /** */
  const handleChange = (event) => {
    setCategory(event.target.value);
    // console.log(category);
  };
  const editorChange = (event) => {
    setAnswer({
      ...answer,
      content: event.target.value,
    });
    // console.log(answer);
  };
  const titleChange = (event) => {
    setDetail(event.target.value);
    // console.log(detail);
  };
  // console.log(answer?.content);
  const API_URL =
    "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";
  const UPLOAD_ENDPOINT = "uploadFiles";
  // console.log(detail);
  const uploadAdapter = (loader) => {
    // (2)
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((files) => {
            body.append("files", files);
            //  res.url로 작성 할거 같다
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
              files: files,
            })
              .then((res) => res.json())
              .then((res) => {
                // resolve({ default: `https://ifh.cc/g/HkGCpv.png` }); // 구글 이미지 호스팅 한것
                resolve({ default: res[0] }); // 사진은 나오지만 콘솔에 img 주소가 안찍힌다
                // setImgUrl(res.imgUrl);
                // resolve({ default: res[0] });
                // console.log(files);
                // console.log(res.body);
                // console.log(res);
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  };
  // console.log(viewInfo?.data?.category);
  let reqcategory = "";
  if (viewInfo?.data?.category === "# 일반") {
    reqcategory = "GENERAL";
  } else if (viewInfo?.data?.category === "# 정보") {
    reqcategory = "INFORMATION";
  } else if (viewInfo?.data?.category === "# 질문") {
    reqcategory = "QUESTION";
  }
  // console.log(reqcategory);
  function uploadPlugin(editor) {
    // (3)
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  const userId1 = JSON.parse(localStorage.getItem("userId"));
  const userId2 = viewInfo?.data?.userId;
  const goCommunity = () => {
    navigate(`/boards/${boardSeq}`);
  };
  return (
    <>
      {userId1 === userId2 ? (
        <div>
          <SpanTitle>
            <SpanContent>
              <span className="SpanTitle">제목</span>
              <input
                type="text"
                defaultValue={viewInfo?.data?.title}
                // value={detail}
                onChange={titleChange}
              />
              <MuiContainer>
                {/* mui 사용 */}
                <CategoryBox>
                  <CategoryFormControl>
                    <CategoryInputLabel id="demo-simple-select-label">
                      <span className="CategorySpan">{category}</span>
                      {/* 카테고리 */}
                    </CategoryInputLabel>
                    <CategorySelect
                      sx={{
                        boxShadow: "none",
                        ".MuiOutlinedInput-notchedOutline": { border: "none" },
                      }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="category"
                      onChange={handleChange}
                    >
                      <CategoryMenuItem value={"GENERAL"}>
                        일 반
                      </CategoryMenuItem>
                      <CategoryMenuItem value={"INFORMATION"}>
                        정 보
                      </CategoryMenuItem>
                      <CategoryMenuItem value={"QUESTION"}>
                        질 문
                      </CategoryMenuItem>
                    </CategorySelect>
                  </CategoryFormControl>
                </CategoryBox>
              </MuiContainer>
            </SpanContent>
          </SpanTitle>
          <CKEditor
            editor={ClassicEditor}
            data={viewInfo?.data?.content}
            onChange={(event, editor) => {
              // const data = editor.getData();
              // setAnswer({
              //   ...answer,
              //   content: data,
              // });
              // console.log(answer);
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
            <ViewButton
              bgColor="#CCCCCC"
              ckColor="#BBBBBB"
              onClick={goCommunity}
            >
              취소
            </ViewButton>
            <ViewButton
              bgColor="#62B6B7"
              ckColor="#439A97"
              onClick={editwriting}
            >
              수정
            </ViewButton>
          </BottomDiv>
        </div>
      ) : (
        <>권한이 없습니다.</>
      )}
    </>
  );
};

export default EditWritingEditor;
