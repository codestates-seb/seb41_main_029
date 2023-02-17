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
  ViewLayout,
  TitleContainer,
  TitleLayout,
  IconLayout,
  Icondiv,
  LineLayOut,
  Line,
  BodyContainer,
  BodyLayout,
  UserInfoLayout,
  EditWord,
  EditWord1,
  EditWord2,
  EditImg,
  DeleteImg,
  Icondiv1,
  Icondiv11,
  Bookmark2,
  Bookmark23,
  Bookmark22,
  ProfileContainer,
  Div1,
  Point1,
} from "./ViewStyle";
import { Point } from "../../component/Point";

const ViewContainer = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardSeq } = useParams();
  const [viewInfo, setViewInfo] = useState();
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const userId1 = JSON.parse(localStorage.getItem("userId"));
  const handleClick = () => {
    navigate(`/boards/edit/${boardSeq}`);
  };
  const [isBM, setIsBM] = useState();

  const handleClickBm = () => {
    if (!Token) {
      if (window.confirm("로그인 상태가 아닙니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      setIsBM(!isBM);
      bookMarking(Token, boardSeq);
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
    setViewInfo(res);
    if (res?.status !== 200) {
      setLoading(true);
      setTimeout(() => timeout(), 5000);
    }
  }

  useEffect(() => {
    setLoading(true);
    getInfo();
    dispatch(setUser({ Token, userId1, boardSeq }));
    setLoading(false);
  }, []);
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
          ></BodyLayout>
        </BodyContainer>
        <ViewVote
          likeCount={viewInfo?.data?.likeCount}
          dislikeCount={viewInfo?.data?.dislikeCount}
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
                <Point score={viewInfo?.data?.point} />
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
