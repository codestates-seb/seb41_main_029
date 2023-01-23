import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  iframe {
    max-width: 100%;
    height: 920px;
    width: 1920px;
  }
  .hidden {
    display: none;
  }
`;

export default function HikingMap() {
  return (
    <Wrapper>
      <div className="hidden">
        {(document.body.style.cssText = `overflow: hidden;`)}
      </div>
      <iframe src="https://map.forest.go.kr/forest/?systype=mapSearch&searchOption=trail" />
    </Wrapper>
  );
}
