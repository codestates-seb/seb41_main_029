import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

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
    margin: 0 -3rem;
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
    font-size: ${(props) => props.theme.fontSizes.fs30};
    font-weight: bold;
    text-align: center;
    width: 960px;
    word-break: keep-all;
    filter: none;
  }
  @media (max-width: 1336px) {
    .btn {
      font-size: 2rem;
      margin: 0 -3rem;
    }
    .phrase {
      font-size: ${(props) => props.theme.fontSizes.fs24};
      width: 668px;
    }
  }
  @media (max-width: 600px) {
    .btn {
      display: none;
    }
    .phrase {
      font-size: ${(props) => props.theme.fontSizes.fs18};
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
      content: (
        <>
          <div> 등산의 기쁨은 정상에 오를 때가 가장 크다. </div>
          <div>
            {" "}
            그러나 나의 최상의 기쁨은 험악한 산을 기어 올라가는 순간에 있다.{" "}
          </div>
          <div> 길이 험하면 험할수록 가슴이 뛴다. </div>
          <div> - 프리드리히 니체 </div>
        </>
      ),
    },
    {
      src:
        process.env.PUBLIC_URL +
        "/image/nicolas-houdayer-qMDhXONZdXk-unsplash.jpg",
      content: `등산은 60kg 성인 기준 1시간에 500칼로리를 소모할 수 있는 체중 감량 효과가 있어요.`,
    },
    {
      src:
        process.env.PUBLIC_URL +
        "/image/matej-rieciciar-bPRxj7wNft8-unsplash.jpg",
      content: `본격적인 등산에 앞서 준비 운동 잊지 마세요.`,
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
    }, 4000);
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
            <FontAwesomeIcon
              icon={faPlay}
              color="white"
              rotation={180}
              size="xs"
            />
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
            <FontAwesomeIcon icon={faPlay} color="white" size="xs" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
