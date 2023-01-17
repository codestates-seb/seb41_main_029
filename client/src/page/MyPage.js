import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import theme from "../Theme";
import MyPageEdit from "./MyPageEdit";
import jsonData from "../data/Posts";

const MypageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MypageTitle = styled.div`
  background-color: #f2f2f2;
  width: ${({ theme }) => theme.deviceSizes.tablet};
  margin: 200px 0 200px 0;
  height: 1000px;
`;
//Mypage 사진과 수정 정보들
const MypageInfo = styled.div`
  height: 250px;
  border-bottom: 1.5px solid #939393;
  display: flex;
  justify-content: space-between;
`;
const MypageProfile = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  margin: 48px 0 0 58px;
  justify-content: center;
  background-color: #bfbfbf;
`;
const MypageProfileInfo = styled.div`
  display: flex;
  margin-right: 40px;
  align-items: center;
`;
const MypageProfileModify = styled.a`
  height: 24px;
  border: none;
  cursor: pointer;
  margin: 44px 60px 0 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
`;
// 전체, 댓글, 북마크 버튼
const MypageBtn = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  color: ${({ theme }) => theme.colors.white};
  background-color: #bdbdbd;
  margin: 50px 40px 0 60px;
  cursor: pointer;
  &:hover {
    background-color: #828282;
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.main};
  }
`;
// 제목, 날짜 등등 정보들
const TitleContainer = styled.div`
  justify-content: center;
  display: flex;
`;
const TitleDiv = styled.div`
  width: 1219px;
  height: 500px;
  margin: 32px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;
const TitleInfo = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  border-bottom: 1px solid #939393;
`;
const TitleContent = styled.div`
  width: 650px;
`;
const TitleDate = styled.div`
  width: 150px;
  text-align: center;
  border-left: 1px solid #000;
`;
const TitleDateMini = styled.div`
  width: 110px;
  text-align: center;
  border-left: 1px solid #000;
`;
// 내가 등록 한 정보르 나타내는 styled
const InfoContainer = styled.div`
  border-bottom: 1px solid #939393;
  height: 120px;
  display: flex;
  align-content: center;
`;
const InfoIcon = styled.div`
  width: 60px;
  align-items: center;
  display: flex;
  justify-content: center;
`;
const Info = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  margin-left: 8px;
  padding: 4px 8px;
`;
const InfoContent = styled.div`
  width: 640px;
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  display: flex;
  align-items: center;
  margin-left: 12px;
  cursor: pointer;
`;
const InfoComment = styled.div`
  color: ${({ theme }) => theme.colors.gray_03};
  margin-left: 8px;
`;
const InfoDiv = styled.div`
  display: flex;
  align-items: center;
`;
const InfoDate = styled.div`
  width: 160px;
`;
const InfoView = styled.div`
  width: 120px;
  color: #a67b48;
`;
const InfoLike = styled.div`
  width: 125px;
  color: #95cecf;
`;
const InfoName = styled.div``;

export default function MyPage() {
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const [data, setData] = useState([]);
  const [Writing, setWriting] = useState(false);
  const [Comments, setComments] = useState(false);

  const WritingClick = () => {
    setWriting(!Writing);
    console.log(Writing);
  };
  const CommentsClick = () => {
    setComments(!Comments);
    console.log(Comments);
  };
  return (
    <MypageContainer>
      <MypageTitle>
        <MypageInfo>
          <MypageProfile>프로필 사진</MypageProfile>
          <MypageProfileInfo>유저 기본 정보</MypageProfileInfo>
          <MypageProfileModify href="mypageEdit">
            회원정보 수정
          </MypageProfileModify>
        </MypageInfo>
        <div>
          <MypageBtn onClick={WritingClick}>작성글</MypageBtn>
          <MypageBtn onClick={CommentsClick}>댓글</MypageBtn>
          <MypageBtn>북마크</MypageBtn>
        </div>
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
              Writing ? (
                <InfoContainer key={item.id}>
                  <InfoIcon>
                    <Info>정보</Info>
                  </InfoIcon>
                  <InfoContent>
                    <div>{item.title}</div>
                    <InfoComment>[3]</InfoComment>
                  </InfoContent>
                  <InfoDiv>
                    <InfoDate>23/01/15</InfoDate>
                    <InfoView>115</InfoView>
                    <InfoLike>777</InfoLike>
                    <InfoName>{item.id}</InfoName>
                  </InfoDiv>
                </InfoContainer>
              ) : (
                ""
              )
            )}
            {jsonData.map((item, id) =>
              Comments ? (
                <InfoContainer key={item.id}>
                  <InfoIcon>
                    <Info>댓글</Info>
                  </InfoIcon>
                  <InfoContent>
                    <div>{item.content}</div>
                    <InfoComment>[3]</InfoComment>
                  </InfoContent>
                  <InfoDiv>
                    <InfoDate>23/01/15</InfoDate>
                    <InfoView>{item.voteResult}</InfoView>
                    <InfoLike>{item.viewCount}</InfoLike>
                    <InfoName>{item.id}</InfoName>
                  </InfoDiv>
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
