import { useState } from "react";
import styled from "styled-components";
import { MainBtn } from "../component/Button";

import SwiperComponent from "../component/Swiper/Swiper";

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

// export const ModalBtn = styled.button`
//   background-color: ${theme.colors.main};
//   text-decoration: none;
//   border: none;
//   padding: 10px;
//   color: white;
//   border-radius: 10px;
//   cursor: grab;
//   margin-top: 10px;
//   margin-right: 10px;
//   @media screen and (max-width: 430px) {
//     font-size: 12px;
//   }
// `;

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

const PostContainer = styled.div``;
const ImgContainer = styled.div`
  width: 360px;
  height: 300px;
  border: 1px solid grey;

  margin-top: 16px;
  margin-left: 16px;
`;

const Input = styled.div`
  width: 360px;
  height: 30px;
  border: 1px solid grey;
`;
const FliterLaout = styled.div`
  display: flex;
  float: right;
  color: white;
  margin-top: 8px;
  margin-right: 12px;
`;
const Newest = styled.span`
  margin-right: 12px;
`;
const Liked = styled.span``;
const Source = styled.div`
  display: flex;
  margin-top: -121px;
  justify-content: right;
  margin-right: 20px;
`;
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

export default function Gallery() {
  // const [dropDown, setDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const post = () => {
    // setDropDown(!dropDown);
    setIsOpen(!isOpen);
  };

  const openModalHandler = () => {
    setIsOpen(!isOpen);
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
            {/* {dropDown ? (
              <PostLayout>
                <ImgContainer></ImgContainer>
                <Source>
                  <input />
                </Source>
                <SubmitLayout>
                  <Submit>등록</Submit>
                </SubmitLayout>
              </PostLayout>
            ) : null} */}
            {isOpen === true ? (
              <ModalBackdrop>
                <ModalView width="410px" height="420px">
                  <PostLayout>
                    <ImgContainer>이미지를 첨부해주세요.</ImgContainer>
                    <Input>태그를 입력해주세요.</Input>
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
                    </SubmitLayout>
                  </PostLayout>
                </ModalView>
              </ModalBackdrop>
            ) : null}
          </PostContainer>
          <div className="roof">
            <FliterLaout>
              <Newest>최신순</Newest>
              <Liked>좋아요순</Liked>
            </FliterLaout>
          </div>
          <SwiperComponent />
          <div className="floor" />
        </div>
      </Wrapper>
    </>
  );
}
