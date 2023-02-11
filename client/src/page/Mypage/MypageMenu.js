import { faClock, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { getBookmark, getComment, getWrite } from "../../api/userAPI";
import { ViewdateCommu } from "../../component/DateCalculator";
import * as s from "./MypageStyle";

const MypageMenu = () => {
  const cookie = new Cookies();
  const Token = cookie.get("token");

  const [userWrite, setUserWrite] = useState([]);
  const [userComment, setUserComment] = useState([]);
  const [userBook, setUserBook] = useState([]);
  const [current, setCurrent] = useState(0);

  const menuArr = [{ name: "작성글" }, { name: "댓글" }, { name: "북마크" }];

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

  const currentClick = (index) => {
    setCurrent(index);
  };
  return (
    <>
      <s.MypageBtns>
        {menuArr.map((ele, index) => {
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
      </s.MypageBtns>

      <s.TitleContainer>
        <s.TitleDiv>
          {userWrite
            .map((item, id) =>
              current === 0 ? (
                <s.InfoContainer key={item.boardSeq}>
                  {item.category === "# 일반" ? (
                    <s.Info bgColor="#62B6B7">일반</s.Info>
                  ) : (
                    ""
                  )}
                  {item.category === "# 정보" ? (
                    <s.Info bgColor="#AEDC88">정보</s.Info>
                  ) : (
                    ""
                  )}
                  {item.category === "# 질문" ? (
                    <s.Info bgColor="#A6D9DE">질문</s.Info>
                  ) : (
                    ""
                  )}

                  <s.InfoContent>
                    <s.InfoTitle>
                      <s.StyledLink to={`/boards/${item.boardSeq}`}>
                        {item.title}
                      </s.StyledLink>
                    </s.InfoTitle>
                    <s.InfoComment>[{item.commented}]</s.InfoComment>
                  </s.InfoContent>

                  <s.InfoDate>
                    <FontAwesomeIcon
                      icon={faClock}
                      size="xs"
                      className="clock"
                    />
                    <ViewdateCommu createdAt={item.createdAt} />
                  </s.InfoDate>
                  <s.InfoView>
                    <FontAwesomeIcon icon={faEye} size="xs" className="eye" />
                    {item.viewCount}
                  </s.InfoView>
                  <s.InfoLike>
                    <FontAwesomeIcon icon={faHeart} size="xs" /> {item.liked}
                  </s.InfoLike>
                </s.InfoContainer>
              ) : (
                ""
              )
            )
            .reverse()}
          {userComment
            .map((item, id) =>
              current === 1 ? (
                <s.InfoContainer key={item.boardSeq}>
                  <s.Info bgColor="#62B6B7">댓글</s.Info>

                  <s.InfoContent>
                    <s.InfoTitle>
                      <s.StyledLink to={`/boards/${item.boardSeq}`}>
                        {item.content}
                      </s.StyledLink>
                    </s.InfoTitle>
                    <s.InfoComment></s.InfoComment>
                  </s.InfoContent>

                  <s.InfoDate>
                    <FontAwesomeIcon
                      icon={faClock}
                      size="xs"
                      className="clock"
                    />
                    <ViewdateCommu createdAt={item.createdAt} />
                  </s.InfoDate>
                  <s.InfoView>
                    <img
                      className="eye"
                      src={process.env.PUBLIC_URL + "/image/upVote.svg"}
                      alt="Up"
                      width="22px"
                    />
                    {item.liked}
                  </s.InfoView>
                  <s.InfoLike>
                    <img
                      src={process.env.PUBLIC_URL + "/image/downVote.svg"}
                      className="disliked"
                      alt="Down"
                      width="18px"
                      height="18px"
                    />
                    {item.disliked}
                  </s.InfoLike>
                </s.InfoContainer>
              ) : (
                ""
              )
            )
            .reverse()}
          {userBook
            .map((item, id) =>
              current === 2 ? (
                <s.InfoContainer key={item.boardSeq}>
                  {item.category === "# 일반" ? (
                    <s.Info bgColor="#62B6B7">일반</s.Info>
                  ) : (
                    ""
                  )}
                  {item.category === "# 정보" ? (
                    <s.Info bgColor="#AEDC88">정보</s.Info>
                  ) : (
                    ""
                  )}
                  {item.category === "# 질문" ? (
                    <s.Info bgColor="#A6D9DE">질문</s.Info>
                  ) : (
                    ""
                  )}

                  <s.InfoContent>
                    <s.InfoTitle>
                      <s.StyledLink to={`/boards/${item.boardSeq}`}>
                        {item.title}
                      </s.StyledLink>
                    </s.InfoTitle>
                    <s.InfoComment>[{item.commented}]</s.InfoComment>
                  </s.InfoContent>

                  <s.InfoDate>
                    <FontAwesomeIcon
                      icon={faClock}
                      size="xs"
                      className="clock"
                    />
                    <ViewdateCommu createdAt={item.createdAt} />
                  </s.InfoDate>
                  <s.InfoView>
                    <FontAwesomeIcon icon={faEye} size="xs" className="eye" />
                    {item.viewCount}
                  </s.InfoView>
                  <s.InfoLike>
                    <FontAwesomeIcon icon={faHeart} size="xs" /> {item.liked}
                  </s.InfoLike>
                </s.InfoContainer>
              ) : (
                ""
              )
            )
            .reverse()}
        </s.TitleDiv>
      </s.TitleContainer>
    </>
  );
};

export default MypageMenu;
