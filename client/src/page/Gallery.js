import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Icon1 } from "../component/UserIcon";

import SwiperComponent from "../component/Swiper/Swiper";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 160px);
  justify-content: center;
  margin: 80px auto 0 auto;
  max-width: 1336px;
  width: 100%;

  img {
    border-radius: 10px 10px 0 0;
    height: 100%;
    max-height: 360px;
    max-width: 360px;
    overflow: hidden;
  }

  input {
    max-width: 180px;
    float: right;
  }

  .content {
    width: 100%;
  }

  .cover {
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 10px 10px 0 0;
    height: 40px;
  }

  .divider {
    border-bottom: 3px dashed ${(props) => props.theme.colors.main};
    height: 10px;
    margin-bottom: 10px;
  }

  .flex {
    display: flex;
  }

  .ha {
    flex-direction: column;
    justify-content: center;
  }

  .icon {
    width: 20px;
    height: 20px;
    border: 2px solid ${(props) => props.theme.colors.main};
    border-radius: 50%;
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
    border: 3px dashed ${(props) => props.theme.colors.main};
    border-radius: 10px;
    padding: 5px;
  }

  .post {
    align-items: center;
    border: 3px solid ${(props) => props.theme.colors.main};
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    margin: 40px 40px 40px 20px;
    min-width: 360px;
    padding: 5px;
  }

  .tag {
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 10px;
    color: #ffffff;
    padding: 5px;
  }

  .va {
    align-items: center;
    display: flex;
  }

  .w90p {
    width: 90%;
  }

  @media (max-width: 600px) {
    .searchinputwrapper {
      margin-top: 10px;
    }
    .tagsearchline {
      flex-direction: column;
    }
  }
`;

const Tag = styled.button`
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 10px;
  color: #ffffff;
  padding: 5px;

  &:hover {
    background-color: #439a97;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }

  @media (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.fs10};
  }
`;

export default function Gallery() {
  return (
    <>
      <Wrapper>
        <div className="flex jcsb mb10 tagsearchline w90p">
          <div className="flex">
            <div className="mr10 va"> 인기 태그 </div>
            <Tag className="mr10"> # 등산화 추천 </Tag>
            <Tag className="mr10"> # 등정 인증 </Tag>
            <Tag className="mr10"> # 한라산 </Tag>
          </div>
          <div className="searchinputwrapper">
            <input />
          </div>
        </div>
        <div className="w90p">
          <div className="cover" />
          <div className="flex ofh">
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
                      icon={faHeartSolid}
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
          </div>
        </div>
      </Wrapper>
    </>
  );
}
