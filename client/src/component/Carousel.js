import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import carouselPrase from "../data/CarouselPhrase";

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
    margin-top: -270px;
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
  const num = Math.floor(Math.random() * 4);

  const images = useRef([
    {
      src:
        process.env.PUBLIC_URL +
        "/image/maciek-sulkowski-58tP7g7x1LQ-unsplash.jpg",
      content: carouselPrase[num].first,
    },
    {
      src:
        process.env.PUBLIC_URL +
        "/image/nicolas-houdayer-qMDhXONZdXk-unsplash.jpg",
      content: carouselPrase[num].second,
    },
    {
      src:
        process.env.PUBLIC_URL +
        "/image/matej-rieciciar-bPRxj7wNft8-unsplash.jpg",
      content: carouselPrase[num].third,
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
