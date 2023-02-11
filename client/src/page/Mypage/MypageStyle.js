import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../Theme";

/** 전체 컨테이너 */
export const MypageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
/** 전체 컨테이너 안에 컨테이너 */
export const MypageTitle = styled.div`
  background-color: #f2f2f2;
  width: 1236px;
  margin: 120px 0 40px 0;
  height: 1000px;
  border-radius: 10px;
  @media screen and (max-width: 1336px) {
    height: 1200px;
    width: 90%;
  }
`;

export const MypageUser = styled.div`
  width: 340px;
  display: flex; // 애로 가로 정렬로 만듬
  font-size: 16px;
  margin-top: 3%;
  margin-left: 4.3%;

  @media screen and (max-width: 1336px) {
    margin-bottom: 20px;
  }
`;

/** Mypage 사진과 수정 정보들 */
export const MypageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0;

  @media screen and (max-width: 1070px) {
    /* flex-direction: column; */
    flex-wrap: wrap;
  }
  @media screen and (max-width: 865px) {
    flex-direction: column;
    /* flex-wrap: wrap; */
  }
`;

/** 프로필 사진 */
export const MypageProfile = styled.img`
  width: 130px;
  height: 130px;
  display: flex;
  margin-top: 8px;
  margin-bottom: 32px;
  border-radius: 10px;
  justify-content: center;
  background-color: #bfbfbf;
`;

/** 유저 정보들 */
export const MypageCenter = styled.div`
  width: 50%;
  @media screen and (max-width: 430px) {
    font-size: 14px;
  }
`;

/** 아이디 */
export const MypageText = styled.div`
  color: #686868;
  white-space: nowrap;
  font-size: ${theme.fontSizes.fs30};

  @media screen and (max-width: 430px) {
    white-space: nowrap;
    font-size: 24px;
    margin-top: 4px;
    padding-bottom: 22px;
  }
`;

/** 유저 기본 정보 */
export const MypageProfileInfo = styled.div`
  display: flex;
  color: #686868;
  margin-top: 32px;

  @media screen and (max-width: 540px) {
    white-space: nowrap;
  }
`;
export const MypageId = styled.div`
  margin-top: 4px;
  color: #686868;
  white-space: nowrap;
`;
export const MypageUserInfo = styled.div`
  @media screen and (max-width: 1336px) {
    white-space: nowrap;
  }
  @media screen and (max-width: 430px) {
    font-size: ${theme.fontSizes.fs12};
  }
`;
/** 회원정보 수정 */
export const MypageProfileModify = styled.a`
  height: 24px;
  /* border: none; */
  cursor: pointer;

  margin-right: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.main};
  &:hover {
    color: ${theme.colors.main_hover};
  }
`;
/** 회원 탈퇴 */
export const MypageDelete = styled.a`
  cursor: pointer;
  /* border: none; */
  text-decoration: none;
  color: ${({ theme }) => theme.colors.main};
  &:hover {
    color: ${theme.colors.main_hover};
  }
`;
export const MypageInfoA = styled.div`
  margin-left: 10px;
  width: 55%;
  @media screen and (max-width: 390px) {
    width: 41%;
  }
`;

export const PointContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-right: 40px;
  @media screen and (max-width: 1070px) {
    /* font-size: 14px; */
    margin-left: 40px;
  }
  @media screen and (max-width: 430px) {
    font-size: ${theme.fontSizes.fs12};
  }
`;

export const PointTitle = styled.div`
  /* flex-direction: column;   */
  @media screen and (max-width: 1100px) {
  }
`;

export const PointLevel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;
export const PointUserDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const PointModal = styled.div`
  display: flex;
  text-align: center;

  .ModalDiv {
    /* width: 100px; */
    font-size: 14px;
    padding: 10px;
    color: white;
    border-radius: 10px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: ${theme.colors.main};
    position: relative;
    display: inline-block;
    cursor: pointer;

    @media screen and (max-width: 1336px) {
      white-space: nowrap;
    }
    @media screen and (max-width: 430px) {
      width: 100px;
      text-align: center;
      white-space: nowrap;
      font-size: ${theme.fontSizes.fs12};
    }
  }
  // 호버시 나오는 내용
  .ModalDiv .ModalText {
    visibility: hidden;
    width: 200px;
    background-color: white;
    color: ${theme.colors.main};
    text-align: center;
    border-radius: 10px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 150%;
    left: 20%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 1s;
    text-align: center;

    border: 1px solid ${theme.colors.main};

    @media screen and (max-width: 1336px) {
      white-space: nowrap;
    }

    @media screen and (max-width: 430px) {
      width: 150px;
      left: 42%;
    }
  }

  .ModalDiv:hover .ModalText {
    visibility: visible;
    opacity: 1;
  }

  .ModalDiv .ModalText::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin: -60px 0 0 -10px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent ${theme.colors.main} transparent;
  }
  .ModalDiv:hover .ModalText {
    visibility: visible;
  }
`;

export const PointHover = styled.div`
  display: inline-block;
  width: 110px;
`;
/** 전체, 댓글, 북마크 버튼을 감싸는 큰 틀 */
export const MypageBtns = styled.div`
  width: 120px;
  margin-left: 5%;
  display: flex;

  .Btn {
    width: 120px;
    padding-right: 20px;
    @media screen and (max-width: 1336px) {
      width: 100%;
      display: flex;
    }
    @media screen and (max-width: 430px) {
      width: 60%;
    }
  }

  .submenu {
    width: 100px;
    height: 50px;
    border: none;
    cursor: pointer;

    border-radius: 10px;
    margin: 30px 0 0 0;
    text-align: center;
    color: ${theme.colors.white};
    background-color: #bfbfbf;
    font-size: ${theme.fontSizes.fs18};
    &:hover {
      background-color: #828282;
    }
    @media screen and (max-width: 430px) {
      width: 80px;
      height: 35px;
      white-space: nowrap;
      font-size: 14px;
    }
  }

  .focused {
    // 누른 것만 적용
    background-color: ${theme.colors.main};

    &:hover {
      background-color: ${theme.colors.main};
    }
  }
`;

/**  제목, 날짜 등등 정보들 감싸는 가장 큰틀*/
export const TitleContainer = styled.div`
  justify-content: center;
  display: flex;

  @media screen and (max-width: 1336px) {
    width: 100%;
  }
`;

/** 제목 날짜 등등 감싸는 큰 틀 안에 틀 */

export const TitleDiv = styled.div`
  width: 1120px;
  height: 562px;
  margin-top: 32px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  /*스크롤바 */
  overflow: auto;

  ::-webkit-scrollbar {
    /*스크롤바의 사이즈 */
    width: 8px;
    height: 220px;
  }
  /*스크롤바의 색상*/
  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.container};
    border-radius: 30px;

    &:hover {
      background-color: ${theme.colors.gray_01};
    }
  }

  @media screen and (max-width: 1336px) {
    width: 90%;
  }
`;

/** 내가 등록 한 정보를 나타내는 가장 큰 틀 */
export const InfoContainer = styled.div`
  border-bottom: 1px solid #939393;
  height: 90px;
  display: flex;
  align-items: center;
  padding: 0 6px;
`;

/** 등록 한 정보 나타내는  */
export const Info = styled.div`
  width: 40px;
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 3px 3px;

  @media screen and (max-width: 540px) {
    font-size: ${theme.fontSizes.fs12};
    white-space: nowrap;
  }
`;

/** 작성한 제목과 댓글 수 전체 창*/
export const InfoContent = styled.div`
  width: 650px;
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  display: flex;

  @media screen and (max-width: 1336px) {
    width: 50%;
  }
  @media screen and (max-width: 540px) {
    font-size: ${theme.fontSizes.fs12};
  }
`;

export const InfoTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
  cursor: pointer;
  @media screen and (max-width: 370px) {
  }
`;
/** 댓글 수 */
export const InfoComment = styled.span`
  color: ${({ theme }) => theme.colors.gray_03};
  margin-left: 8px;
`;

/** 내가 등록한 날짜*/
export const InfoDate = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1336px) {
    width: 20%;
    @media screen and (max-width: 540px) {
      font-size: ${theme.fontSizes.fs12};
      margin-right: 6px;
    }
  }
  .clock {
    padding: 7px 3px 0 0;
  }
`;
/** 내가 받은 조회수 */
export const InfoView = styled.div`
  width: 180px;
  color: #a67b48;

  text-align: center;

  .eye {
    margin-right: 5px;
  }
  @media screen and (max-width: 1336px) {
    width: 12%;
    @media screen and (max-width: 540px) {
      font-size: ${theme.fontSizes.fs12};
      margin-right: 6px;
      white-space: nowrap;
    }
  }
`;
/**  내가 받은 추천 수 */
export const InfoLike = styled.div`
  width: 180px;
  text-align: center;

  color: #95cecf;
  @media screen and (max-width: 1336px) {
    width: 8%;
  }
  @media screen and (max-width: 540px) {
    font-size: ${theme.fontSizes.fs12};
    margin-right: 6px;
    white-space: nowrap;
  }
  .disliked {
    margin-right: 5px;
  }
`;

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;
export const PointRemainContiner = styled.div`
  font-size: ${theme.fontSizes.fs18};
  margin-left: 10px;
  /* border: 2px solid red; */
  @media screen and (max-width: 1070px) {
    margin-right: 40px;
  }

  @media screen and (max-width: 430px) {
    font-size: 14px;
  }
  @media screen and (max-width: 370px) {
  }
`;
export const PointRemain = styled.div`
  display: flex;
  width: 350px;
  height: 40px;
  margin-top: 40px;
  align-items: center;
  justify-content: space-around;
  @media screen and (max-width: 900px) {
    padding-right: 52px;
  }
`;

export const PointLine = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  height: 50px;
  /* width: 80%; */
  align-items: flex-end;
  @media screen and (max-width: 865px) {
    width: 330px;
  }
  @media screen and (max-width: 410px) {
    width: 75%;
    margin-left: 15px;
  }
  @media screen and (max-width: 370px) {
    /* margin-right: 100px; */
  }
`;
export const FirstPoint = styled.div``;
export const LastPoint = styled.div``;
export const PointBar = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 865px) {
    width: 330px;
  }
  @media screen and (max-width: 370px) {
    /* margin-right: 20px; */
  }
  /* @media screen and (max-width: 865px) {
    width: 330px;
  } */
  .progress {
    height: 25px;
    width: 95%;
    display: flex;
    background-color: white;
    border: 1px solid ${theme.colors.main};

    @media screen and (max-width: 410px) {
      width: 75%;
      margin-right: 40px;
    }
  }
  .progress-bar {
    background-color: ${theme.colors.main};
  }
`;
