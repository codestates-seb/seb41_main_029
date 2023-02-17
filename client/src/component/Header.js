import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Cookies } from "react-cookie";
import { removeCookie } from "../Cookies";

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.path === "/" ? "rgba(0,0,0,0.3)" : "#ffffff"};
  border-bottom: ${(props) => (props.path === "/" ? "0" : "1px solid")};
  display: flex;
  height: 80px;
  margin-bottom: ${(props) => (props.path === "/" ? "-80px" : "0")};
  position: relative;
  width: 100%;
  z-index: 2;
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
  .tabletVer {
    display: none !important;
  }
  .ml-96 {
    margin-left: -96px;
  }
  .ml96 {
    margin-left: 96px;
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
  @media (max-width: 1336px) {
    display: flex;
    justify-content: center;
    .desktopVer {
      display: none;
    }
    .ml96 {
      margin-left: 0px;
    }
    .tabletVer {
      display: flex !important;
    }
    .ml96 {
      margin-left: 0px;
    }
  }
`;

const TabletMenu = styled.div`
  cursor: pointer;
  display: none;
  left: calc(100% - 68px);
  position: absolute;
  top: 24px;
  z-index: 3;
  svg:hover {
    color: #62b6b7;
  }
  @media (max-width: 1336px) {
    display: flex !important;
  }
`;

const MenuModal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-left: 1px solid;
  display: ${(props) => (props.open ? "flex" : "none")};
  height: 100vh;
  position: absolute;
  width: 100vw;
  z-index: 2;
  a {
    color: #331708;
    text-decoration: none;
  }
  a:hover {
    color: #62b6b7;
  }
  div {
    border-bottom: 1px solid #bdbdbd;
    font-size: ${(props) => props.theme.fontSizes.fs24};
    height: 80px;
    text-align: center;
  }
  .flex {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .landing {
    display: ${(props) => (props.path === "/" ? "block" : "none")};
  }
  .modals {
    background-color: #ffffff;
    height: 100vh;
    max-width: 320px;
    width: 50vw;
  }
  .modalout {
    height: 100vh;
    width: 100%;
  }
`;

export default function Header(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const menuClick = () => {
    if (modalOpen) {
      setModalOpen(false);
      document.body.style.cssText = `overflow: auto;`;
    } else {
      setModalOpen(true);
      document.body.style.cssText = `overflow: hidden;`;
    }
  };

  const modaloutClick = () => {
    setModalOpen(false);
  };

  const cookies = new Cookies();
  const token = cookies.get("token");

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    token ? setHasToken(true) : setHasToken(false);
  }, [token]);

  const logoutClick = () => {
    removeCookie("token");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  let userId = localStorage.getItem("userId");
  let isGuest = false;
  if (userId !== null) {
    userId = userId.substring(1, userId.length - 2);
    if (userId > 0 && userId < 1) {
      isGuest = true;
    }
  }

  return (
    <>
      <Wrapper path={window.location.pathname}>
        <div className="ml96">
          <a href="/">
            {window.location.pathname === "/" ? (
              <img
                src={process.env.PUBLIC_URL + "/image/LogoWhite.svg"}
                alt="logo"
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + "/image/Logo.svg"}
                alt="logo"
              />
            )}
          </a>
        </div>
        <div className="desktopVer ml96 va">
          <a href="/community">커뮤니티</a>
        </div>
        <div className="desktopVer ml96 va">
          <a href="/hikingmap">등산지도</a>
        </div>
        <div className="desktopVer ml96 va">
          <a href="/gallery">갤러리</a>
        </div>
        <div className="desktopVer ml96 va">
          <a href="/calendar">캘린더</a>
        </div>
        <div className="desktopVer spacing"></div>
        {hasToken ? (
          <>
            {isGuest ? (
              <></>
            ) : (
              <div className="desktopVer mr96 va">
                <a href="/mypage">마이페이지</a>
              </div>
            )}
            <div className="desktopVer mr96 va">
              <a href="/" onClick={logoutClick}>
                로그아웃
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="desktopVer mr96 va">
              <a href="/login">
                <a href="/login">로그인</a>
              </a>
            </div>
            <div className="desktopVer mr96 va">
              <a href="/signup">회원가입</a>
            </div>
          </>
        )}
      </Wrapper>
      <TabletMenu onClick={menuClick} path={window.location.pathname}>
        {window.location.pathname === "/" ? (
          <FontAwesomeIcon
            icon={faBars}
            color={modalOpen ? "#000000" : "#ffffff"}
            size="2xl"
          />
        ) : (
          <FontAwesomeIcon icon={faBars} color="#331708" size="2xl" />
        )}
      </TabletMenu>
      <MenuModal open={modalOpen} path={window.location.pathname}>
        <div className="modalout" onClick={modaloutClick} />
        <div className="modals">
          <div className="landing" />
          <div className="flex">
            <a href="/community">커뮤니티</a>
          </div>
          <div className="flex">
            <a href="/hikingmap">등산지도</a>
          </div>
          <div className="flex">
            <a href="/gallery">갤러리</a>
          </div>
          <div className="flex">
            <a href="/calendar">캘린더</a>
          </div>
          {hasToken ? (
            <>
              {isGuest ? (
                <></>
              ) : (
                <div className="flex">
                  <a href="/mypage">마이페이지</a>
                </div>
              )}
              <div className="flex">
                <a href="/" onClick={logoutClick}>
                  로그아웃
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="flex">
                <a href="/login">로그인</a>
              </div>
              <div className="flex">
                <a href="/signup">회원가입</a>
              </div>
            </>
          )}
        </div>
      </MenuModal>
    </>
  );
}
