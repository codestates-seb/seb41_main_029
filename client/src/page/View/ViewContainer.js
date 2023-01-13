import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { BsBookmarkCheck } from "react-icons/bs";
import Comments from "../../component/View/Comments";

const ViewLayout = styled.div``;

const TitleContainer = styled.div`
  display: flex;
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 850px;
  /* height: 100px; */
  margin: 64px 12px 64px 88px;
  font-size: ${({ theme }) => theme.fontSizes.fs30};
`;

const IconLayout = styled.span`
  display: flex;
  margin-left: 160px;
  margin-top: 72px;
`;
const Line = styled.div`
  width: 1160px;
  margin-left: 88px;
  border: 3px solid #dbdbdb;
`;

const VoteLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  margin-right: 22px;
`;

const VoteContainer = styled.div`
  display: flex;
`;
const VoteBtn = styled.button`
  border-radius: 10px;
`;

const BodyLayout = styled.div`
  margin-left: 88px;
  margin-top: 64px;
  width: 1160px;
  font-size: ${({ theme }) => theme.fontSizes.fs18};
`;

const Count = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  margin-top: 3px;
  margin-left: 5px;
`;

const UserInfoLayout = styled.div`
  float: right;
  display: flex;
  margin-top: -70px;
  margin-right: 90px;
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
`;
const Icondiv = styled.div`
  margin-top: 3.7px;
`;

const EditImg = styled.img`
  width: 32px;
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

// const BookMarkImg = styled.img`
//   margin-top: 5px;
//   margin-left: 12px;
//   width: 40px;
//   height: 32px;
//   cursor: pointer;

//   &:hover ~ ${EditWord1} {
//     display: block;
//   }
// `;

const Icondiv1 = styled.div`
  margin-left: 18px;
`;

const Bookmark2 = styled.div`
  cursor: pointer;
  &:hover > ${EditWord2} {
    display: block;
  }
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 12px;
  background-color: #5dd986;
`;

const ViewContainer = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/writing");
  };
  const [isBM, setIsBM] = useState(false);
  const handleClickBm = () => {
    setIsBM(!isBM);
  };

  return (
    <>
      <ViewLayout>
        <TitleContainer>
          <TitleLayout>반갑습니다.</TitleLayout>
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
              />
              <EditWord1>삭제</EditWord1>
            </Icondiv1>
            {/* {isBM ? <BookMarkImg               src={process.env.PUBLIC_URL + "/image/Bookmark2.png"}
              alt="delete"></BookMarkImg> :<BookMarkImg></BookMarkImg>} */}
            {/* <BookMarkImg
              src={process.env.PUBLIC_URL + "/image/Bookmark2.png"}
              alt="delete"
            /> */}
            {/* <FontAwesomeIcon icon={faBookmark} size="2x" /> */}
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
        <Line></Line>
        <BodyLayout>
          아니더면, 그들은 우는 눈이 피고, 물방아 있으랴? 아니더면, 소금이라
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
          주며, 인생에 것이 우리의 가치를 인생을 위하여서.
        </BodyLayout>
        <VoteLayout>
          <VoteBtn style={{ marginLeft: "20px" }}>
            <VoteContainer>
              <img
                src={process.env.PUBLIC_URL + "/image/upVote.svg"}
                alt="delete"
                width="40px"
              />
              <Count>3</Count>
            </VoteContainer>
          </VoteBtn>

          <VoteBtn style={{ marginLeft: "20px" }}>
            <VoteContainer>
              <img
                src={process.env.PUBLIC_URL + "/image/downVote.svg"}
                alt="delete"
                width="40px"
              />
              <Count style={{ marginTop: "7px" }}>1</Count>
            </VoteContainer>
          </VoteBtn>
        </VoteLayout>
        <UserInfoLayout>
          <Profile></Profile>
          <div>
            박승철
            <div>23/01/12</div>
            <div>조회수:137</div>
          </div>
        </UserInfoLayout>
        <Comments />
      </ViewLayout>
    </>
  );
};

export default ViewContainer;
