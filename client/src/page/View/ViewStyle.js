import styled from "styled-components";

export const ViewLayout = styled.div`
  @media screen and (max-width: 1336px) {
    width: 100%;
    max-width: 800px;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1336px) {
    /* width: 80%; */
    /* justify-content: left; */
  }
`;

export const TitleLayout = styled.div`
  display: flex;
  flex-direction: row;
  word-break: break-all;
  width: 100%;

  max-width: 1100px;
  margin: 64px 0px;
  font-size: ${({ theme }) => theme.fontSizes.fs30};
  padding-right: 30px;

  @media screen and (max-width: 1336px) {
    width: 80%;
    max-width: 800px;
    margin-left: 38px;
    font-size: ${({ theme }) => theme.fontSizes.fs24};
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    max-width: 800px;
    margin-left: 38px;
    font-size: ${({ theme }) => theme.fontSizes.fs18};
  }
  @media screen and (max-width: 620px) {
    /* width: 100%;
    max-width: 400px; */
    margin-left: 38px;
    font-size: ${({ theme }) => theme.fontSizes.fs18};
  }
`;

export const IconLayout = styled.div`
  width: 100%;
  max-width: 130px;
  display: flex;
  float: right;
  /* margin-left: 330px; */
  margin-top: 72px;
  @media screen and (max-width: 1336px) {
    width: 100%;
    max-width: 120px;
    /* margin-right: 30px; */
  }
`;

export const Icondiv = styled.div`
  margin-top: 3.7px;
`;
export const LineLayOut = styled.div`
  display: flex;
  justify-content: center;
`;
export const Line = styled.div`
  width: 100%;
  width: 1200px;
  border: 3px solid #dbdbdb;
  @media screen and (max-width: 1336px) {
    width: 95%;
  }
`;
export const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  /* margin-left: 12px; */
  @media screen and (max-width: 1336px) {
    /* width: 100%;
    max-width: 800px; */
    margin-left: 24px;
  }
`;

export const BodyLayout = styled.div`
  margin-top: 64px;
  width: 100%;
  max-width: 1200px;
  /* margin-left: 12px; */
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  @media screen and (max-width: 1336px) {
    /* display: flex;
    justify-content: center; */
    width: 100%;
    /* max-width: 700px; */
    padding-right: 20px;
    margin-left: 18px;
  }
  @media screen and (max-width: 800px) {
    /* width: 100%;
    max-width: 800px; */
    /* margin-left: 38px; */
    font-size: ${({ theme }) => theme.fontSizes.fs16};
  }
`;
export const UserInfoLayout = styled.div`
  display: flex;
  float: right;
  margin-top: -70px;
  margin-right: 10px;
  @media screen and (max-width: 1336px) {
    margin-right: 20px;
  }
  @media screen and (max-width: 705px) {
    display: flex;
    float: none;
    justify-content: center;
    margin-top: 20px;
  }
`;

export const EditWord = styled.div`
  display: none;
`;
export const EditWord1 = styled.div`
  display: none;
  margin-left: 5px;
  margin-top: -4.5px;
`;
export const EditWord2 = styled.div`
  display: none;
  margin-left: -7px;
  width: 45px;
`;

export const EditImg = styled.img`
  width: 100%;
  max-width: 30px;
  height: 32px;
  cursor: pointer;
  &:hover ~ ${EditWord} {
    display: block;
  }
`;
export const DeleteImg = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:hover ~ ${EditWord1} {
    display: block;
  }
`;

export const Icondiv1 = styled.div`
  margin-left: 8px;
  @media screen and (max-width: 1336px) {
    margin-left: 3px;
  }
`;
export const Icondiv11 = styled.div`
  width: 100%;
  margin-left: 60px;
  @media screen and (max-width: 1336px) {
    margin-left: 33px;
  }
`;

export const Bookmark2 = styled.div`
  width: 40px;
  margin-left: 35px;
  cursor: pointer;
  &:hover > ${EditWord2} {
    display: block;
  }
  @media screen and (max-width: 1336px) {
    width: 100%;
    margin-left: 35px;
    max-width: 30px;
    height: 32px;
  }
`;
export const Bookmark23 = styled.div`
  width: 40px;
  /* margin-left: 35px; */
  cursor: pointer;
  &:hover > ${EditWord2} {
    display: block;
  }
  @media screen and (max-width: 1336px) {
    width: 100%;
    /* margin-left: 35px; */
    max-width: 30px;
    height: 32px;
  }
`;

export const Bookmark22 = styled.div`
  width: 40px;
  margin-left: 35px;
  cursor: pointer;
  &:hover > ${EditWord2} {
    display: block;
  }
  @media screen and (max-width: 1336px) {
    width: 100%;
    max-width: 30px;
    height: 32px;
  }
`;

export const ProfileContainer = styled.div`
  /* border: 1px solid black; */
  width: 100%;
  height: 80px;
  max-width: 100px;
  margin-right: 12px;
  /* background-color: white; */
`;

export const Div1 = styled.div`
  height: 36px;
  display: flex;
`;
export const Point1 = styled.div`
  margin-bottom: 80px;
`;
