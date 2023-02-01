import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Icon1 } from "../component/UserIcon";

const Wrapper = styled.div`
  img {
    border-radius: 10px 10px 0 0;
    height: 100%;
    max-height: 360px;
    max-width: 360px;
    overflow: hidden;
  }

  .content {
    width: 100%;
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

export default function Gallery() {
  return (
    <>
      <Wrapper>
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
      </Wrapper>
    </>
  );
}
