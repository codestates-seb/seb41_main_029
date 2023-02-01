import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  iframe {
    height: calc(100vh - 80px);
    max-width: 1920px;
    width: 100%;
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
