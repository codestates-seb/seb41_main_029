import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import theme from "../../Theme";
import { Cookies } from "react-cookie";
import { getBookmark, getComment, getUser, getWrite } from "../../api/userAPI";
import ReactPaginate from "react-paginate";
import { getCookie } from "../../Cookies";
import { ViewdateCommu } from "../../component/DateCalculator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
/** 전체 컨테이너 */
const MypageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
/** 전체 컨테이너 안에 컨테이너 */
const MypageTitle = styled.div`
  background-color: #f2f2f2;
  width: ${({ theme }) => theme.deviceSizes.tablet};
  margin: 200px 0 200px 0;
  height: 1000px;
  /* min-width: 500px; */

  @media screen and (max-width: 1336px) {
    width: 100%;
  }
`;
/** Mypage 사진과 수정 정보들 */
const MypageInfo = styled.div`
  width: 100%;
  height: 250px;
  border-bottom: 1.5px solid #939393;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1336px) {
    width: 100%;
  }
`;

/** 프로필 사진 */
const MypageProfile = styled.img`
  width: 130px;
  height: 130px;
  display: flex;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  margin: 44px 0 0 4%;
  justify-content: center;
  background-color: #bfbfbf;

  @media screen and (max-width: 1336px) {
    width: 10%;
    min-width: 100px;
  }
  @media screen and (max-width: 500px) {
    margin-right: 10px;
  }
`;
// const MypageImg = styled.img`
//   width: 150px;
// `;

/** 유저 기본 정보 */
const MypageProfileInfo = styled.div`
  display: flex;
  /* margin-right: 40px; */
  align-items: center;
  width: 147px;

  @media screen and (max-width: 1336px) {
    white-space: nowrap;
  }
`;
/** 회원정보 수정 */
const MypageProfileModify = styled.a`
  height: 24px;
  border: none;
  cursor: pointer;
  margin-right: 28px;
  padding-right: 30px;
  padding-top: 40px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  @media screen and (max-width: 540px) {
    width: 140px;
    padding-right: 0;
    display: flex;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    font-size: ${theme.fontSizes.fs12};
  }
`;
/** 전체, 댓글, 북마크 버튼을 감싸는 큰 틀 */
const MypageBtns = styled.div`
  width: 120px;
  margin-left: 4%;

  /* position: relative;
  left: 60px; */
  display: flex;
  /* padding-left: 30px; */

  .Btn {
    width: 120px;
    padding-right: 20px;
    @media screen and (max-width: 1336px) {
      width: 100%;
      display: flex;
    }
    @media screen and (max-width: 400px) {
      width: 55%;
      display: flex;
    }
  }
  /** 작성,댓글 북마크 버튼 */
  // 다 적용

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
    @media screen and (max-width: 1336px) {
      width: 100px;
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
const TitleContainer = styled.div`
  justify-content: center;
  display: flex;
  @media screen and (max-width: 1336px) {
    width: 100%;
  }
`;

/** 제목 날짜 등등 감싸는 큰 틀 안에 틀 */
// 스크롤 부분
const TitleDiv = styled.div`
  width: 1219px;
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
  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.container}; /*스크롤바의 색상*/
    border-radius: 30px;

    &:hover {
      background-color: ${theme.colors.gray_01};
    }
  }

  ::-webkit-scrollbar-track {
    /* background-color: red; 스크롤바 트랙 색상 */
  }
  @media screen and (max-width: 1336px) {
    width: 90%;
  }
`;

/** 제목 날짜 감싸는 바로 위의 틀 */
const TitleInfo = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  text-align: center;

  justify-content: center;
  border-bottom: 1px solid #939393;

  /* @media screen and (max-width: 1336px) {
    width: 90%;
  } */
`;

/** 제목 */
const TitleContent = styled.div`
  width: 650px;
`;

/** 날짜 닉네임 */
const TitleDate = styled.div`
  width: 150px;
  /* width: 100%; */
  text-align: center;
  border-left: 1px solid #000;
  @media screen and (max-width: 600px) {
    white-space: nowrap;
  }
`;

/** 조회, 추천*/
const TitleDateMini = styled.div`
  width: 110px;
  /* width: 100%; */
  text-align: center;
  border-left: 1px solid #000;
  @media screen and (max-width: 550px) {
    white-space: nowrap;
  }
`;

/** 내가 등록 한 정보를 나타내는 가장 큰 틀 */
const InfoContainer = styled.div`
  border-bottom: 1px solid #939393;
  height: 90px; // 원래는 120px
  display: flex;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 1336px) {
    /* width: 10%; */
  }

  /* justify-content: center; */
`;
/** 등록 한 정보 감싸는 두번째 틀 */
const InfoIcon = styled.div`
  width: 60px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

/** 등록 한 정보 나타내는  */
const Info = styled.div`
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
const InfoContent = styled.div`
  width: 650px; // or 100 %
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  display: flex;

  @media screen and (max-width: 1336px) {
    width: 50%;
  }
  @media screen and (max-width: 540px) {
    font-size: ${theme.fontSizes.fs12};
  }
`;

const InfoTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
  cursor: pointer;
`;
/** 댓글 수 */
const InfoComment = styled.span`
  color: ${({ theme }) => theme.colors.gray_03};
  margin-left: 8px;

  /* @media screen and (max-width: 1336px) {
    padding-right: 12px;
  } */
`;
/** 작성한 날짜 조회 추천 나오는 전체 틀 */
const InfoDiv = styled.div`
  /* width: 700px; */
  display: flex;
  justify-content: right;
`;
// 작업 할것은 날짜 조회 재가 적은 것들을 반응형을 100%로 고정해보자
/** 내가 등록한 날짜*/
const InfoDate = styled.div`
  /* width: 150px; */
  width: 200px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1336px) {
    width: 20%;
    @media screen and (max-width: 540px) {
      font-size: ${theme.fontSizes.fs12};
    }
  }
  .clock {
    padding: 7px 3px 0 0;
  }
`;
/** 내가 받은 조회수 */
const InfoView = styled.div`
  /* width: 120px; */
  width: 180px;
  color: #a67b48;

  text-align: center;

  .eye {
    /* padding-right: 8px; */
    margin-right: 5px;
  }
  @media screen and (max-width: 1336px) {
    width: 12%;
    @media screen and (max-width: 540px) {
      font-size: ${theme.fontSizes.fs12};
    }
  }
`;
/**  내가 받은 추천 수 */
const InfoLike = styled.div`
  /* width: 120px; */
  width: 180px;
  text-align: center;
  color: #95cecf;
  @media screen and (max-width: 1336px) {
    width: 8%;
  }
  @media screen and (max-width: 540px) {
    font-size: ${theme.fontSizes.fs12};
  }
`;
/** 나의 닉네임*/
const InfoName = styled.div`
  width: 120px;
  text-align: center;
  @media screen and (max-width: 1336px) {
    width: 13%;
  }
  @media screen and (max-width: 540px) {
    font-size: ${theme.fontSizes.fs12};
  }
`;
const MyPaginate = styled(ReactPaginate).attrs({
  // You can redefine classes here, if you want.
  activeClassName: "active", // default to "selected"
})`
  margin: 50px 16px;
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem;
  border: 2px solid red;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    cursor: pointer;
  }
  li.previous a,
  li.next a {
    color: #62b6b7;
  }
  li.active a {
    /* background-color: #62b6b7;
    color: white; */
    color: #91cccd;
    font-weight: 700;
    min-width: 32px;
  }
  li.disabled a {
    color: ${({ theme }) => theme.colors.gray_03};
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default function MyPage() {
  const cookie = new Cookies();
  const Token = cookie.get("token");

  const [userInfo, setUserInfo] = useState([]);
  const [userWrite, setUserWrite] = useState([]);
  const [userComment, setUserComment] = useState([]);
  const [userBook, setUserBook] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      const res = await getUser(Token);
      setUserInfo(res.data.body.user);
    }
    getUserInfo();
  }, []);
  console.log(userInfo);

  useEffect(() => {
    async function getUserWrite() {
      const res = await getWrite(Token);
      setUserWrite(res.data.body.write); // write
      console.log(res.data.body);
    }
    getUserWrite();
  }, []);
  console.log(userWrite);

  useEffect(() => {
    async function getUserComment() {
      const res = await getComment(Token);
      setUserComment(res.data.body.comment);
    }
    getUserComment();
  }, []);
  console.log(userComment);

  useEffect(() => {
    async function getUserBookmark() {
      const res = await getBookmark(Token);
      setUserBook(res.data.body.bookmark);
    }
    getUserBookmark();
  }, []);
  console.log(userBook);

  const [loading, setLoading] = useState(false);

  const [current, setCurrent] = useState(0);
  const munuArr = [{ name: "작성글" }, { name: "댓글" }, { name: "북마크" }];
  const limit = 15;

  const currentClick = (index) => {
    setCurrent(index);
  };
  console.log(current);

  return (
    <>
      {Token !== undefined ? (
        <MypageContainer>
          <MypageTitle>
            <MypageInfo>
              <MypageProfile src={userInfo?.profileImageUrl}></MypageProfile>
              <MypageProfileInfo>
                {/* 유저 기본 정보 */}
                {userInfo?.username}
              </MypageProfileInfo>
              <MypageProfileModify href="mypageEdit">
                회원정보 수정
              </MypageProfileModify>
            </MypageInfo>
            <MypageBtns>
              {munuArr.map((ele, index) => {
                return (
                  <div className="Btn">
                    <button
                      key={index}
                      className={
                        current === index ? "submenu focused" : "submenu"
                      }
                      onClick={() => currentClick(index)}
                    >
                      {ele.name}
                    </button>
                  </div>
                );
              })}
            </MypageBtns>
            <TitleContainer>
              <TitleDiv>
                {/* <TitleInfo>
                  <TitleContent>제목</TitleContent>
                  <TitleDate>날짜</TitleDate>
                  <TitleDateMini>
                    {current === 1 ? "좋아요" : "조회"}
                  </TitleDateMini>
                  <TitleDateMini>
                    {current === 1 ? "싫어요" : "추천"}
                  </TitleDateMini>
                  <TitleDate>닉네임</TitleDate>
                </TitleInfo> */}
                {userWrite.map((item, id) =>
                  // {test.map((item, id) =>
                  current === 0 ? (
                    <InfoContainer key={item.boardSeq}>
                      {/* <InfoIcon> */}
                      {item.category === "# 일반" ? (
                        <Info bgColor="#62B6B7">일반</Info>
                      ) : (
                        ""
                      )}
                      {item.category === "# 정보" ? (
                        <Info bgColor="#AEDC88">정보</Info>
                      ) : (
                        ""
                      )}
                      {item.category === "# 질문" ? (
                        <Info bgColor="#A6D9DE">질문</Info>
                      ) : (
                        ""
                      )}
                      {/* </InfoIcon> */}
                      <InfoContent>
                        <InfoTitle>
                          <StyledLink to={`/boards/${item.boardSeq}`}>
                            {item.title}
                          </StyledLink>
                        </InfoTitle>
                        <InfoComment>[{item.commented}]</InfoComment>
                      </InfoContent>
                      {/* <InfoDiv> */}
                      <InfoDate>
                        <FontAwesomeIcon
                          icon={faClock}
                          size="xs"
                          className="clock"
                        />
                        <ViewdateCommu createdAt={item.createdAt} />
                      </InfoDate>
                      <InfoView>
                        <FontAwesomeIcon
                          icon={faEye}
                          size="xs"
                          className="eye"
                        />
                        {item.viewCount}
                      </InfoView>
                      <InfoLike>
                        <FontAwesomeIcon icon={faHeart} size="xs" />{" "}
                        {item.liked}
                      </InfoLike>
                      {/* <InfoName>{item.username}</InfoName> */}
                      {/* </InfoDiv> */}
                    </InfoContainer>
                  ) : (
                    ""
                  )
                )}
                {userComment.map((item, id) =>
                  current === 1 ? (
                    <InfoContainer key={item.boardSeq}>
                      {/* <InfoIcon> */}
                      <Info bgColor="#62B6B7">댓글</Info>
                      {/* </InfoIcon> */}
                      <InfoContent>
                        <InfoTitle>
                          <StyledLink to={`/boards/${item.boardSeq}`}>
                            {item.content}
                          </StyledLink>
                        </InfoTitle>
                        <InfoComment>{item.commented}</InfoComment>
                      </InfoContent>
                      {/* <InfoDiv> */}
                      <InfoDate>
                        <FontAwesomeIcon
                          icon={faClock}
                          size="xs"
                          className="clock"
                        />
                        <ViewdateCommu createdAt={item.createdAt} />
                      </InfoDate>
                      <InfoView>
                        <img
                          className="up"
                          src={process.env.PUBLIC_URL + "/image/upVote.svg"}
                          alt="Up"
                          width="22px"
                        />
                        {item.liked}
                      </InfoView>
                      <InfoLike>
                        <img
                          src={process.env.PUBLIC_URL + "/image/downVote.svg"}
                          className="down"
                          alt="Down"
                          width="18px"
                          height="18px"
                        />
                        {item.disliked}
                      </InfoLike>
                      {/* <InfoName>{item.username}</InfoName> */}

                      {/* </InfoDiv> */}
                    </InfoContainer>
                  ) : (
                    ""
                  )
                )}
                {userBook.map((item, id) =>
                  current === 2 ? (
                    <InfoContainer key={item.boardSeq}>
                      {/* <InfoIcon> */}
                      {item.category === "# 일반" ? (
                        <Info bgColor="#62B6B7">일반</Info>
                      ) : (
                        ""
                      )}
                      {item.category === "# 정보" ? (
                        <Info bgColor="#AEDC88">정보</Info>
                      ) : (
                        ""
                      )}
                      {item.category === "# 질문" ? (
                        <Info bgColor="#A6D9DE">질문</Info>
                      ) : (
                        ""
                      )}
                      {/* </InfoIcon> */}
                      <InfoContent>
                        <InfoTitle>
                          <StyledLink to={`/boards/${item.boardSeq}`}>
                            {item.title}
                          </StyledLink>
                        </InfoTitle>
                        <InfoComment>[{item.commented}]</InfoComment>
                      </InfoContent>
                      {/* <InfoDiv> */}
                      <InfoDate>
                        <FontAwesomeIcon
                          icon={faClock}
                          size="xs"
                          className="clock"
                        />
                        <ViewdateCommu createdAt={item.createdAt} />
                      </InfoDate>
                      <InfoView>
                        <FontAwesomeIcon icon={faEye} size="xs" />
                        {item.viewCount}
                      </InfoView>
                      <InfoLike>
                        <FontAwesomeIcon icon={faHeart} size="xs" />{" "}
                        {item.liked}
                      </InfoLike>
                      {/* <InfoName>{item.username}</InfoName> */}

                      {/* </InfoDiv> */}
                    </InfoContainer>
                  ) : (
                    ""
                  )
                )}
              </TitleDiv>
            </TitleContainer>
          </MypageTitle>
        </MypageContainer>
      ) : (
        <>
          {alert("로그인이 되어 있지 않습니다!")}
          <Navigate to="/login" />
        </>
      )}
    </>
  );
}
