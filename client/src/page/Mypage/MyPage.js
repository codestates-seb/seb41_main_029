import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "../../Theme";
import { Cookies } from "react-cookie";
import { getBookmark, getComment, getUser, getWrite } from "../../api/userAPI";

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
    width: 90%;
  }
`;

/** Mypage 사진과 수정 정보들 */
const MypageInfo = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  /* float: left; */
  @media screen and (max-width: 1336px) {
    width: 100%;
  }
`;

/** 프로필 사진 */
const MypageProfile = styled.img`
  width: 130px;
  height: 130px;
  display: flex;
  margin: 32px 0 32px 0;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  background-color: #bfbfbf;
`;

/** 유저 정보들 */
const MypageCenter = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
`;
/** 아이디 */
const MypageText = styled.span`
  height: 60px;
  color: #686868;
  font-size: ${theme.fontSizes.fs30};
  @media screen and (max-width: 540px) {
    white-space: nowrap;
    font-size: 24px;
  }
`;
/** 유저 기본 정보 */
const MypageProfileInfo = styled.div`
  margin-top: 20px;
  display: flex;
  color: #686868;

  @media screen and (max-width: 540px) {
    white-space: nowrap;
    margin-bottom: 8px;
    font-size: ${theme.fontSizes.fs16};
  }
`;
const MypageId = styled.div`
  color: #686868;

  @media screen and (max-width: 540px) {
    white-space: nowrap;
    padding-bottom: 28px;
    font-size: ${theme.fontSizes.fs16};
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
  @media screen and (max-width: 540px) {
    display: flex;
    justify-content: center;
    font-size: ${theme.fontSizes.fs12};
  }
`;
/** 회원 탈퇴 */
const MypageDelete = styled.a`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.main};
  &:hover {
    color: ${theme.colors.main_hover};
  }
  @media screen and (max-width: 540px) {
    display: flex;
    justify-content: center;
    margin-right: 16px;
    justify-content: center;
    font-size: ${theme.fontSizes.fs12};
  }
`;
const MypageInfoA = styled.div`
  margin-top: 20px;
  margin-left: 5%;

  @media screen and (max-width: 1336px) {
    flex-direction: column;
  }
`;

const PointContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
`;

const PointTitle = styled.div`
  width: 558px;
  height: 140px;
`;

const PointLevelDiv = styled.div`
  display: flex;
  justify-content: right;
`;
const PointLevel = styled.div`
  width: 160px;
`;
const PointUserDiv = styled.div`
  display: flex;
  justify-content: right;
`;

const PointUser = styled.div`
  width: 200px;
`;
const PointModal = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 20px;
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
      width: 55%;
      display: flex;
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
    width: 55px;
  }
`;
/** 댓글 수 */
const InfoComment = styled.span`
  color: ${({ theme }) => theme.colors.gray_03};
  margin-left: 8px;
`;
/** 작성한 날짜 조회 추천 나오는 전체 틀 */
const InfoDiv = styled.div`
  /* width: 700px; */
  display: flex;
  justify-content: right;
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

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalBtn = styled.button`
  background-color: ${theme.colors.main};
  text-decoration: none;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 10px;
  cursor: grab;
  margin-top: 10px;
  margin-right: 10px;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  > span.close-btn {
    margin-top: 5px;
    cursor: pointer;
  }

  > div.desc {
    margin-top: 25px;
    color: ${theme.colors.tag_general};
    text-align: center;
    font-size: 20px;
  }
`;

export default function MyPage() {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const navigate = useNavigate();

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
        .delete("https://api.gohiking.co.kr/users", {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${getCookie("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          alert("이용해 주셔서 감사합니다.");
          removeCookie("token");
          localStorage.removeItem("userId");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.data);
        });
    }
  };

  const [current, setCurrent] = useState(0);
  const munuArr = [{ name: "작성글" }, { name: "댓글" }, { name: "북마크" }];

  const [isOpen, setIsOpen] = useState(false);
  const [isOpens, setIsOpens] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const openModalHandlers = () => {
    setIsOpens(!isOpens);
  };

  const currentClick = (index) => {
    setCurrent(index);
  };

  return (
    <>
      {Token !== undefined ? (
        <MypageContainer>
          <MypageTitle>
            <MypageInfo>
              <MypageInfoA>
                <MypageProfile src={userInfo?.profileImageUrl}></MypageProfile>
                <MypageProfileModify href="mypageEdit">
                  개인정보 수정
                </MypageProfileModify>
                <MypageDelete onClick={DeleteClice}>회원 탈퇴</MypageDelete>
              </MypageInfoA>
              <MypageCenter>
                <MypageText> {userInfo.username} 님</MypageText>
                <MypageProfileInfo>
                  가입 날짜 :
                  <ModifiedDate modifiedAt={userInfo.modifiedAt} />
                </MypageProfileInfo>
                <MypageId>아이디 : {userInfo.userId}</MypageId>
              </MypageCenter>
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
                {userWrite.map((item, id) =>
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
                )}
                {userComment.map((item, id) =>
                  current === 1 ? (
                    <InfoContainer key={item.boardSeq}>
                      <Info bgColor="#62B6B7">댓글</Info>

                      <InfoContent>
                        <InfoTitle>
                          <StyledLink to={`/boards/${item.boardSeq}`}>
                            {item.content}
                          </StyledLink>
                        </InfoTitle>
                        <InfoComment>{item.commented}</InfoComment>
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
                          src={process.env.PUBLIC_URL + "/image/upVote.svg"}
                          alt="Up"
                          width="22px"
                        />
                        {item.liked}
                      </InfoView>
                      <InfoLike>
                        <img
                          src={process.env.PUBLIC_URL + "/image/downVote.svg"}
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
                )}
                {userBook.map((item, id) =>
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
