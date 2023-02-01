import styled from "styled-components";

import SwiperComponent from "../component/Swiper/Swiper";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 80px auto 0 auto;
  max-width: 1336px;
  width: 100%;

  .floor {
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 0 0 10px 10px;
    height: 40px;
  }

  .roof {
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 10px 10px 0 0;
    height: 40px;
  }

  .w95p {
    width: 95%;
  }
`;

export default function Gallery() {
  return (
    <>
      <Wrapper>
        <div className="w95p">
          <div className="roof" />
          <SwiperComponent />
          <div className="floor" />
        </div>
      </Wrapper>
    </>
  );
}
