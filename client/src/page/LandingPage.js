import styled from "styled-components";
import Carousel from "../component/Carousel";
import { useScrollFadeIn } from "../component/useScrollFadeIn";
import { useScrollMoveIn } from "../component/useScrollMoveIn";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .flex {
    display: flex;
  }
`;

const Card = styled.div`
  align-items: center;
  background-color: ${(props) => (props.color ? props.color : "#f6f4eb")};
  display: flex;
  justify-content: center;
  max-width: 1920px;
  width: 100vw;
  word-break: keep-all;
  img {
    height: auto;
    max-width: 800px;
    object-fit: cover;
  }
  .sa {
    justify-content: space-around;
  }
  .text {
    max-width: 450px;
  }
  .mr50 {
    margin-right: 50px;
  }
  .mt80 {
    margin-top: 80px;
  }
  .mtb200 {
    margin: 200px 0;
  }
  .fs64 {
    font-size: ${(props) => props.theme.fontSizes.fs64};
    font-weight: bold;
  }
  .fs48 {
    font-size: ${(props) => props.theme.fontSizes.fs48};
    color: #dbdbdb;
  }
  .fs30 {
    font-size: ${(props) => props.theme.fontSizes.fs30};
  }
  .tar {
    text-align: right;
  }
  .tabletVer {
    display: none;
  }
  @media (max-width: 1336px) {
    justify-content: flex-start;
    text-align: ${(props) => (props.color === "White" ? "right" : "left")};
    img {
      margin: ${(props) => (props.color === "White" ? "0 50px" : "0")};
    }
    .desktopVer {
      display: none;
    }
    .flex {
      flex-direction: ${(props) =>
        props.color === "White" ? "column-reverse" : "column"};
      width: 100vw;
    }
    .mr50 {
      margin-left: 50px;
    }
    .mtb200 {
      margin: 100px 0;
    }
    .mt80 {
      margin-top: 40px;
    }
    .tabletVer {
      display: block;
    }
    .text {
      float: right;
      margin: 0 50px;
    }
  }
  @media (max-width: 600px) {
    .fs64 {
      font-size: ${(props) => props.theme.fontSizes.fs36};
      font-weight: bold;
    }
    .fs48 {
      font-size: ${(props) => props.theme.fontSizes.fs30};
      color: #dbdbdb;
    }
    .fs30 {
      font-size: ${(props) => props.theme.fontSizes.fs18};
    }
    .text {
      max-width: 500px;
    }
    .mtb200 {
      margin: 50px 0;
    }
    .mt80 {
      margin-top: 20px;
    }
  }
`;

export default function LandingPage() {
  const animatedItem1 = useScrollFadeIn();
  const animatedItem2 = useScrollFadeIn();
  const animatedItem3 = useScrollMoveIn();
  const animatedItem4 = useScrollMoveIn();
  const animatedItem5 = useScrollMoveIn();
  const animatedItem6 = useScrollMoveIn();

  return (
    <>
      <Wrapper>
        <Carousel />
        <Card>
          <div className="flex mtb200 tar">
            {/* 구조분해할당을 통해 해당 컴포넌트에 속성값 부여 */}
            <img
              src={
                process.env.PUBLIC_URL +
                "/image/marc-thunis-uGHqZRCEWag-unsplash 1.png"
              }
              alt="card 1"
              className="mr50"
              {...animatedItem1}
            />
            <div className="desktopVer text ra" {...animatedItem3}>
              <div className="fs64 mt80">community</div>
              <div className="fs48">커뮤니티</div>
              <div className="fs30">
                등산을 좋아하는 사람들과 함께 이야기를 나누어보세요 <br />
                정보를 공유하고 질문할 수도 있어요 <br />
                열심히 활동하시고 포인트를 얻어서 아이콘을 진화시켜 보세요
              </div>
            </div>
            <div>
              <div className="tabletVer text" {...animatedItem4}>
                <div className="fs64 mt80">community</div>
                <div className="fs48">커뮤니티</div>
                <div className="fs30">
                  등산을 좋아하는 사람들과 함께 이야기를 나누어보세요 <br />
                  정보를 공유하고 질문할 수도 있어요 <br />
                  열심히 활동하시고 포인트를 얻어서 아이콘을 진화시켜 보세요
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card color="White">
          <div className="flex mtb200 sa">
            <div>
              <div className="tabletVer text" {...animatedItem5}>
                <div className="fs64 mt80">hikingmap</div>
                <div className="fs48">등산지도</div>
                <div className="fs30">
                  날씨, 산 위치, 등산로 등을 찾아볼 수 있는 지도입니다
                </div>
              </div>
            </div>
            <div className="desktopVer text mr50" {...animatedItem6}>
              <div className="fs64 mt80">hikingmap</div>
              <div className="fs48">등산지도</div>
              <div className="fs30">
                날씨, 산 위치, 등산로 등을 찾아볼 수 있는 지도입니다
              </div>
            </div>
            <img
              src={
                process.env.PUBLIC_URL +
                "/image/sanket-darji-LKge0b91IU8-unsplash 2.png"
              }
              alt="card 2"
              {...animatedItem2}
            ></img>
          </div>
        </Card>
      </Wrapper>
    </>
  );
}
