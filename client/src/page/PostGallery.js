import React from "react";
import styled from "styled-components";
import TagInput from "../component/TagInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageCrop from "../component/ImageCrop";
import ImageCrop2 from "../component/ImageCrop2";

const PostLayout = styled.div`
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

const ImgContainer = styled.div`
  width: 310px;
  height: 500px;
  border: 1px solid grey;

  margin-top: 16px;
`;

const Input = styled.div`
  width: 300px;
  height: 30px;
  border: 1px solid grey;
  padding: 5px;
`;

const Submit = styled.button`
  width: 50px;
  height: 30px;
  border: 0px;
  border-radius: 10px;
  background-color: #a0c3d2;
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

const PostGallery = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState("initial data");

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

  return (
    <div>
      <PostLayout>
        <ImageCrop2 />
        <ImgContainer onClick={openModalHandler}>
          이미지를 첨부해주세요.
        </ImgContainer>
        <TagInput></TagInput>
        <Input>글을 작성해주세요. (글자수제한)</Input>
        <SubmitLayout>
          <Submit
            onClick={() => {
              openModalHandler();
              menuClick();
            }}
          >
            취소
          </Submit>
          <Submit>등록</Submit>
          <div>{data}</div>
        </SubmitLayout>
      </PostLayout>
      <ImageCrop setData={setData} />
      {isOpen === true ? (
        <ModalBackdrop>
          <ModalView width="590px" height="680px"></ModalView>
        </ModalBackdrop>
      ) : null}
    </div>
  );
};

export default PostGallery;
