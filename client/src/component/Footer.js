import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Wrapper = styled.div`
  background-color: #010409;
  color: #6e7681;
  display: flex;
  font-weight: bold;
  height: 160px;
  margin-top: ${(props) =>
    props.path === "/" || props.path === "/hikingmap" ? "0" : "120px"};
  justify-content: space-around;
  a {
    color: #6e7681;
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

// 푸터 디자인 전반적으로 교체
// 푸터 밑에 고정(푸터에서 처리하거나 페이지에서 처리하거나)
export default function Footer() {
  return (
    <Wrapper path={window.location.pathname}>
      <div className="va">
        <div>Front-end</div>
        <div>
          노수혁 <FontAwesomeIcon icon={faGithub} />
        </div>
        <div>
          박승철 <FontAwesomeIcon icon={faGithub} />
        </div>
        <div>
          박한나 <FontAwesomeIcon icon={faGithub} />
        </div>
        <div>
          우성윤{" "}
          <a href="https://github.com/sywoo0109">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
      <div className="va">
        <div>Back-end</div>
        <div>
          박민우 <FontAwesomeIcon icon={faGithub} />
        </div>
        <div>
          박정한울 <FontAwesomeIcon icon={faGithub} />
        </div>
        <div>
          장현준 <FontAwesomeIcon icon={faGithub} />
        </div>
      </div>
    </Wrapper>
  );
}
