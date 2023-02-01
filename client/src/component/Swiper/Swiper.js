import { useState } from "react";
import styled from "styled-components";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

import "./styles.css";

import { Scrollbar } from "swiper";

import { Icon1 } from "../UserIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  img {
    border-radius: 10px 10px 0 0;
    height: 100%;
    max-height: 525px;
    max-width: 325px;
    width: 100%;
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
    margin: 40px 40px 40px 0;
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
  const [heart, setHeart] = useState(false);
  const [likes, setLikes] = useState(0);

  const onClickHeart = () => {
    if (heart === false) {
      setHeart(true);
      setLikes((likes) => ++likes);
    } else {
      setHeart(false);
      setLikes((likes) => --likes);
    }
  };

  return (
    <Wrapper>
      <Swiper
        slidesPerView={"auto"}
        freeMode={true}
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex post">
            <img src="https://i.imgur.com/fNPu0Hr.jpeg" alt="postimage" />
            <div className="content">
              <div className="divider" />
              <div className="flex jcsb mb10">
                <div className="mr10">
                  <div className="flex mb10">
                    <Icon1 />
                    <div className="va"> sywoo0109 </div>
                  </div>
                  <div className="flex">
                    <div className="mr10 tag"> # 화나요 </div>
                    <div className="mr10 tag"> # 등산 매너 </div>
                  </div>
                </div>
                <div className="flex mt10">
                  {heart ? (
                    <FontAwesomeIcon
                      icon={faSolidHeart}
                      color="#62B6B7"
                      size="xl"
                      className="heartanimation mr10"
                      onClick={onClickHeart}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      color="#62B6B7"
                      size="xl"
                      className="mr10"
                      onClick={onClickHeart}
                    />
                  )}
                  <div>{likes}</div>
                </div>
              </div>
              <div className="phrase">
                " 산에서 쓰레기 버린 나쁜 사람 누구야! 😠 "
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex post">
            <img src="https://i.imgur.com/JsWOQSb.jpeg" alt="postimage" />
            <div className="content">
              <div className="divider" />
              <div className="flex jcsb mb10">
                <div className="mr10">
                  <div className="flex mb10">
                    <Icon1 />
                    <div className="va"> sywoo0109 </div>
                  </div>
                  <div className="flex">
                    <div className="mr10 tag"> # 화나요 </div>
                    <div className="mr10 tag"> # 등산 매너 </div>
                  </div>
                </div>
                <div className="flex mt10">
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#62B6B7"
                    size="xl"
                    className="mr10"
                  />
                  <div> 29 </div>
                </div>
              </div>
              <div className="phrase">
                " 산에서 쓰레기 버린 나쁜 사람 누구야! 😠 "
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex post">
            <img src="https://i.imgur.com/sfOjpEM.jpeg" alt="postimage" />
            <div className="content">
              <div className="divider" />
              <div className="flex jcsb mb10">
                <div className="mr10">
                  <div className="flex mb10">
                    <Icon1 />
                    <div className="va"> sywoo0109 </div>
                  </div>
                  <div className="flex">
                    <div className="mr10 tag"> # 화나요 </div>
                    <div className="mr10 tag"> # 등산 매너 </div>
                  </div>
                </div>
                <div className="flex mt10">
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#62B6B7"
                    size="xl"
                    className="mr10"
                  />
                  <div> 29 </div>
                </div>
              </div>
              <div className="phrase">
                " 산에서 쓰레기 버린 나쁜 사람 누구야! 😠 "
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex post">
            <img src="https://i.imgur.com/oQ6T2Y7.jpeg" alt="postimage" />
            <div className="content">
              <div className="divider" />
              <div className="flex jcsb mb10">
                <div className="mr10">
                  <div className="flex mb10">
                    <Icon1 />
                    <div className="va"> sywoo0109 </div>
                  </div>
                  <div className="flex">
                    <div className="mr10 tag"> # 화나요 </div>
                    <div className="mr10 tag"> # 등산 매너 </div>
                  </div>
                </div>
                <div className="flex mt10">
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#62B6B7"
                    size="xl"
                    className="mr10"
                  />
                  <div> 29 </div>
                </div>
              </div>
              <div className="phrase">
                " 산에서 쓰레기 버린 나쁜 사람 누구야! 😠 "
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex post">
            <img src="https://i.imgur.com/Pb4OB5K.jpeg" alt="postimage" />
            <div className="content">
              <div className="divider" />
              <div className="flex jcsb mb10">
                <div className="mr10">
                  <div className="flex mb10">
                    <Icon1 />
                    <div className="va"> sywoo0109 </div>
                  </div>
                  <div className="flex">
                    <div className="mr10 tag"> # 화나요 </div>
                    <div className="mr10 tag"> # 등산 매너 </div>
                  </div>
                </div>
                <div className="flex mt10">
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#62B6B7"
                    size="xl"
                    className="mr10"
                  />
                  <div> 29 </div>
                </div>
              </div>
              <div className="phrase">
                " 산에서 쓰레기 버린 나쁜 사람 누구야! 😠 "
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex post">
            <img src="https://i.imgur.com/Qmv3O9W.jpeg" alt="postimage" />
            <div className="content">
              <div className="divider" />
              <div className="flex jcsb mb10">
                <div className="mr10">
                  <div className="flex mb10">
                    <Icon1 />
                    <div className="va"> sywoo0109 </div>
                  </div>
                  <div className="flex">
                    <div className="mr10 tag"> # 화나요 </div>
                    <div className="mr10 tag"> # 등산 매너 </div>
                  </div>
                </div>
                <div className="flex mt10">
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#62B6B7"
                    size="xl"
                    className="mr10"
                  />
                  <div> 29 </div>
                </div>
              </div>
              <div className="phrase">
                " 산에서 쓰레기 버린 나쁜 사람 누구야! 😠 "
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex post">
            <img src="https://i.imgur.com/fnym8NM.jpeg" alt="postimage" />
            <div className="content">
              <div className="divider" />
              <div className="flex jcsb mb10">
                <div className="mr10">
                  <div className="flex mb10">
                    <Icon1 />
                    <div className="va"> sywoo0109 </div>
                  </div>
                  <div className="flex">
                    <div className="mr10 tag"> # 화나요 </div>
                    <div className="mr10 tag"> # 등산 매너 </div>
                  </div>
                </div>
                <div className="flex mt10">
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#62B6B7"
                    size="xl"
                    className="mr10"
                  />
                  <div> 29 </div>
                </div>
              </div>
              <div className="phrase">
                " 산에서 쓰레기 버린 나쁜 사람 누구야! 😠 "
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex post">
            <img src="https://i.imgur.com/OCCktEm.jpeg" alt="postimage" />
            <div className="content">
              <div className="divider" />
              <div className="flex jcsb mb10">
                <div className="mr10">
                  <div className="flex mb10">
                    <Icon1 />
                    <div className="va"> sywoo0109 </div>
                  </div>
                  <div className="flex">
                    <div className="mr10 tag"> # 화나요 </div>
                    <div className="mr10 tag"> # 등산 매너 </div>
                  </div>
                </div>
                <div className="flex mt10">
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#62B6B7"
                    size="xl"
                    className="mr10"
                  />
                  <div> 29 </div>
                </div>
              </div>
              <div className="phrase">
                " 산에서 쓰레기 버린 나쁜 사람 누구야! 😠 "
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex post">
            <img src="https://i.imgur.com/ob8Gq1k.jpeg" alt="postimage" />
            <div className="content">
              <div className="divider" />
              <div className="flex jcsb mb10">
                <div className="mr10">
                  <div className="flex mb10">
                    <Icon1 />
                    <div className="va"> sywoo0109 </div>
                  </div>
                  <div className="flex">
                    <div className="mr10 tag"> # 화나요 </div>
                    <div className="mr10 tag"> # 등산 매너 </div>
                  </div>
                </div>
                <div className="flex mt10">
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#62B6B7"
                    size="xl"
                    className="mr10"
                  />
                  <div> 29 </div>
                </div>
              </div>
              <div className="phrase">
                " 산에서 쓰레기 버린 나쁜 사람 누구야! 😠 "
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex post">
            <img src="https://i.imgur.com/Vs9BNjp.jpeg" alt="postimage" />
            <div className="content">
              <div className="divider" />
              <div className="flex jcsb mb10">
                <div className="mr10">
                  <div className="flex mb10">
                    <Icon1 />
                    <div className="va"> sywoo0109 </div>
                  </div>
                  <div className="flex">
                    <div className="mr10 tag"> # 화나요 </div>
                    <div className="mr10 tag"> # 등산 매너 </div>
                  </div>
                </div>
                <div className="flex mt10">
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#62B6B7"
                    size="xl"
                    className="mr10"
                  />
                  <div> 29 </div>
                </div>
              </div>
              <div className="phrase">
                " 산에서 쓰레기 버린 나쁜 사람 누구야! 😠 "
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
}
