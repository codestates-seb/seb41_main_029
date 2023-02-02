import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "../../Theme";
import { Cookies } from "react-cookie";
import { getBookmark, getComment, getUser, getWrite } from "../../api/userAPI";
import NotFound, { GuestNotFound } from "../NotFound";
import { getCookie, removeCookie } from "../../Cookies";
import { ModifiedDate, ViewdateCommu } from "../../component/DateCalculator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon11,
  Icon12,
  Icon13,
  Icon14,
  Icon15,
  Icon16,
} from "../../component/UserIcon";
/** 전체 컨테이너 */
const MypageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
/** 전체 컨테이너 안에 컨테이너 */
const MypageTitle = styled.div`
  background-color: #f2f2f2;
  width: 1236px;
  margin: 120px 0 40px 0;
  height: 1000px;
  border-radius: 10px;
  @media screen and (max-width: 1336px) {
    height: 1100px;
    width: 90%;
  }
`;
const MypageUser = styled.div`
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
const MypageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0;

  @media screen and (max-width: 730px) {
    flex-direction: column;
  }
`;

/** 프로필 사진 */
const MypageProfile = styled.img`
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
const MypageCenter = styled.div`
  width: 50%;
  @media screen and (max-width: 430px) {
    font-size: 14px;
  }
`;

/** 아이디 */
const MypageText = styled.div`
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
const MypageProfileInfo = styled.div`
  display: flex;
  color: #686868;
  margin-top: 32px;

  @media screen and (max-width: 540px) {
    white-space: nowrap;
  }
`;
const MypageId = styled.div`
  margin-top: 4px;
  color: #686868;
  white-space: nowrap;
`;
const MypageUserInfo = styled.div`
  @media screen and (max-width: 1336px) {
    white-space: nowrap;
  }
  @media screen and (max-width: 430px) {
    font-size: ${theme.fontSizes.fs12};
  }
`;
/** 회원정보 수정 */
const MypageProfileModify = styled.a`
  height: 24px;
  border: none;
  cursor: pointer;

  margin-right: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.main};
  &:hover {
    color: ${theme.colors.main_hover};
  }
`;
/** 회원 탈퇴 */
const MypageDelete = styled.a`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.main};
  &:hover {
    color: ${theme.colors.main_hover};
  }
`;
const MypageInfoA = styled.div`
  margin-left: 10px;
  width: 55%;
  @media screen and (max-width: 390px) {
    width: 41%;
  }
`;

const PointContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-right: 40px;
  @media screen and (max-width: 730px) {
    justify-content: center;
    font-size: 14px;
    margin-left: 36px;
  }
  @media screen and (max-width: 430px) {
    font-size: ${theme.fontSizes.fs12};
  }
`;

const PointTitle = styled.div`
  /* width: 558px; */
  /* height: 140px; */
`;

const PointLevel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;
const PointUserDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const PointModal = styled.div`
  display: flex;
  text-align: center;

  .ModalDiv {
    width: 100px;
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

    @media screen and (max-width: 430px) {
      width: 80px;
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

const PointHover = styled.div`
  display: inline-block;
  width: 110px;
`;
/** 전체, 댓글, 북마크 버튼을 감싸는 큰 틀 */
const MypageBtns = styled.div`
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
const TitleContainer = styled.div`
  justify-content: center;
  display: flex;

  @media screen and (max-width: 1336px) {
    width: 100%;
  }
`;

/** 제목 날짜 등등 감싸는 큰 틀 안에 틀 */

const TitleDiv = styled.div`
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
const InfoContainer = styled.div`
  border-bottom: 1px solid #939393;
  height: 90px;
  display: flex;
  align-items: center;
  padding: 0 6px;
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

const InfoTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
  cursor: pointer;
  @media screen and (max-width: 370px) {
  }
`;
/** 댓글 수 */
const InfoComment = styled.span`
  color: ${({ theme }) => theme.colors.gray_03};
  margin-left: 8px;
`;

/** 내가 등록한 날짜*/
const InfoDate = styled.div`
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
const InfoView = styled.div`
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
const InfoLike = styled.div`
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

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default function MyPage() {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  const [userWrite, setUserWrite] = useState([]);
  const [userComment, setUserComment] = useState([]);
  const [userBook, setUserBook] = useState([]);
  const [current, setCurrent] = useState(0);

  const munuArr = [{ name: "작성글" }, { name: "댓글" }, { name: "북마크" }];
  useEffect(() => {
    async function getUserInfo() {
      const res = await getUser(Token);
      setUserInfo(res.data.body.user);
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    async function getUserWrite() {
      const res = await getWrite(Token);
      setUserWrite(res.data.body.write);
    }
    getUserWrite();
  }, []);

  useEffect(() => {
    async function getUserComment() {
      const res = await getComment(Token);
      setUserComment(res.data.body.comment);
    }
    getUserComment();
  }, []);

  useEffect(() => {
    async function getUserBookmark() {
      const res = await getBookmark(Token);
      setUserBook(res.data.body.bookmark);
    }
    getUserBookmark();
  }, []);

  const DeleteClice = async () => {
    if (window.confirm("정말 회원 탈퇴 하시겠습니까?") === false) {
      alert("취소 되었습니다.");
    } else {
      await axios
        .delete(
          "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users",
          {
            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        )
        .then((res) => {
          alert("이용해 주셔서 감사합니다.");
          removeCookie("token");
          localStorage.removeItem("userId");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {});
    }
  };

  const currentClick = (index) => {
    setCurrent(index);
  };

  return (
    <>
      {userInfo?.roleType === "GUEST" ? (
        <>
          <GuestNotFound></GuestNotFound>
        </>
      ) : (
        <>
          {Token !== undefined ? (
            <MypageContainer>
              <MypageTitle>
                <MypageInfo>
                  <MypageUser>
                    <MypageInfoA>
                      <MypageProfile
                        src={userInfo?.profileImageUrl}
                      ></MypageProfile>
                      <MypageUserInfo>
                        <MypageProfileModify href="mypageEdit">
                          개인정보 수정
                        </MypageProfileModify>
                        <MypageDelete onClick={DeleteClice}>
                          회원 탈퇴
                        </MypageDelete>
                      </MypageUserInfo>
                    </MypageInfoA>
                    <MypageCenter>
                      <MypageText> {userInfo.username} 님</MypageText>
                      <MypageProfileInfo>
                        가입 날짜 :
                        <ModifiedDate modifiedAt={userInfo.modifiedAt} />
                      </MypageProfileInfo>
                      <MypageId>아이디 : {userInfo.userId}</MypageId>
                    </MypageCenter>
                  </MypageUser>
                  <PointContainer>
                    <PointTitle>
                      <PointLevel>
                        나의 등급
                        {userInfo.point <= 30 ? (
                          <Icon1 />
                        ) : "" ||
                          (31 <= userInfo.point && userInfo.point <= 60) ? (
                          <Icon2 />
                        ) : "" ||
                          (61 <= userInfo.point && userInfo.point <= 100) ? (
                          <Icon3 />
                        ) : "" ||
                          (101 <= userInfo.point && userInfo.point <= 200) ? (
                          <Icon4 />
                        ) : "" ||
                          (201 <= userInfo.point && userInfo.point <= 300) ? (
                          <Icon5 />
                        ) : "" || 301 <= userInfo.point ? (
                          <Icon6 />
                        ) : (
                          ""
                        )}
                      </PointLevel>

                      <PointUserDiv>
                        나의 포인트 : {userInfo.point} 점
                      </PointUserDiv>
                      <PointModal>
                        <div className="ModalDiv">
                          포인트 획득 방법
                          <div className="ModalText">
                            글 작성 시 +5 <br /> 글 추천 시 +5
                            <br />글 비추천 시 -1 <br />
                            북마크 시 +10 <br />
                            댓글 추천 시 +1
                            <br />
                            댓글 비추천 시 -1
                          </div>
                        </div>

                        <div className="ModalDiv">
                          멤버 등급 안내
                          <div className="ModalText">
                            <PointHover>0 ~ 30점</PointHover>
                            {<Icon11 />}
                            <br />
                            <PointHover>31 ~ 70 점</PointHover>
                            {<Icon12 />} <br />
                            <PointHover>71 ~ 100 점</PointHover>
                            {<Icon13 />} <br />
                            <PointHover>101 ~ 200 점</PointHover>
                            <Icon14 />
                            <br />
                            <PointHover>201 ~ 300 점 </PointHover>
                            {<Icon15 />}
                            <br />
                            <PointHover>301 점 이상 </PointHover>
                            {<Icon16 />}
                          </div>
                        </div>
                      </PointModal>
                    </PointTitle>
                  </PointContainer>
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
                    {userWrite
                      .map((item, id) =>
                        current === 0 ? (
                          <InfoContainer key={item.boardSeq}>
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

                            <InfoContent>
                              <InfoTitle>
                                <StyledLink to={`/boards/${item.boardSeq}`}>
                                  {item.title}
                                </StyledLink>
                              </InfoTitle>
                              <InfoComment>[{item.commented}]</InfoComment>
                            </InfoContent>

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
                          </InfoContainer>
                        ) : (
                          ""
                        )
                      )
                      .reverse()}
                    {userComment
                      .map((item, id) =>
                        current === 1 ? (
                          <InfoContainer key={item.boardSeq}>
                            <Info bgColor="#62B6B7">댓글</Info>

                            <InfoContent>
                              <InfoTitle>
                                <StyledLink to={`/boards/${item.boardSeq}`}>
                                  {item.content}
                                </StyledLink>
                              </InfoTitle>
                              <InfoComment></InfoComment>
                            </InfoContent>

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
                                className="eye"
                                src={
                                  process.env.PUBLIC_URL + "/image/upVote.svg"
                                }
                                alt="Up"
                                width="22px"
                              />
                              {item.liked}
                            </InfoView>
                            <InfoLike>
                              <img
                                src={
                                  process.env.PUBLIC_URL + "/image/downVote.svg"
                                }
                                className="disliked"
                                alt="Down"
                                width="18px"
                                height="18px"
                              />
                              {item.disliked}
                            </InfoLike>
                          </InfoContainer>
                        ) : (
                          ""
                        )
                      )
                      .reverse()}
                    {userBook
                      .map((item, id) =>
                        current === 2 ? (
                          <InfoContainer key={item.boardSeq}>
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

                            <InfoContent>
                              <InfoTitle>
                                <StyledLink to={`/boards/${item.boardSeq}`}>
                                  {item.title}
                                </StyledLink>
                              </InfoTitle>
                              <InfoComment>[{item.commented}]</InfoComment>
                            </InfoContent>

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
                          </InfoContainer>
                        ) : (
                          ""
                        )
                      )
                      .reverse()}
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
      )}
    </>
  );
}
