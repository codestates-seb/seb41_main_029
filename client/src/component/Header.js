import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.path === "/" ? "rgba(0,0,0,0.3)" : "#ffffff"};
  border-bottom: ${(props) => (props.path === "/" ? "none" : "1px solid")};
  display: flex;
  height: 80px;
  margin-bottom: ${(props) => (props.path === "/" ? "-80px" : "0")};
  position: relative;
  width: 100%;
  z-index: 1000;
  a {
    color: ${(props) => (props.path === "/" ? "#ffffff" : "#331708")};
    text-decoration: none;
  }
  a:hover {
    color: #62b6b7;
  }
  div {
    font-size: ${(props) => props.theme.fontSizes.fs24};
  }
  .ml192 {
    margin-left: 192px;
  }
  .ml96 {
    margin-left: 96px;
  }
  .mr192 {
    margin-right: 192px;
  }
  .mr96 {
    margin-right: 96px;
  }
  .spacing {
    flex: 1;
  }
  .va {
    align-items: center;
    display: flex;
  }
`;

const login = false;

export default function Header() {
  return (
    <Wrapper path={window.location.pathname}>
      <div className="ml192">
        <a href="/">
          {window.location.pathname === "/" ? (
            <img
              src={process.env.PUBLIC_URL + "/image/LogoWhite.svg"}
              alt="logo"
            />
          ) : (
            <img src={process.env.PUBLIC_URL + "/image/Logo.svg"} alt="logo" />
          )}
        </a>
      </div>
      <div className="ml96 va">
        <a href="community">커뮤니티</a>
      </div>
      <div className="ml96 va">
        <a href="hikingmap">등산지도</a>
      </div>
      <div className="spacing"></div>
      {login ? (
        <>
          <div className="mr96 va">
            <a href="mypage">
              <FontAwesomeIcon icon={faUser} />
            </a>
          </div>
          <div className="mr192 va">
            <a href="/">로그아웃</a>
          </div>
        </>
      ) : (
        <>
          <div className="mr96 va">
            <a href="login">
              <a href="login">로그인</a>
            </a>
          </div>
          <div className="mr192 va">
            <a href="signup">회원가입</a>
          </div>
        </>
      )}
    </Wrapper>
  );
}
