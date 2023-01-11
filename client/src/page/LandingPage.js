import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  .flex {
    display: flex;
  }
`;

const Carousel = styled.div`
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  height: 1000px;
  width: 1920px;
  img {
    filter: brightness(70%);
    flex: none;
    height: 1000px;
    object-fit: cover;
    width: 1920px;
  }
  .arrow {
    display: flex;
    position: absolute;
    top: 488px;
    width: 1920px;
    z-index: 1000;
  }
  .phrase {
    position: absolute;
    height: 1000px;
    width: 1920px;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .spacing {
    flex: 1;
  }
`;

function clickLeft() {}

function clickRight() {}

export default function LandingPage() {
  return (
    <Wrapper>
      <Carousel className="flex">
        <div className="arrow">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="2x"
            color="white"
            onClick={clickLeft()}
          />
          <div className="spacing"></div>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="2x"
            color="white"
            onClick={clickRight()}
          />
        </div>
        <div>
          <div className="phrase">
            대통령은 취임에 즈음하여 다음의 선서를 한다. 국가는 농·어민과
            중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과 발전을
            보장한다.
          </div>
          <img
            src={
              process.env.PUBLIC_URL +
              "/image/maciek-sulkowski-58tP7g7x1LQ-unsplash.jpg"
            }
            alt="Carousel 1"
          />
        </div>
        <img
          src={
            process.env.PUBLIC_URL +
            "/image/nicolas-houdayer-qMDhXONZdXk-unsplash.jpg"
          }
          alt="Carousel 2"
        />
        <img
          src={
            process.env.PUBLIC_URL +
            "/image/matej-rieciciar-bPRxj7wNft8-unsplash.jpg"
          }
          alt="Carousel 3"
        />
      </Carousel>
    </Wrapper>
  );
}
