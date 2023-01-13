import React, { Component } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";

const Wrapper = styled.div`
  img {
    filter: brightness(70%);
    flex: none;
    height: 1000px;
    object-fit: cover;
    width: 1920px;
  }
`;

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Wrapper>
        <div className="ca">
          <Slider {...settings}>
            <div>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/image/maciek-sulkowski-58tP7g7x1LQ-unsplash.jpg"
                }
                alt="Carousel 1"
              />
            </div>
            <div>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/image/nicolas-houdayer-qMDhXONZdXk-unsplash.jpg"
                }
                alt="Carousel 2"
              />
            </div>
            <div>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/image/matej-rieciciar-bPRxj7wNft8-unsplash.jpg"
                }
                alt="Carousel 3"
              />
            </div>
          </Slider>
        </div>
      </Wrapper>
    );
  }
}
