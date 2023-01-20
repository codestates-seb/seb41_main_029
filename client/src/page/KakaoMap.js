import { useEffect } from "react";
import styled from "styled-components";

// 다음 post code
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
`;

export default function KakaoMap() {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(36.2683, 127.6358), //지도의 중심좌표. 필수 조건임!. LatLng 클래스를 사용하며 위도 경도 좌표의 값을 사용함
      level: 13, //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴. 지도를 생성할 div와 지도 옵션을 전달 인자로 제공

    const mapTypeControl = new kakao.maps.MapTypeControl(); // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    const zoomControl = new kakao.maps.ZoomControl(); // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성

    // 지도에 컨트롤을 추가해서 지도 위에 표시
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의. TOPRIGHT는 오른쪽 위가 되는 방식
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커를 표시할 위치와 title 객체 배열
    const positions = [
      {
        content:
          '<div style="padding:5px;">설악산 <br><a href=http://kko.to/nd-_RqVVlH style="color:blue" target="_blank">카카오맵 링크</a>', // 인포윈도우에 출력될 내용. HTML 문자열이나 document element 사용 가능
        latlng: new kakao.maps.LatLng(38.14727490568634, 128.39362275461093), // 마커가 표시될 위치를 설정
      },
      {
        content:
          '<div style="padding:5px;">지리산 <br><a href=http://kko.to/hE8qCaMDr7 style="color:blue" target="_blank">카카오맵 링크</a>',
        latlng: new kakao.maps.LatLng(35.326212676970485, 127.63827313004481),
      },
      {
        content:
          '<div style="padding:5px;">한라산 <br><a href=http://kko.to/95F7Ogd8qQ style="color:blue" target="_blank">카카오맵 링크</a>',
        latlng: new kakao.maps.LatLng(33.376401692557444, 126.54352692445966),
      },
      {
        content:
          '<div style="padding:5px;">계방산 <br><a href=http://kko.to/_nv0FZrdxo style="color:blue" target="_blank">카카오맵 링크</a>',
        latlng: new kakao.maps.LatLng(37.72723944372565, 128.46592720174195),
      },
      {
        content:
          '<div style="padding:5px;">함백산 <br><a href=http://kko.to/_YElxSd_Ln style="color:blue" target="_blank">카카오맵 링크</a>',
        latlng: new kakao.maps.LatLng(37.16111827546252, 128.91763788108253),
      },
    ];

    for (let i = 0; i < positions.length; i++) {
      // 마커를 생성
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
      });

      // 인포윈도우를 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content,
        removable: true, // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 바로 표시됨 주의!
        infowindow.open(map, marker);
      });
    }
  }, []);

  return (
    <Wrapper>
      <div id="map" />
      {/* 지도를 담기 위한 영역. 실제 지도를 그리는 JS API는 public/index.html에 script로 삽입되어 있음! */}
    </Wrapper>
  );
}
