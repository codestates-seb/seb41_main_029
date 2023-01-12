import styled from "styled-components";

const Wrapper = styled.div`
  border-top: 1px solid;
  display: flex;
  height: 80px;
  justify-content: center;
  }
  div {
    font-size: ${(props) => props.theme.fontSizes.fs18};
  }
  .mr96 {
    margin-right: 96px;
  }
  .va {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <div className="va mr96">서비스 이름</div>
      <div className="va mr96">
        <div>고객센터 | mountain1234@gamil.com</div>
        <div>전화번호 | 010-1234-5678</div>
      </div>
      <div className="va">
        <div>
          대표자 | 우성윤, 박민우, 노수혁, 박승철, 박정한울, 박한나, 장현준
        </div>
        <div>
          주&nbsp;&nbsp;&nbsp;&nbsp;소 | 서울특별시 서초구 서초대로 396,
          강남빌딩 20층 (코드스테이츠)
        </div>
      </div>
    </Wrapper>
  );
}
