import { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;
// Kakao 지도 api를 스트립트로 심어서 가져왔기 때문에 window 전역 객체에 들어가있음
// 그래서 함수형 컴포넌트에서는 바로 인식할 수 없기 때문에 따로 window에 있다고 선언을 해줘야 함
// 그렇지 않으면 하단에 지도를 띄우는 코드에서 'kakao' is not undefined 오류 발생

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: calc(100vh - 160px);
  justify-content: center;
  #info {
    border-left: 1px solid;
    border-radius: 10px;
    border-right: 1px solid;
    background-color: #ffffff;
    height: 720px;
    margin-right: -256px;
    width: 256px;
    z-index: 2;
  }
  #map {
    border-radius: 10px;
    border: 1px solid;
    height: 720px;
    width: 1280px;
  }
  .button {
    background-color: #62b6b7;
    border-radius: 10px;
    border: 1px solid;
    color: #ffffff;
    font-size: ${(props) => props.theme.fontSizes.fs16};
    margin: 30px;
    z-index: 3;
  }
`;

export default function HikingMap() {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.49654994743686, 127.02474004349381), //지도의 중심좌표. 필수 조건임!. LatLng 클래스를 사용하며 위도 경도 좌표의 값을 사용함
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴. 지도를 생성할 div와 지도 옵션을 전달 인자로 제공
  });

  return (
    <Wrapper>
      <div id="info">
        <button className="button">지리산</button>
      </div>
      <div id="map" />
      {/* 지도를 담기 위한 영역. 실제 지도를 그리는 JS API는 public/index.html에 script로 삽입되어 있음! */}
    </Wrapper>
  );
}
