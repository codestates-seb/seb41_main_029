import { useCallback, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { likedGallery, newGallery } from "../api/galleryAPI";
import { MainBtn } from "../component/Button";

import SwiperComponent from "../component/Swiper/Swiper";
// import Swipers from "../component/Swiper/Swipers";

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
const PostContainer = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */
`;
const ImgContainer = styled.div`
  width: 120px;
  height: 120px;
  border: 1px solid grey;

  margin-top: 16px;
  margin-left: 16px;
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
  width: 320px;
  height: 200px;
  border: 3px solid #a0c3d2;
  border-radius: 10px;
  margin-bottom: 16px;
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
  margin-top: 115px;
  margin-right: 20px;
  justify-content: right;
`;
export default function Gallery() {
  const [dropDown, setDropDown] = useState(false);
  const [sortby, setSortby] = useState("최신순");
  const navigate = useNavigate();
  const [inform, newInform] = useState();
  const [seq, setSeq] = useState();

  const cookie = new Cookies();
  const token = cookie.get("token");

  const post = () => {
    setDropDown(!dropDown);
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
              onclick={post}
            />
            {dropDown ? (
              <PostLayout>
                <ImgContainer></ImgContainer>
                <Source>
                  <input />
                </Source>
                <SubmitLayout>
                  <Submit>등록</Submit>
                </SubmitLayout>
              </PostLayout>
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
