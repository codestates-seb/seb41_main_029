import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { useNavigate, Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeart,
  faClock,
  faEye,
  faFilter,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { ViewdateCommu } from "../../component/DateCalculator";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
} from "../../component/UserIcon";

const Container = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 10px; */
  margin: 50px 8px 0 8px;
`;
const ComuContainer = styled.div`
  width: 100%;
  max-width: 1336px;
`;

// 필터
const FilterDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
`;
const FilterList = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 10px 10px;
  background-color: ${({ theme }) => theme.colors.container};
  /* width: 230px; */
  padding: 13px 0px 13px 15px;
  border-radius: 15px;
  /* border-bottom: 2.3px solid ${({ theme }) => theme.colors.gray_01}; */
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs12};
    padding: 8px 0px 8px 10px;
    margin: 0 0 7px 7px;
  }
`;

const Filter = styled.div`
  margin-right: 15px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
  &:focus {
    font-weight: 600;
  }
  &:active {
    font-weight: 600;
  }
`;

// 리스트 윗 부분
const TopBox = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

// 카테고리 & 글작성 버튼이 있는 bar
const CategoryWritingBtnBar = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding: 30px; */
  padding: 25px 3%;
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray_01};
  @media (max-width: 600px) {
    /* font-size: ${({ theme }) => theme.fontSizes.fs16}; */
    padding: 21px 4%;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray_01};
  }
`;

const Categories = styled.div`
  display: flex;
`;

const Cate = styled.button`
  padding: 0 2px;
  margin-right: 20px;
  background-color: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
  &:focus {
    font-weight: 700;
  }
  &:active {
    font-weight: 700;
  }
  @media (max-width: 600px) {
    font-size: 15px;
  }
  @media (max-width: 450px) {
    margin-right: 5px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
`;

const FilterBtn = styled.div`
  font-size: 17px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const WritingBtn = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  margin-left: 30px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: #62b6b7;
  }
  &:focus {
    color: #62b6b7;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const PostInfoBarMargin = styled.div`
  /* height: 15px; */
`;

// 게시글 목록
const PostsList = styled.div``;
const Loading = styled.div`
  text-align: center;
  margin-top: 30px;
`;
const LoadingText = styled.div``;
const PostsError = styled.div`
  text-align: center;
  margin-top: 30px;
`;
const Post = styled.div`
  display: flex;
  align-items: center;
  height: 65px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_01};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  padding: 0 10px;
  &:hover {
    background-color: #fafafa;
  }
  @media (max-width: 800px) {
    font-size: 14px;
  }
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs12};
  }
`;

const PostHead = styled.div`
  /* width: 60px; */
  margin-left: 1.5%;
  width: 100%;
  max-width: 45px;
  display: flex;
  justify-content: center;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
    max-width: 35px;
  }
`;

const PostHeadBox = styled.div`
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5px 7px;
  color: #fff;
  border-radius: 10px;
  font-size: 13px;
  min-width: 20px;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;

const PostTitleBox = styled.div`
  width: 700px;
  display: flex;
  .ellipsis {
    /* width: 100%; */
    /* max-width: 500px; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  min-width: 80px;
  margin-right: 20px;
  @media (max-width: 600px) {
    .ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const PostTitle = styled.div`
  padding-left: 5px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const PostComment = styled.div`
  color: #aaa;
  /* ${({ theme }) => theme.colors.gray_03}; */
  padding-left: 5px;
  margin-top: 5px;
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  min-width: 200px;
  font-size: 15px;
  color: #aaa;
  @media (max-width: 800px) {
    font-size: ${({ theme }) => theme.fontSizes.fs12};
  }
  @media (max-width: 600px) {
    min-width: 65px;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;

const PostDate = styled.div`
  display: flex;
  justify-content: center;
  min-width: 65px;
  .clock {
    padding: 8% 3px 0 0;
  }
  @media (max-width: 600px) {
  }
`;

const PostView = styled.div`
  color: #d5a56d;
  @media (max-width: 600px) {
  }
`;

const PostLike = styled.div`
  color: #95cecf;
`;

const PostBookmark = styled.div`
  color: #a7d99a;
`;

const PostWriter = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  min-width: 100px;
  margin-left: 4%;
  @media (max-width: 1000px) {
    width: 320px;
    min-width: 70px;
  }
  @media (max-width: 800px) {
    width: 450px;
    min-width: 70px;
    font-size: 13px;
  }
  @media (max-width: 700px) {
    width: 630px;
    min-width: 70px;
    font-size: 13px;
  }
  @media (max-width: 600px) {
    min-width: 70px;
    margin-left: 150px;
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
  @media (max-width: 500px) {
    min-width: 70px;
    margin-left: 105px;
  }
  @media (max-width: 450px) {
    min-width: 70px;
    margin-left: 70px;
  }
  @media (max-width: 400px) {
    min-width: 70px;
    margin-left: 15px;
  }
`;

const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  margin: 50px 16px;
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    padding: 0.1rem 1rem;
    cursor: pointer;
  }
  li.previous a,
  li.next a {
    color: #62b6b7;
  }
  li.active a {
    color: #91cccd;
    font-weight: 700;
    min-width: 32px;
  }
  li.disabled a {
    color: ${({ theme }) => theme.colors.gray_03};
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
    li a {
      padding: 0.1rem 0.6rem;
    }
  }
`;

// 검색
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.container};
  width: 290px;
  border-radius: 10px;
  padding-right: 13px;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs12};
    width: 200px;
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  border-radius: 5px;
  outline: none;
  width: 280px;
  padding: 10px 10px 10px 13px;

  font-size: ${({ theme }) => theme.fontSizes.fs16};
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs12};
    width: 190px;
  }
`;
export default function Community() {
  const navigate = useNavigate();

  const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080`;

  // axios
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const limit = 15; // 한 페이지 당 게시글 수

  // 인증
  const cookies = new Cookies();
  const token = cookies.get("token");

  const [hasToken, setHasToken] = useState(false);

  // 필터링,카테고리,검색
  const [sortby, setSortby] = useState("최신순");
  const [cate, setCate] = useState(0); // 전체0, 일반1, 정보2, 질문3
  const [searchTerm, setSearchTerm] = useState("");

  // 페이지네이션
  const [page, setPage] = useState(0); // 1페이지로 초기화
  const [pageCount, setPageCount] = useState(0); // 페이지범위

  useEffect(() => {
    token ? setHasToken(true) : setHasToken(false);
  }, [token]);

  // 글작성 버튼 권한 처리
  const handleClick = () => {
    hasToken ? navigate("/writing") : alert("로그인을 먼저 진행해주세요");
  };

  //----------------------------------------------------------------------------

  // 정식 데이터 1페이지 조회
  const handleLoadAll = async (cate, sortby2) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${url}/boards/all${cate}?page=1&size=${limit}&sort-by=${sortby2}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      for (let key in res.data.body) {
        setItems(res.data.body[key]);
      }
      setLoading(false);
      setPage(0); // 페이지 초기화
      for (let key in res.data.body) {
        const total = key;
        setPageCount(total / limit);
      }
    } catch (err) {
      throw err;
    }
  };

  // 검색 데이터
  const handleLoadSearch = async (e) => {
    try {
      if (e.key === "Enter") {
        setLoading(true);
        const res = await axios.get(
          `${url}/boards/search?keyword=${searchTerm}&page=1&size=15`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setItems(res.data);
        setLoading(false);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    handleLoadAll("", "최신순");
  }, []);

  //----------------------------------------------------------------------------

  // 페이지네이션 데이터
  const axiosPosts = async (currentPage, cate) => {
    const res = await axios.get(
      `${url}/boards/all${cate}?page=${currentPage}&size=${limit}&sort-by=${sortby}`
    );
    for (let key in res.data.body) {
      const data = await res.data.body[key];
      return data;
    }
  };

  const handlePageClick = async (data) => {
    setPage(data.selected);
    let currentPage = data.selected + 1;
    let commentsFormServer = await axiosPosts(currentPage, "");
    setLoading(true);

    if (cate === 1) {
      commentsFormServer = await axiosPosts(currentPage, "/1");
    }

    if (cate === 2) {
      commentsFormServer = await axiosPosts(currentPage, "/2");
    }

    if (cate === 3) {
      commentsFormServer = await axiosPosts(currentPage, "/3");
    }

    setItems(commentsFormServer);
    setLoading(false);
  };

  return (
    <>
      <Container>
        <ComuContainer>
          <FilterDiv>
            <FilterList>
              <Filter>
                <FontAwesomeIcon icon={faFilter} color="#62B6B7" />
              </Filter>
              <Filter
                style={{ fontWeight: sortby === "최신순" ? "600" : "" }}
                onClick={() => {
                  setSortby("최신순");
                  if (cate === 0) {
                    handleLoadAll("", "최신순");
                  } else if (cate === 1) {
                    handleLoadAll("/1", "최신순");
                  } else if (cate === 2) {
                    handleLoadAll("/2", "최신순");
                  } else {
                    handleLoadAll("/3", "최신순");
                  }
                }}
              >
                최신순
              </Filter>
              <Filter
                style={{ fontWeight: sortby === "조회순" ? "600" : "" }}
                onClick={() => {
                  setSortby("조회순");
                  if (cate === 0) {
                    handleLoadAll("", "조회순");
                  } else if (cate === 1) {
                    handleLoadAll("/1", "조회순");
                  } else if (cate === 2) {
                    handleLoadAll("/2", "조회순");
                  } else {
                    handleLoadAll("/3", "조회순");
                  }
                }}
              >
                조회순
              </Filter>
              <Filter
                style={{ fontWeight: sortby === "추천순" ? "600" : "" }}
                onClick={() => {
                  setSortby("추천순");
                  if (cate === 0) {
                    handleLoadAll("", "추천순");
                  } else if (cate === 1) {
                    handleLoadAll("/1", "추천순");
                  } else if (cate === 2) {
                    handleLoadAll("/2", "추천순");
                  } else {
                    handleLoadAll("/3", "추천순");
                  }
                }}
              >
                추천순
              </Filter>
              <Filter
                style={{ fontWeight: sortby === "북마크순" ? "600" : "" }}
                onClick={() => {
                  setSortby("북마크순");
                  if (cate === 0) {
                    handleLoadAll("", "북마크순");
                  } else if (cate === 1) {
                    handleLoadAll("/1", "북마크순");
                  } else if (cate === 2) {
                    handleLoadAll("/2", "북마크순");
                  } else {
                    handleLoadAll("/3", "북마크순");
                  }
                }}
              >
                북마크순
              </Filter>
            </FilterList>
          </FilterDiv>
          <TopBox>
            <CategoryWritingBtnBar>
              <Categories>
                <Cate
                  style={{ fontWeight: cate === 0 ? "700" : "" }}
                  onClick={() => {
                    setCate(0);
                    handleLoadAll("", "최신순");
                  }}
                >
                  전체
                </Cate>
                <Cate
                  style={{ fontWeight: cate === 1 ? "700" : "" }}
                  onClick={() => {
                    setCate(1);
                    handleLoadAll("/1", "최신순");
                  }}
                >
                  일반
                </Cate>
                <Cate
                  style={{ fontWeight: cate === 2 ? "700" : "" }}
                  onClick={() => {
                    setCate(2);
                    handleLoadAll("/2", "최신순");
                  }}
                >
                  정보
                </Cate>
                <Cate
                  style={{ fontWeight: cate === 3 ? "700" : "" }}
                  onClick={() => {
                    setCate(3);
                    handleLoadAll("/3", "최신순");
                  }}
                >
                  질문
                </Cate>
                {/* {console.log(cate)} */}
              </Categories>

              <BtnBox>
                <WritingBtn onClick={handleClick}>글 작성</WritingBtn>
              </BtnBox>
            </CategoryWritingBtnBar>
            <PostInfoBarMargin></PostInfoBarMargin>
          </TopBox>
          <PostsList>
            {loading && (
              <Loading>
                <LoadingText>게시글을 받아오는 중입니다...</LoadingText>
                <img
                  src={process.env.PUBLIC_URL + "/image/Loading.gif"}
                  alt="Loading"
                  width="40px"
                />
              </Loading>
            )}
            {Array.isArray(items) && items.length > 0
              ? items.map((item) => {
                  return (
                    <StyledLink to={`/boards/${item.boardSeq}`}>
                      <Post key={item.boardSeq}>
                        <PostHead>
                          {item.category === "# 일반" ? (
                            <PostHeadBox bgColor="#6DB8B9">일반</PostHeadBox>
                          ) : (
                            ""
                          )}
                          {item.category === "# 정보" ? (
                            <PostHeadBox bgColor="#AEDC88">정보</PostHeadBox>
                          ) : (
                            ""
                          )}
                          {item.category === "# 질문" ? (
                            <PostHeadBox bgColor="#A6D9DE">질문</PostHeadBox>
                          ) : (
                            ""
                          )}
                        </PostHead>
                        <PostTitleBox>
                          <PostTitle className="ellipsis">
                            <StyledLink to={`/boards/${item.boardSeq}`}>
                              {item.title}
                            </StyledLink>
                          </PostTitle>

                          <PostComment>[{item.commented}]</PostComment>
                        </PostTitleBox>
                        <PostWriter>
                          {0 <= item.point && item.point <= 30 ? <Icon1 /> : ""}
                          {31 <= item.point && item.point <= 70 ? (
                            <Icon2 />
                          ) : (
                            ""
                          )}
                          {71 <= item.point && item.point <= 100 ? (
                            <Icon3 />
                          ) : (
                            ""
                          )}
                          {101 <= item.point && item.point <= 200 ? (
                            <Icon4 />
                          ) : (
                            ""
                          )}
                          {201 <= item.point && item.point <= 300 ? (
                            <Icon5 />
                          ) : (
                            ""
                          )}
                          {301 <= item.point ? <Icon6 /> : ""} {item.username}
                        </PostWriter>
                        <PostInfo>
                          <PostDate>
                            <FontAwesomeIcon
                              icon={faClock}
                              size="xs"
                              className="clock"
                            />{" "}
                            <ViewdateCommu createdAt={item.createdAt} />
                          </PostDate>
                          <PostView>
                            <FontAwesomeIcon icon={faEye} size="xs" />{" "}
                            {item.viewCount}
                          </PostView>
                          <PostLike>
                            <FontAwesomeIcon icon={faHeart} size="xs" />{" "}
                            {item.likeCount}
                          </PostLike>
                          <PostBookmark>
                            <FontAwesomeIcon icon={faBookmark} size="xs" />{" "}
                            {item.bookmarkCount}
                          </PostBookmark>
                        </PostInfo>
                      </Post>
                    </StyledLink>
                  );
                })
              : ""}
          </PostsList>
        </ComuContainer>
      </Container>
      <MyPaginate
        forcePage={page}
        previousLabel={"〈"}
        nextLabel={"〉"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
      <SearchContainer>
        <Search>
          <SearchInput
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={handleLoadSearch}
          ></SearchInput>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" size="lg" />
        </Search>
      </SearchContainer>
      {/* <Icon1 />
      <Icon2 />
      <Icon3 />
      <Icon4 />
      <Icon5 />
      <Icon6 /> */}
    </>
  );
}
