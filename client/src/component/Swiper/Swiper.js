import { useState } from "react";
import styled from "styled-components";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "./styles.css";

import { Scrollbar } from "swiper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

import SwiperDummyData from "./SwiperDummyData";

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

export default function SwiperComponent() {
  const [heart, setHeart] = useState(
    SwiperDummyData.map((e) => e.isHearCliked)
  );
  const [likes, setLikes] = useState(SwiperDummyData.map((e) => e.likes));

  const UseClickHeart = (idx) => {
    if (heart[idx] === false) {
      let heartState = [...heart];
      heartState[idx] = true;
      setHeart(heartState);
      let likesState = [...likes];
      ++likesState[idx];
      setLikes(likesState);
    } else {
      let heartState = [...heart];
      heartState[idx] = false;
      setHeart(heartState);
      let likesState = [...likes];
      --likesState[idx];
      setLikes(likesState);
    }
  };

  const swiperSlideMaker = SwiperDummyData.map((e, idx) => {
    return (
      <SwiperSlide>
        <div className="flex post">
          <img src={e.img} alt="postimage" />
          <div className="content">
            <div className="divider" />
            <div className="flex jcsb mb10">
              <div className="mr10">
                <div className="flex mb10">
                  {e.icon}
                  <div className="va"> {e.nickname} </div>
                </div>
                <div className="flex">
                  {e.tags.map((e) => {
                    return <div className="mr10 tag"> # {e} </div>;
                  })}
                </div>
              </div>
              <div className="flex mr10 mt10">
                <FontAwesomeIcon
                  icon={heart[idx] ? faSolidHeart : faHeart}
                  color="#62B6B7"
                  size="xl"
                  className={heart[idx] ? "heartanimation mr10" : "mr10"}
                  onClick={() => UseClickHeart(idx)}
                />
                <div>{likes[idx]}</div>
              </div>
            </div>
            <div className="phrase">" {e.comment} "</div>
          </div>
        </div>
      </SwiperSlide>
    );
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
      </Swiper>
    </Wrapper>
  );
}
