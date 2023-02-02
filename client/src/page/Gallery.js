import { fontWeight } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import { Cookies } from "react-cookie";
import styled from "styled-components";
import { likedGallery, newGallery } from "../api/galleryAPI";
import { MainBtn } from "../component/Button";

import SwiperComponent from "../component/Swiper/Swiper";
import TagInput from "../component/TagInput";
import ImageCrop from "../component/ImageCrop";
import { useNavigate } from "react-router-dom";
import ImageCrop2 from "../component/ImageCrop2";
import { postImage } from "../api/userAPI";

import { postGallery } from "../api/galleryAPI";

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
export const ModalBackdrop = styled.div`
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

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: "dialog",
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

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
`;

const Input = styled.input.attrs({ placeholder: "글을 작성해주세요." })`
  width: 255px;
  height: 30px;
  border: 3px solid #62b6b7;
  outline: none;
  padding: 5px 10px;
  border-radius: 10px;
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
const Submit = styled.button`
  margin: 25px 10px;
  width: 60px;
  height: 35px;
  border: 0px;
  border-radius: 10px;
  background-color: #62b6b7;
  color: white;
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
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const [sortby, setSortby] = useState("최신순");
  const [newInfor, setNewInfor] = useState();
  const [likeInfor, setLikeNewInfor] = useState();

  const [fileImage, setFileImage] = useState("");

  const [request, setRequest] = useState({
    imageUrl: "",
    tag: "",
    content: "",
  });

  const [validityCheck, setValidityCheck] = useState({
    isProfileImageUrlPass: false,
  });

  const [inform, newInform] = useState();

  const cookie = new Cookies();
  const token = cookie.get("token");
  // const [dropDown, setDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  let data = {
    imageUrl:
      "https://pre41-deploy-test.s3.ap-northeast-2.amazon…b2d5e5c543c4c9dd3b7e47bae8d170fe9330a12de3737844a",
    tag: "등산",
    content: "가나다라",
  };

  // const postGallery = async (data) => {
  //   try {
  //     const res = await axios({
  //       method: "post",
  //       data: {
  //         imageUrl:
  //           "https://pre41-deploy-test.s3.ap-northeast-2.amazon…b2d5e5c543c4c9dd3b7e47bae8d170fe9330a12de3737844a",
  //         tag: "등산",
  //         content: "가나다라",
  //       },
  //       headers: { Authorization: `Bearer ${getCookie("token")}` },
  //       url: `${url}${upload_endpoint}`,
  //     });
  //     return res;
  //   } catch (e) {}
  // };

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
    console.log(file);
    const formData = new FormData();
    formData.append("files", file);
    console.log(formData);
    const res = await postImage(formData);
    console.log(res);
    let profilImageUrl = res.data[0].split("?")[0];
    setRequest({
      ...request,
      profileImageUrl: profilImageUrl,
    });
    if (validityCheck.profilImageUrl === "") {
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
    postGallery(data);
    // alert("개인정보 수정이 완료되었습니다!");
    // navigate("/mypage");
  };

  const post = () => {
    // setDropDown(!dropDown);
    setIsOpen(!isOpen);
  };

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const crop = () => {
    // setIsOpen2(!isOpen2);
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
      const res = await newGallery(token);
      newInform(res);
      console.log(res);
    }
    getNewGallery();
  }, []);

  console.log(inform);
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
                <ModalView width="330px" height="680px">
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
                    <TagInput></TagInput>
                    <Input />
                    <SubmitLayout>
                      <Submit
                        onClick={() => {
                          openModalHandler();
                          menuClick();
                        }}
                      >
                        취소
                      </Submit>
                      <Submit onClick={onSubmit}>등록</Submit>
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
                  color: sortby === "최신순" ? "black" : "",
                  fontWeight: sortby === "최신순" ? "700" : "",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSortby("최신순");
                  newHandle();
                }}
              >
                최신순
              </Newest>
              <Liked
                style={{
                  fontSize: sortby === "좋아요순" ? "18px" : "16px",
                  color: sortby === "좋아요순" ? "black" : "",
                  fontWeight: sortby === "좋아요순" ? "700" : "",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSortby("좋아요순");
                  likeHandle();
                }}
              >
                좋아요순
              </Liked>
            </FliterLaout>
          </div>
          <SwiperComponent postList={inform} />
          <div className="floor" />
        </div>
      </Wrapper>
      <ImageCrop2 />
    </>
  );
}
