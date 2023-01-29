import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Wrapper = styled.div`
  background-color: #010409;
  color: #6e7681;
  display: ${(props) => (props.path === "/hikingmap" ? "none" : "flex")};
  font-weight: bold;
  height: 80px;
  margin-top: ${(props) => (props.path === "/" ? "0" : "120px")};
  justify-content: space-around;
  a {
    color: #6e7681;
  }
  div {
    font-size: ${(props) => props.theme.fontSizes.fs18};
  }
  .fdr {
    display: flex;
    flex-direction: row;
  }
  .flex {
    display: flex;
  }
  .mr96 {
    margin-right: 96px;
  }
  .space {
    margin-right: 10px;
  }
  .va {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  @media (max-width: 600px) {
    div {
      font-size: ${(props) => props.theme.fontSizes.fs10};
    }
  }
`;

// 푸터 디자인 전반적으로 교체
// 푸터 밑에 고정(푸터에서 처리하거나 페이지에서 처리하거나)
export default function Footer() {
  return (
    <Wrapper path={window.location.pathname}>
      <div className="va">
        <div>
          Repository{" "}
          <a href="https://github.com/codestates-seb/seb41_main_029">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
        <div>
          Demo Video{" "}
          <a href="https://www.youtube.com/">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
      <div className="va">
        <div className="flex">
          <div className="space">Front-end </div>
          <div className="space">
            노수혁{" "}
            <a href="https://github.com/rohsuhyoek">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <div className="space">
            박승철{" "}
            <a href="https://github.com/DPDPO">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <div className="space">
            박한나{" "}
            <a href="https://github.com/hannaax">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <div>
            우성윤{" "}
            <a href="https://github.com/sywoo0109">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
        <div className="flex">
          <div className="space">Back-end </div>
          <div className="space">
            박민우{" "}
            <a href="https://github.com/MWJOB">
              <FontAwesomeIcon icon={faGithub} />
            </a>{" "}
          </div>
          <div className="space">
            박정한울{" "}
            <a href="https://github.com/Hanul01">
              <FontAwesomeIcon icon={faGithub} />
            </a>{" "}
          </div>
          <div>
            장현준{" "}
            <a href="https://github.com/tty0912">
              <FontAwesomeIcon icon={faGithub} />
            </a>{" "}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
