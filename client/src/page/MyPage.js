import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import theme from "../Theme";
import MyPageEdit from "./MyPageEdit";
import jsonData from "../data/Posts";
import { Cookies } from "react-cookie";
import { getUser } from "../api/userAPI";

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
const MypageProfile = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  margin: 44px 0 0 4%;
  justify-content: center;
  background-color: #bfbfbf;

  @media screen and (max-width: 500px) {
    /* width: 15%; */
    margin-right: 10px;
  }
`;
/** 유저 기본 정보 */
const MypageProfileInfo = styled.div`
  display: flex;
  /* margin-right: 40px; */
  align-items: center;
  width: 147px;
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
  @media screen and (max-width: 495px) {
    width: 140px;
    padding-right: 0;
    display: flex;
    justify-content: center;
    text-align: center;
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
    @media screen and (max-width: 510px) {
      /* display: flex; */
      /* font-size: 12px; */
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
  width: 1219px;
  height: 562px;
  margin-top: 32px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
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
  /* padding-left: 10px; */
  justify-content: center;
  border-bottom: 1px solid #939393;

  /* @media screen and (max-width: 1336px) {
    width: 100%;
  } */
`;

/** 제목 */
const TitleContent = styled.div`
  width: 650px;
  /* @media screen and (max-width: 1336px) {
    width: 700px;
  } */
`;

/** 날짜 닉네임 */
const TitleDate = styled.div`
  width: 150px;
  /* width: 100%; */
  text-align: center;
  border-left: 1px solid #000;
  @media screen and (max-width: 400px) {
    white-space: nowrap;
  }
`;

/** 조회, 추천*/
const TitleDateMini = styled.div`
  width: 110px;
  /* width: 100%; */
  text-align: center;
  border-left: 1px solid #000;
  @media screen and (max-width: 375px) {
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
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  /* margin-left: 8px; */
  padding: 3px 8px;
  @media screen and (max-width: 1336px) {
    width: 30px;
  }
`;

/** 작성한 제목과 댓글 수 전체 창*/
const InfoContent = styled.div`
  width: 600px; // or 100 %
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  display: flex;
  align-items: center; // 1줄로 만들면 필요없다

  /* padding-left: 12px; */
  @media screen and (max-width: 1336px) {
    width: 50%;
  }
`;
const InfoTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 20px;
  cursor: pointer;

  /* @media screen and (max-width: 1336px) {
    width: 200px;
  } */
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
  align-items: center;
  text-align: center;
  /* padding-left: 40px; */
  /* justify-content: center; */

  @media screen and (max-width: 1336px) {
    width: 100%;
  }
`;
/** 내가 등록한 날짜*/
const InfoDate = styled.div`
  width: 150px;
  text-align: center;
  /* @media screen and (max-width: 1336px) {
    width: 100%;
  } */
`;
/** 내가 받은 조회수 */
const InfoView = styled.div`
  width: 120px;
  color: #a67b48;
  text-align: center;
  /* @media screen and (max-width: 1336px) {
    width: 80%;
  } */
`;
/**  내가 받은 추천 수 */
const InfoLike = styled.div`
  width: 120px;
  text-align: center;
  color: #95cecf;

  /* @media screen and (max-width: 1336px) {
    width: 80%;
  } */
`;
/** 나의 닉네임*/
const InfoName = styled.div`
  width: 150px;
  text-align: center;
  /* 
  @media screen and (max-width: 1336px) {
    width: 80%;
  } */
`;

export default function MyPage() {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  // 수혁님 코드
  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => {
  //       setData(res.data);
  //       console.log(res.data);
  //     })

  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // }, []);

  // 박승철 코드
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    async function getUserInfo() {
      const res = await getUser(Token);
      setUserInfo(res.data.body.user);
      console.log(res);
    }
    getUserInfo();
  }, []);

  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(0);

  // const [Writing, setWriting] = useState(false);
  // const [Comments, setComments] = useState(false);

  const munuArr = [{ name: "작성글" }, { name: "댓글" }, { name: "북마크" }];

  const currentClick = (index) => {
    setCurrent(index);
    console.log(current);
  };

  return (
    <MypageContainer>
      <MypageTitle>
        <MypageInfo>
          <MypageProfile>
            {/* 프로필 사진 */}
            <img src={userInfo?.profileImageUrl} />
            {/* {userInfo?.profileImageUrl} */}
          </MypageProfile>
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
                  className={current === index ? "submenu focused" : "submenu"}
                  onClick={() => currentClick(index)}
                >
                  {ele.name}
                </button>
              </div>
            );
          })}
          {/* <MypageBtn onClick={WritingClick}>작성글</MypageBtn>
          <MypageBtn onClick={CommentsClick}>댓글</MypageBtn>
          <MypageBtn>북마크</MypageBtn> */}
        </MypageBtns>
        <TitleContainer>
          <TitleDiv>
            <TitleInfo>
              <TitleContent>제목</TitleContent>
              <TitleDate>날짜</TitleDate>
              <TitleDateMini>조회</TitleDateMini>
              <TitleDateMini>추천</TitleDateMini>
              <TitleDate>닉네임</TitleDate>
            </TitleInfo>

            {data.map((item, id) =>
              current === 0 ? (
                <InfoContainer key={item.id}>
                  <InfoIcon>
                    <Info>정보</Info>
                  </InfoIcon>
                  <InfoContent>
                    <InfoTitle>{item.title}</InfoTitle>
                    <InfoComment>[3]</InfoComment>
                  </InfoContent>
                  {/* <InfoDiv> */}
                  <InfoDate>23/01/15</InfoDate>
                  <InfoView>115</InfoView>
                  <InfoLike>777</InfoLike>
                  <InfoName>{item.id}</InfoName>
                  {/* </InfoDiv> */}
                </InfoContainer>
              ) : (
                ""
              )
            )}
            {jsonData.map((item, id) =>
              current === 1 ? (
                <InfoContainer key={item.id}>
                  <InfoIcon>
                    <Info>댓글</Info>
                  </InfoIcon>
                  <InfoContent>
                    <InfoTitle>{item.content}</InfoTitle>
                    <InfoComment>[3]</InfoComment>
                  </InfoContent>
                  {/* <InfoDiv> */}
                  <InfoDate>23/01/15</InfoDate>
                  <InfoView>{item.voteResult}</InfoView>
                  <InfoLike>{item.viewCount}</InfoLike>
                  <InfoName>{item.id}</InfoName>
                  {/* </InfoDiv> */}
                </InfoContainer>
              ) : (
                ""
              )
            )}
            {/* <InfoIcon>
                <Info>정보</Info>
              </InfoIcon>
              <InfoContent>
                <div>반갑습니다</div>
                <InfoComment>[3]</InfoComment>
              </InfoContent>
              <InfoDiv>
                <InfoDate>23/01/15</InfoDate>
                <InfoView>115</InfoView>
                <InfoLike>777</InfoLike>
                <InfoName>shtngur</InfoName>
              </InfoDiv> */}
          </TitleDiv>
        </TitleContainer>
      </MypageTitle>
    </MypageContainer>
  );
}