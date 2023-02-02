import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import ViewVote from "../../component/View/ViewVote";
import { BsBookmarkCheck } from "react-icons/bs";
import Comments from "../../component/View/Comments";
import { bookMarking, deleteWriting, getWriting } from "../../api/writingAPI";
import { Cookies } from "react-cookie";
import { Viewdate } from "../../component/DateCalculator";
import { deleteComment } from "../../api/commentAPI";
import Loading from "../../component/Loading";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/usersReducer";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
} from "../../component/UserIcon";

const ViewLayout = styled.div`
  @media screen and (max-width: 1336px) {
    width: 100%;
    max-width: 800px;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1336px) {
    /* width: 80%; */
    /* justify-content: left; */
  }
`;

const TitleLayout = styled.div`
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

const IconLayout = styled.div`
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

const Icondiv = styled.div`
  margin-top: 3.7px;
`;
const LineLayOut = styled.div`
  display: flex;
  justify-content: center;
`;
const Line = styled.div`
  width: 100%;
  width: 1200px;
  border: 3px solid #dbdbdb;
  @media screen and (max-width: 1336px) {
    width: 95%;
  }
`;
const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  /* margin-left: 12px; */
  @media screen and (max-width: 1336px) {
    /* width: 100%;
    max-width: 800px; */
    margin-left: 24px;
  }
`;

const BodyLayout = styled.div`
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
const UserInfoLayout = styled.div`
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

const EditWord = styled.div`
  display: none;
`;
const EditWord1 = styled.div`
  display: none;
  margin-left: 5px;
  margin-top: -4.5px;
`;
const EditWord2 = styled.div`
  display: none;
  margin-left: -7px;
  width: 45px;
`;

const EditImg = styled.img`
  width: 100%;
  max-width: 30px;
  height: 32px;
  cursor: pointer;
  &:hover ~ ${EditWord} {
    display: block;
  }
`;
const DeleteImg = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:hover ~ ${EditWord1} {
    display: block;
  }
`;

const Icondiv1 = styled.div`
  margin-left: 8px;
  @media screen and (max-width: 1336px) {
    margin-left: 3px;
  }
`;
const Icondiv11 = styled.div`
  width: 100%;
  margin-left: 60px;
  @media screen and (max-width: 1336px) {
    margin-left: 33px;
  }
`;

const Bookmark2 = styled.div`
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
const Bookmark23 = styled.div`
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

const Bookmark22 = styled.div`
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

const ProfileContainer = styled.div`
  /* border: 1px solid black; */
  width: 100%;
  height: 80px;
  max-width: 100px;
  margin-right: 12px;
  /* background-color: white; */
`;

const Div1 = styled.div`
  height: 36px;
  display: flex;
`;
const Point1 = styled.div`
  margin-bottom: 80px;
`;

const ViewContainer = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardSeq } = useParams();
  const [viewInfo, setViewInfo] = useState();
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const userId1 = JSON.parse(localStorage.getItem("userId"));
  // console.log(userId1);
  const handleClick = () => {
    navigate(`/boards/edit/${boardSeq}`);
  };
  const [isBM, setIsBM] = useState();
  // viewInfo?.data?.bookmarkStatus
  // false
  const handleClickBm = () => {
    if (!Token) {
      if (window.confirm("로그인 상태가 아닙니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      setIsBM(!isBM);
      bookMarking(Token, boardSeq);
      // {
      //   viewInfo?.data?.bookmarkStatus === true
      //     ? setIsBM(true)
      //     : setIsBM(false);
      // }
      // viewInfo?.data?.bookmarkStatus === true ? setIsBM(!isBM) : setIsBM(!isBM);
    }
  };
  // console.log(isBM);

  const handleClickDe = async () => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) {
      // 취소(아니오) 버튼 클릭 시 이벤트
      alert("취소했습니다.");
    } else {
      // 확인(예) 버튼 클릭 시 이벤트
      deleteWriting(Token, boardSeq);
      navigate("/community");
    }
  };
  const timeout = () => {
    alert("데이터를 불러오지 못했습니다.");
    navigate("/community");
  };

  async function getInfo() {
    const res = await getWriting(Token, boardSeq);
    // const res = await getWriting(id);
    setViewInfo(res);
    // console.log(res);
    if (res?.status !== 200) {
      setLoading(true);
      setTimeout(() => timeout(), 5000);
    }
  }
  // console.log(isBM);
  // console.log(viewInfo?.data?.bookmarkStatus);
  useEffect(
    () => {
      setLoading(true);
      getInfo();
      dispatch(setUser({ Token, userId1, boardSeq }));
      setLoading(false);
    },
    [
      // viewInfo?.data?.bookmarkStatus
    ]
  );
  useEffect(() => {
    {
      viewInfo?.data?.bookmarkStatus === true ? setIsBM(true) : setIsBM(false);
    }
  }, [viewInfo]);
  // console.log(viewInfo);

  return (
    <>
      {loading ? <Loading /> : null}
      <ViewLayout>
        <TitleContainer>
          <TitleLayout>{viewInfo?.data?.title}</TitleLayout>
          <IconLayout>
            {userId1 === viewInfo?.data?.userId ? (
              <>
                <Icondiv>
                  <EditImg
                    src={process.env.PUBLIC_URL + "/image/editIcon.svg"}
                    alt="edit"
                    onClick={handleClick}
                  />
                  <EditWord>수정</EditWord>
                </Icondiv>
                <Icondiv1>
                  <DeleteImg
                    src={process.env.PUBLIC_URL + "/image/deleteIcon.svg"}
                    alt="delete"
                    onClick={handleClickDe}
                  />
                  <EditWord1>삭제</EditWord1>
                </Icondiv1>
                <Icondiv1>
                  {isBM === true ? (
                    <Bookmark23>
                      <BsBookmarkCheck
                        className="BmIcon"
                        color="#62B6B7"
                        size="30px"
                        style={{ marginTop: "6px" }}
                        onClick={handleClickBm}
                      />
                      <EditWord2>북마크</EditWord2>
                    </Bookmark23>
                  ) : (
                    <Bookmark23>
                      <BsBookmarkCheck
                        className="BmIcon"
                        size="30px"
                        style={{ marginTop: "6px" }}
                        onClick={handleClickBm}
                      />
                      <EditWord2>북마크</EditWord2>
                    </Bookmark23>
                  )}
                </Icondiv1>
              </>
            ) : (
              <Icondiv11>
                {isBM === true ? (
                  <Bookmark2>
                    <BsBookmarkCheck
                      className="BmIcon"
                      color="#62B6B7"
                      size="30px"
                      style={{ marginTop: "6px" }}
                      onClick={handleClickBm}
                    />
                    <EditWord2>북마크</EditWord2>
                  </Bookmark2>
                ) : (
                  <Bookmark22>
                    <BsBookmarkCheck
                      className="BmIcon"
                      size="30px"
                      style={{ marginTop: "6px" }}
                      onClick={handleClickBm}
                    />
                    <EditWord2>북마크</EditWord2>
                  </Bookmark22>
                )}
              </Icondiv11>
            )}
          </IconLayout>
        </TitleContainer>
        <LineLayOut>
          <Line />
        </LineLayOut>
        <BodyContainer>
          <BodyLayout
            dangerouslySetInnerHTML={{ __html: viewInfo?.data?.content }}
          >
            {/* <span></span> */}
            {/* {viewInfo?.data?.content} */}
          </BodyLayout>
        </BodyContainer>
        <ViewVote
          likeCount={viewInfo?.data?.likeCount}
          dislikeCount={viewInfo?.data?.dislikeCount}
          // status={viewInfo?.data?.body}
        />
        <UserInfoLayout>
          <ProfileContainer>
            <img
              src={viewInfo?.data?.profileImageUrl}
              style={{ width: "100px", height: "80px" }}
            />
          </ProfileContainer>
          <div>
            <Div1>
              <div style={{ marginTop: "8px" }}>{viewInfo?.data?.username}</div>
              {viewInfo?.data?.userRole === "USER" ? (
                <Point1>
                  {0 <= viewInfo?.data?.point && viewInfo?.data?.point <= 30 ? (
                    <Icon1 />
                  ) : (
                    ""
                  )}
                  {31 <= viewInfo?.data?.point &&
                  viewInfo?.data?.point <= 70 ? (
                    <Icon2 />
                  ) : (
                    ""
                  )}
                  {71 <= viewInfo?.data?.point &&
                  viewInfo?.data?.point <= 100 ? (
                    <Icon3 />
                  ) : (
                    ""
                  )}
                  {101 <= viewInfo?.data?.point &&
                  viewInfo?.data?.point <= 200 ? (
                    <Icon4 />
                  ) : (
                    ""
                  )}
                  {201 <= viewInfo?.data?.point &&
                  viewInfo?.data?.point <= 300 ? (
                    <Icon5 />
                  ) : (
                    ""
                  )}
                  {301 <= viewInfo?.data?.point ? <Icon6 /> : ""}
                </Point1>
              ) : null}
            </Div1>
            <Viewdate createdAt={viewInfo?.data?.createdAt} />
            <div>조회수 : {viewInfo?.data?.viewCount}</div>
          </div>
        </UserInfoLayout>
        <Comments
          commented={viewInfo?.data?.commented}
          comments={viewInfo?.data?.comments}
        />
      </ViewLayout>
    </>
  );
};

export default ViewContainer;
