import { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

import "./styles.css";

import { Scrollbar, FreeMode } from "swiper";

import { Icon1 } from "../UserIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default function SwiperComponent() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar, FreeMode]}
        className="mySwiper"
      >
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
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
