import { useEffect, useState } from "react";
import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "./styles.css";
import { Scrollbar } from "swiper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6 } from "../UserIcon";
import { useInfiniteScrollSensor } from "../useInfiniteScrollSensor";
import { deleteGallery, voteGallery } from "../../api/galleryAPI";
import { Cookies } from "react-cookie";

const Wrapper = styled.div`
  img {
    border-radius: 10px 10px 0 0;
    height: 500px;
    width: 310px;
    object-fit: cover;
  }

  .content {
    width: 100%;
  }

  .divider {
    border-bottom: 3px dashed #62b6b7;
    height: 5px;
    margin-bottom: 10px;
  }

  .flex {
    display: flex;
  }

  .ha {
    flex-direction: column;
    justify-content: center;
  }

  .h668 {
    height: 668px;
  }

  .heartanimation {
    animation-duration: 0.5s;
    animation-name: heartreaction;
  }

  .jcc {
    justify-content: center;
  }

  .jcsb {
    justify-content: space-between;
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .mr10 {
    margin-right: 10px;
  }

  .mt10 {
    margin-top: 10px;
  }

  .ofh {
    overflow: hidden;
  }

  .phrase {
    border: 3px dashed #62b6b7;
    border-radius: 10px;
    font-size: 14px;
    padding: 5px;
  }

  .post {
    align-items: center;
    border: 3px solid #62b6b7;
    border-radius: 10px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    margin: 40px 0;
    min-width: 325px;
    padding: 5px;
  }

  .tag {
    background-color: #62b6b7;
    border-radius: 10px;
    color: #ffffff;
    font-size: 16px;
    padding: 5px;
  }

  .va {
    align-items: center;
    display: flex;
  }

  .w90p {
    width: 90%;
  }

  @keyframes heartreaction {
    0% {
      font-size: 27px;
    }

    50% {
      font-size: 30px;
    }

    100% {
      font-size: 27px;
    }
  }
`;

export default function SwiperComponent({ postList, sortby }) {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const userId1 = JSON.parse(localStorage.getItem("userId"));
  const deletePost = (data) => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      // alert("삭제되었습니다")
      deleteGallery(token, data);

      window.location.reload();
    }
    // deleteGallery(token, gallerySeq);
  };

  const [post, setPost] = useState(postList);
  const [heart, setHeart] = useState(post?.map((e) => e.likedStatus));
  const [likes, setLikes] = useState(post?.map((e) => e.liked));
  const [postLength, setPostLength] = useState(0);

  const infiniteScrollSensor = useInfiniteScrollSensor(setPost, sortby);

  const UseClickHeart = (idx, seq) => {
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
    } else {
      if (heart[idx] === false) {
        let heartState = [...heart];
        heartState[idx] = true;
        setHeart(heartState);
        let likesState = [...likes];
        ++likesState[idx];
        setLikes(likesState);
        voteGallery(token, seq);
      } else {
        let heartState = [...heart];
        heartState[idx] = false;
        setHeart(heartState);
        let likesState = [...likes];
        --likesState[idx];
        setLikes(likesState);
        voteGallery(token, seq);
      }
    }
  };

  useEffect(() => {
    setHeart(post?.map((e) => e.likedStatus));
  }, [post]);

  useEffect(() => {
    setLikes(post?.map((e) => e.liked));
  }, [post]);

  useEffect(() => {
    post !== undefined && setPostLength(Object.keys(post).length);
  }, [post]);

  const swiperSlideMaker = post?.map((e, idx) => {
    if (heart !== undefined && likes !== undefined) {
      return (
        <>
          <SwiperSlide>
            <div className="flex post">
              <img src={e.imgUrl} alt="postimage" />
              <div className="content">
                <div className="divider" />
                <div className="flex jcsb mb10">
                  <div className="mr10">
                    <div className="flex mb10">
                      {e?.userRole === "USER" ? (
                        <>
                          {0 <= e?.point && e?.point <= 30 ? <Icon1 /> : ""}
                          {31 <= e?.point && e?.point <= 70 ? <Icon2 /> : ""}
                          {71 <= e?.point && e?.point <= 100 ? <Icon3 /> : ""}
                          {101 <= e?.point && e?.point <= 200 ? <Icon4 /> : ""}
                          {201 <= e?.point && e?.point <= 300 ? <Icon5 /> : ""}
                          {301 <= e?.point ? <Icon6 /> : ""}{" "}
                        </>
                      ) : (
                        <Icon1 />
                      )}
                      <div className="va"> {e.username} </div>
                    </div>
                    <div className="flex">
                      <div className="mr10 tag"> {e.tags} </div>
                    </div>
                  </div>
                  <div className="flex mr10 mt10">
                    <FontAwesomeIcon
                      icon={heart[idx] ? faSolidHeart : faHeart}
                      color="#62B6B7"
                      size="xl"
                      className={heart[idx] ? "heartanimation mr10" : "mr10"}
                      onClick={() => UseClickHeart(idx, e.gallerySeq)}
                      {...useInfiniteScrollSensor}
                    />
                    <div>{likes[idx]}</div>
                  </div>
                </div>
                <div className="phrase">" {e.content} "</div>
              </div>
            </div>
            {userId1 === e.userId ? (
              <>
                <TiDeleteOutline
                  style={{
                    marginBottom: "660px",
                    marginLeft: "-20px",
                    cursor: "pointer",
                  }}
                  size="30px"
                  onClick={() => deletePost(e.gallerySeq)}
                />
              </>
            ) : null}
          </SwiperSlide>
        </>
      );
    }
  });

  return (
    <Wrapper>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {swiperSlideMaker}
        <SwiperSlide>
          <div className="flex h668 post">
            {postLength % 10 !== 0 ? (
              <>
                <div>포스트가 더 없습니다!</div>
                <div>새로운 포스트를 등록해보시겠어요?</div>
              </>
            ) : (
              <FontAwesomeIcon
                icon={faSpinner}
                color="#62B6B7"
                size="xl"
                spin
                {...infiniteScrollSensor}
              />
            )}
          </div>
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
}
