import { useCallback } from "react";
import { fontWeight } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import { Cookies } from "react-cookie";
import styled from "styled-components";

import { newGallery, postGallery, likedGallery } from "../../api/galleryAPI";
import { postImage } from "../../api/userAPI";
import { MainBtn } from "../../component/Button";
import SwiperComponent from "../../component/Swiper/Swiper";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 80px auto 0 auto;
  max-width: 1336px;
  width: 100%;
  .floor {
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 0 0 10px 10px;
    height: 40px;
  }
  .roof {
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 10px 10px 0 0;
    height: 40px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .w95p {
    width: 95%;
  }
`;

// 모달창
const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: "dialog",
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: ${(props) => props.width};
  /* height: ${(props) => props.height}; */
  > span.close-btn {
    margin-top: 5px;
    cursor: pointer;
  }
  > div.desc {
    margin-top: 25px;
    color: gray;
    text-align: center;
    font-size: 20px;
  }
`;

const PostContainer = styled.div`
  .hidden {
    display: none;
  }
`;
const ImgContainer = styled.div`
  width: 270px;
  height: 390px;
  border: 3px solid #62b6b7;
  border-radius: 10px;
  margin-top: 16px;
  color: gray;
  font-size: 13px;
  > div {
    height: 390px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    object-fit: cover;
    width: 270px;
    height: 390px;
    border-radius: 8px;
  }
`;

const ImgBtn = styled.button`
  margin-top: 10px;
  width: 275px;
  background-color: #62b6b7;
  border: none;
  color: #fff;
  border-radius: 8px;
  padding: 8px 0;
  cursor: pointer;
  margin-bottom: 10px;
`;

// 태그
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin: 10px 0;
`;
const TagContainer2 = styled.div`
  width: 260px;
  /* min-width: 60%; */
  /* max-width: 75%; */
  display: flex;
  flex-wrap: wrap;
  min-height: 30px;
  border: 3px solid #62b6b7;
  border-radius: 10px;
  padding: 5.5px 8px;
  > input {
    border: none;
    /* flex: 0.3; */
    outline: none;
    padding: 5px;
    background: #fff;
    color: #000;
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 8px;
  /* border: 1px solid gray; */
  border-radius: 8px;
  height: 25px;
  margin: 2px 5px 2px 0px;
  color: #fff;
  background-color: #62b6b7;
  font-size: 14px;
  > span {
    margin-left: 5px;
    font-size: 12px;
    cursor: pointer;
  }
`;

// 한줄글
const ContentContainer = styled.div`
  > input {
    margin-top: 10px;
    width: 255px;
    height: 30px;
    border: 3px solid #62b6b7;
    outline: none;
    padding: 5px 10px;
    border-radius: 10px;
  }
`;

const FliterLaout = styled.div`
  display: flex;
  float: right;
  color: black;
  /* margin-top: 8px; */
  align-items: center;
  margin-right: 12px;
`;
const Newest = styled.div`
  margin-right: 12px;
`;
const Liked = styled.div``;
const Source = styled.div`
  display: flex;
  margin-top: -121px;
  justify-content: right;
  margin-right: 20px;
`;
const PostLayout = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* width: 320px;
  height: 200px;
  border: 3px solid #a0c3d2;
  border-radius: 10px;
  margin-bottom: 16px; */
`;
const SubmitBtn = styled.button`
  margin: 25px 10px;
  width: 60px;
  height: 35px;
  border: 0px;
  border-radius: 10px;
  background-color: ${(props) => (props.disabled ? "#ccc;" : "#62b6b7;")};
  color: white;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;
const CancelBtn = styled.button`
  margin: 25px 10px;
  width: 60px;
  height: 35px;
  border: 0px;
  border-radius: 10px;
  background-color: #ccc;
  color: white;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;
const SubmitLayout = styled.div`
  display: flex;
  /* margin-top: 115px; */
  margin-right: 20px;
  justify-content: right;
`;

export default function Gallery() {
  const [sortby, setSortby] = useState("최신순");
  const [fileImage, setFileImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");

  let req = {
    imageUrl: "",
    tag: "",
    content: "",
  };

  const [request, setRequest] = useState({
    imageUrl: "",
    tag: "태그",
    content: "",
  });
  const [validityCheck, setValidityCheck] = useState({
    isProfileImageUrlPass: false,
  });
  const [inform, newInform] = useState();

  const navigate = useNavigate();

  const cookie = new Cookies();
  const token = cookie.get("token");

  const [isOpen, setIsOpen] = useState(false);

  const [tags, setTags] = useState([]);
  let tagAdd = "";
  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0 && e.target.value.length <= 5) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
      }
      //   if (e.target.value.length >= 6) {
      //     alert("5자 이하로 작성해주세요.");
      //   }
    }
    // if (tags.length > 1) {
    //   alert("태그는 2개까지 등록할 수 있습니다.");
    // }
  };
  const removeTag = (removedTag, removedIndex) => {
    const newTags = tags.filter((tag, index) => index !== removedIndex);
    setTags(newTags);
  };

  const tag1 = () => {
    for (let tag of tags) {
      tagAdd += tag + ",";
    }
  };

  const onChangeTag = (e) => {
    setTag("");
  };

  const onChangeContent = (e) => {
    // if (e.target.value.length >= 16) {
    //   alert("15자 이하로 작성해주세요.");
    // }
    setRequest({
      ...request,
      [e.target.id]: e.target.value,
    });
    setContent(e.target.value);
  };

  const numberMaxLength = (e) => {
    if (e.value.length > e.maxLength) {
      e.value = e.value.slice(0, e.maxLength);
    }
  };

  const inputRef = useRef();

  const onImageAttachClick = () => {
    inputRef.current.click();
  };

  const onUploadImage = async () => {
    const file = inputRef.current.files[0];

    if (!file) {
      return;
    }

    setFileImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("files", file);
    const res = await postImage(formData);
    setImageUrl(res.data[0].split("?")[0]);
    setRequest({
      ...request,
      imageUrl: imageUrl,
    });
    // 반영 안되는 이유..??
    if (validityCheck.isProfileImageUrlPass === "") {
      setValidityCheck({
        ...validityCheck,
        isProfileImageUrlPass: false,
      });
    } else {
      setValidityCheck({
        ...validityCheck,
        isProfileImageUrlPass: true,
      });
    }
  };

  const onSubmit = () => {
    // postGallery(token, req);
    // window.location.reload();
  };

  const post = () => {
    setIsOpen(!isOpen);
  };

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const crop = () => {
    navigate("/crop");
  };

  const menuClick = () => {
    if (isOpen) {
      setIsOpen(false);
      document.body.style.cssText = `overflow: auto;`;
    } else {
      setIsOpen(true);
      document.body.style.cssText = `overflow: hidden;`;
    }
  };
  const newHandle = () => {
    async function getNewGallery() {
      const res = await newGallery(token);
      // for (let key in res) {
      //   setNewInfor(res[key]);
      // }
      newInform(res);
    }
    getNewGallery(token);
  };
  const likeHandle = () => {
    async function getlikeGallery() {
      const res = await likedGallery(token);
      // for (let key in res) {
      //   setLikeNewInfor(res[key]);
      // }
      newInform(res);
    }
    getlikeGallery(token);
  };
  useEffect(() => {
    async function getNewGallery() {
      const res = await newGallery(token, 10);
      newInform(res);
    }
    getNewGallery();
  }, []);

  return (
    <>
      <Wrapper>
        <div className="w95p">
          <PostContainer>
            <MainBtn
              style={{ marginBottom: "16px" }}
              text={"POST"}
              onclick={() => {
                menuClick();
                post();
              }}
            />
            {isOpen === true ? (
              <ModalBackdrop>
                <ModalView width="330px" height="650px">
                  <PostLayout>
                    <ImgContainer
                    // onClick={crop}
                    >
                      {validityCheck.isProfileImageUrlPass ? (
                        <img src={fileImage} alt="profile" />
                      ) : (
                        <div>이미지를 첨부해주세요.</div>
                      )}
                    </ImgContainer>
                    <input
                      className="hidden"
                      id="profileImageUrl"
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={onUploadImage}
                    />
                    <ImgBtn onClick={onImageAttachClick}>이미지 첨부</ImgBtn>
                    <TagContainer2>
                      {tags.map((tag, index) => {
                        return (
                          <Tag key={index}>
                            {tag}{" "}
                            <span onClick={() => removeTag(tag, index)}>x</span>
                          </Tag>
                        );
                      })}

                      {tags.length === 0 ? (
                        <input
                          placeholder="태그 등록 (한 태그당 5자 이하, 2개까지 가능)"
                          onKeyDown={addTag}
                          onChange={onChangeTag}
                          style={{ width: "250px" }}
                          maxLength="5"
                          oninput={() => {
                            numberMaxLength(this);
                          }}
                        />
                      ) : tags.length === 1 ? (
                        <input
                          onKeyDown={addTag}
                          onChange={onChangeTag}
                          style={{ width: "140px" }}
                          maxLength="5"
                          oninput={() => {
                            numberMaxLength(this);
                          }}
                        />
                      ) : (
                        <input
                          onKeyDown={addTag}
                          style={{ width: "50px" }}
                          maxLength="5"
                          oninput={() => {
                            numberMaxLength(this);
                          }}
                          readOnly
                        />
                      )}
                    </TagContainer2>
                    <ContentContainer>
                      <input
                        placeholder="글 작성 (15자 이하)"
                        id="content"
                        onChange={onChangeContent}
                        maxLength="15"
                        oninput={() => {
                          numberMaxLength(this);
                        }}
                      />
                    </ContentContainer>
                    <SubmitLayout>
                      <CancelBtn
                        onClick={() => {
                          openModalHandler();
                          menuClick();
                          window.location.reload();
                        }}
                      >
                        취소
                      </CancelBtn>
                      <SubmitBtn
                        onClick={() => {
                          // tag1이 더블클릭시 2번실행안되게 하려면 어디에 넣어야?
                          // setRequest({
                          //   ...request,
                          //   tag: tagAdd,
                          // });
                          tag1();
                          req.imageUrl = imageUrl;
                          req.tag = tagAdd;
                          req.content = content;
                          onSubmit();
                          console.log(req);
                          console.log(request);
                          console.log(req.imageUrl);
                          console.log(Object.keys(req));
                          console.log(Object.values(req));
                          console.log(Object.values(req)[0].length);
                        }}
                        disabled={
                          imageUrl.length == 0 ||
                          tags.length == 0 ||
                          content.length == 0
                        }
                      >
                        등록
                      </SubmitBtn>
                    </SubmitLayout>
                  </PostLayout>
                </ModalView>
              </ModalBackdrop>
            ) : null}
          </PostContainer>
          <div className="roof">
            <FliterLaout>
              <Newest
                style={{
                  fontSize: sortby === "최신순" ? "18px" : "16px",
                  color: sortby === "최신순" ? "white" : "",
                  fontWeight: sortby === "최신순" ? "700" : "",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSortby("최신순");
                }}
              >
                최신순
              </Newest>
              <Liked
                style={{
                  fontSize: sortby === "좋아요순" ? "18px" : "16px",
                  color: sortby === "좋아요순" ? "black" : "white",
                  fontWeight: sortby === "좋아요순" ? "700" : "",
                  cursor: "pointer",
                }}
                onClick={() => {
                  // setSortby("좋아요순");
                  // likeHandle();
                  navigate("/gallery2");
                }}
              >
                좋아요순
              </Liked>
            </FliterLaout>
          </div>
          <SwiperComponent postList={inform} sortby={sortby} />
          <div className="floor" />
        </div>
      </Wrapper>
    </>
  );
}
