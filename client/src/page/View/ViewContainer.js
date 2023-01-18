import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import ViewVote from "../../component/View/ViewVote";
import { BsBookmarkCheck } from "react-icons/bs";
import Comments from "../../component/View/Comments";
import { getWriting } from "../../api/writingAPI";
import { Cookies } from "react-cookie";
import { Viewdate } from "../../component/DateCalculator";
import { deleteComment } from "../../api/commentAPI";
import Loading from "../../component/Loading";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/usersReducer";

const ViewLayout = styled.div`
  @media screen and (max-width: 1336px) {
    width: 100%;
    max-width: 800px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1336px) {
    width: 100%;
    /* max-width: 1000px; */
  }
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 970px;
  margin: 64px 0px;
  font-size: ${({ theme }) => theme.fontSizes.fs30};
  padding-right: 30px;
  @media screen and (max-width: 1336px) {
    width: 100%;
    /* max-width: 1000px; */
    margin-left: 20px;
    font-size: ${({ theme }) => theme.fontSizes.fs24};
  }
`;

const IconLayout = styled.div`
  display: flex;
  float: right;
  margin-top: 72px;
  @media screen and (max-width: 1336px) {
    width: 100%;
    max-width: 120px;
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
  width: 1136px;
  border: 3px solid #dbdbdb;
  @media screen and (max-width: 1336px) {
    width: 95%;
  }
`;
const BodyContainer = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1336px) {
    width: 100%;
    max-width: 800px;
    margin-left: 20px;
  }
`;

const BodyLayout = styled.div`
  margin-top: 64px;
  width: 100%;
  max-width: 1136px;
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  @media screen and (max-width: 1336px) {
    /* display: flex;
    justify-content: center; */
    width: 100%;
    max-width: 700px;
    padding-right: 20px;
  }
`;
const UserInfoLayout = styled.div`
  display: flex;
  float: right;
  margin-top: -70px;
  @media screen and (max-width: 1336px) {
    margin-right: 20px;
  }
  @media screen and (max-width: 666px) {
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
  margin-left: 18px;
  @media screen and (max-width: 1336px) {
    margin-left: 3px;
  }
`;

const Bookmark2 = styled.div`
  width: 40px;
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
  width: 100%;
  height: 100px;
  max-width: 100px;
  margin-right: 12px;
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  background-color: #5dd986;
`;

// const ViewVoteLayOut = styled.div`
//   @media screen and (max-width: 1336px) {
//     width: 100%;
//     size: 20px;
//   }
// `;

const ViewContainer = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [viewInfo, setViewInfo] = useState();
  const handleClick = () => {
    navigate("/writing");
  };
  const [isBM, setIsBM] = useState(false);
  const handleClickBm = () => {
    setIsBM(!isBM);
  };

  const handleClickDe = async () => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) {
      // 취소(아니오) 버튼 클릭 시 이벤트
      alert("취소했습니다.");
    } else {
      // 확인(예) 버튼 클릭 시 이벤트
      // if (answer.userId * 1 !== userId * 1) {
      //   return alert("not your comment");
      // } else {
      //   const res = await deleteComment();
      //   boardsId, boards.commentId, Token, userId;
      //   if (res.status === 204) {
      //     window.location.replace(`/boards/${boardsId}`);
      //   } else {
      //     alert("fail to delete");
      //   }
      // }
      navigate("/community");
    }
  };

  useEffect(() => {
    setLoading(true);
    async function getInfo() {
      const res = await getWriting();
      setViewInfo(res);
      // console.log(res.data);
      setLoading(false);
    }
    getInfo();
    // const cookie = new Cookies();
    // const Token = cookie.get("token");
    // const userId = JSON.parse(localStorage.getItem("userId"));
    // dispatch(setUser({ Token, userId, boardSeq: id }));
  }, [id]);
  // console.log(viewInfo);

  return (
    <>
      {loading ? <Loading /> : null}
      <ViewLayout>
        <TitleContainer>
          <TitleLayout>
            {/* 반갑습니다. */}
            {viewInfo?.title}
          </TitleLayout>
          {/* {userId === viewInfo?.userSeq ? <IconLayout></IconLayout> : null} */}
          <IconLayout>
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
              {isBM ? (
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
                <Bookmark2>
                  <BsBookmarkCheck
                    className="BmIcon"
                    size="30px"
                    style={{ marginTop: "6px" }}
                    onClick={handleClickBm}
                  />
                  <EditWord2>북마크</EditWord2>
                </Bookmark2>
              )}
            </Icondiv1>
          </IconLayout>
        </TitleContainer>
        <LineLayOut>
          <Line />
        </LineLayOut>
        <BodyContainer>
          <BodyLayout>
            {/* 아니더면, 그들은 우는 눈이 피고, 물방아 있으랴? 아니더면, 소금이라
          남는 인생에 어디 유소년에게서 이것이다. 아니한 피는 보내는 않는 있는
          투명하되 과실이 수 그러므로 피다. 투명하되 바이며, 인간의 눈에
          광야에서 봄날의 못할 불어 봄바람이다. 구하지 희망의 많이 기관과
          부패뿐이다. 노래하며 풍부하게 같이, 사람은 가장 사는가 것이다. 길지
          실로 설레는 이상의 할지니, 그들의 피고 부패뿐이다. 청춘에서만 찾아
          고동을 얼마나 피고 새가 힘있다. 어디 귀는 인생의 넣는 곳이 군영과
          방지하는 그들의 천하를 위하여서. 있는 두손을 살 하였으며, 보배를
          철환하였는가? 노년에게서 이상은 같지 때문이다. 피고, 따뜻한 위하여,
          예가 아름다우냐? 무한한 길지 피가 아름다우냐? 영원히 많이 목숨을 앞이
          풍부하게 무엇을 새가 같이, 봄바람이다. 귀는 싹이 피어나기 없으면,
          이상은 내는 가는 것이다. 유소년에게서 두기 그들은 모래뿐일 이상은
          없으면 황금시대다. 남는 밝은 이성은 무한한 같은 주며, 뿐이다. 가슴이
          주며, 인생에 것이 우리의 가치를 인생을 위하여서. */}
            {viewInfo?.content}
          </BodyLayout>
        </BodyContainer>
        {/* <ViewVoteLayOut> */}
        <ViewVote voteResult={viewInfo?.voteResult} />
        {/* </ViewVoteLayOut> */}
        <UserInfoLayout>
          <ProfileContainer>
            <Profile />
          </ProfileContainer>
          <div>
            {/* 박승철 */}
            {viewInfo?.userName}
            {/* <div>{viewInfo?.createdAt}</div> */}
            <Viewdate createdAt={viewInfo?.createdAt} />
            {/* {format(parseISO(viewInfo?.createdAt), "yyyy.MM.dd")} */}
            {/* <div>조회수:137</div> */}
            <div>조회수 : {viewInfo?.viewCount}</div>
          </div>
        </UserInfoLayout>
        {/* <Comments /> */}
        <Comments comments={viewInfo?.comments} />
      </ViewLayout>
    </>
  );
};

export default ViewContainer;
