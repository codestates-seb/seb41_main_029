import styled from "styled-components";
import Carousel from "../component/Carousel";

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
  img {
    height: auto;
    max-width: 800px;
    object-fit: cover;
  }
  .sa {
    justify-content: space-around;
  }
  .text {
    max-width: 400px;
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
    .mtb200 {
      margin: 50px 0;
    }
    .mt80 {
      margin-top: 20px;
    }
  }
`;

export default function LandingPage() {
  return (
    <>
      <Wrapper>
        <Carousel />
        <Card>
          <div className="flex mtb200 tar">
            <img
              src={
                process.env.PUBLIC_URL +
                "/image/marc-thunis-uGHqZRCEWag-unsplash 1.png"
              }
              alt="card 1"
              className="mr50"
            />
            <div className="desktopVer text ra">
              <div className="fs64 mt80">community</div>
              <div className="fs48">커뮤니티</div>
              <div className="fs30">
                헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며,
                재판관은 대통령이 임명한다.
              </div>
            </div>
            <div>
              <div className="tabletVer text">
                <div className="fs64 mt80">community</div>
                <div className="fs48">커뮤니티</div>
                <div className="fs30">
                  헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며,
                  재판관은 대통령이 임명한다.
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card color="White">
          <div className="flex mtb200 sa">
            <div>
              <div className="tabletVer text">
                <div className="fs64 mt80">hikingmap</div>
                <div className="fs48">등산지도</div>
                <div className="fs30">
                  국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야
                  한다. 제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에
                  의하여 국회재적의원 과반수의 찬성이 있어야 한다.
                </div>
              </div>
            </div>
            <div className="desktopVer text mr50">
              <div className="fs64 mt80">hikingmap</div>
              <div className="fs48">등산지도</div>
              <div className="fs30">
                국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다.
                제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에 의하여
                국회재적의원 과반수의 찬성이 있어야 한다.
              </div>
            </div>
            <img
              src={
                process.env.PUBLIC_URL +
                "/image/sanket-darji-LKge0b91IU8-unsplash 2.png"
              }
              alt="card 2"
            ></img>
          </div>
        </Card>
      </Wrapper>
    </>
  );
}
