import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    user-select: none;
  }
  div {
    transition: all 0.3s ease-out;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .slide {
    display: flex;
    align-items: center;
  }
  .window {
    height: 1080px;
    max-width: 1920px;
    overflow: hidden;
    width: 100vw;
  }
  .btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 3.3rem;
    color: gray;
    margin: 0 -3.6rem;
    z-index: 1;
  }
  .flexbox {
    display: flex;
  }
  .img {
    max-width: 1920px;
    width: 100vw;
    height: 1080px;
    background-position: 50% 50%;
    background-size: cover;
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .phrase {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.fs36};
    font-weight: bold;
    text-align: center;
    width: 640px;
    word-break: keep-all;
    filter: none;
  }
  @media (max-width: 1336px) {
    .btn {
      font-size: 2rem;
      margin: 0 -3rem;
    }
    .phrase {
      font-size: ${(props) => props.theme.fontSizes.fs30};
      width: 445px;
    }
  }
  @media (max-width: 600px) {
    .btn {
      display: none;
    }
    .phrase {
      font-size: ${(props) => props.theme.fontSizes.fs24};
      width: calc(100vw - 100px);
    }
  }
`;

export default function Test() {
  const images = useRef([
    {
      src:
        process.env.PUBLIC_URL +
        "/image/maciek-sulkowski-58tP7g7x1LQ-unsplash.jpg",
      content: `법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다.`,
    },
    {
      src:
        process.env.PUBLIC_URL +
        "/image/nicolas-houdayer-qMDhXONZdXk-unsplash.jpg",
      content: `국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다. 국가는 평생교육을 진흥하여야 한다.`,
    },
    {
      src:
        process.env.PUBLIC_URL +
        "/image/matej-rieciciar-bPRxj7wNft8-unsplash.jpg",
      content: `국회의원은 현행범인인 경우를 제외하고는 회기중 국회의 동의없이 체포 또는 구금되지 아니한다. 국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다. 재판의 심리와 판결은 공개한다. 다만, 심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다.`,
    },
  ]);

  const [now, setCurrent] = useState(0);
  const [ml, setMl] = useState({ marginLeft: `-${now}00%` });

  const buttonClick = (ele) => {
    let index = now + ele;

    if (index < 0) {
      index = images.current.length - 1;
    } else if (index === images.current.length) {
      index = 0;
    }
    setCurrent(index);
  };

  useEffect(() => {
    let autoSwipe = setInterval(() => {
      buttonClick(1);
    }, 3000);
    return () => clearInterval(autoSwipe);
  });

  useEffect(() => {
    setMl({ marginLeft: `-${now}00%` });
  }, [now]);

  return (
    <Wrapper>
      <div className="container">
        <div className="slide">
          <div
            className="btn"
            onClick={() => {
              buttonClick(-1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} color="white" />
          </div>
          <div className="window">
            <div className="flexbox" style={ml}>
              {images.current.map((img, i) => (
                <div
                  key={i}
                  className="img"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${img.src})`,
                  }}
                >
                  <div className="phrase">{img.content}</div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="btn"
            onClick={() => {
              buttonClick(1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} color="white" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
