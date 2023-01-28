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
  faCircleUser,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { ViewdateCommu } from "../../component/DateCalculator";
import Box from "@mui/material/Box";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
    padding: 23px 4%;
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
    font-size: 15px;
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
  padding: 3px 8px;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  min-width: 20px;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;

const PostTitleBox = styled.div`
  width: 700px;
  display: flex;
  /* .ellipsis {
    width: 100%;
    max-width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  } */
  /* @media (max-width: 800px) {
    .ellipsis {
      width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    } */
  min-width: 80px;
  margin-right: 20px;
  @media (max-width: 600px) {
    width: 400px;
    .ellipsis {
      /* width: 130px; */
      width: 100%;
      min-width: 80px;
      // width 말고 다른 속성 써야하나?
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
  /* ${({ theme }) => theme.colors.gray_03}; */
  @media (max-width: 800px) {
    /* min-width: 65px;
    display: flex;
    flex-direction: column;
    margin-left: 10px; */
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
  min-width: 65px;
  .clock {
    padding: 7px 3px 0 0;
  }
`;

const PostView = styled.div`
  @media (max-width: 600px) {
  }
`;

const PostLike = styled.div``;

const PostWriter = styled.div`
  width: 200px;
  min-width: 100px;
  margin-left: 4%;
  /* @media (max-width: 1200px) {
    width: 180px;
    min-width: 70px;
  }
  @media (max-width: 1000px) {
    width: 250px;
    min-width: 70px;
  }
  @media (max-width: 800px) {
    width: 360px;
    min-width: 70px;
  }
  @media (max-width: 700px) {
    width: 400px;
    min-width: 70px;
  } */
  @media (max-width: 1000px) {
    width: 300px;
    min-width: 70px;
  }
  @media (max-width: 700px) {
    width: 450px;
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
  // You can redefine classes here, if you want.
  activeClassName: "active", // default to "selected"
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
    /* background-color: #62b6b7;
    color: white; */
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
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray_01};
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

  const url =
    "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";

  // axios
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const limit = 10; // 한 페이지 당 게시글 수

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
      // console.log(res.data);
      console.log(res.data.body);

      for (let key in res.data.body) {
        // console.log(key);
        console.log(res.data.body[key]);
        setItems(res.data.body[key]);
      }

      // setItems(res.data.body);
      setLoading(false);
      setPage(0); // 페이지 초기화
      for (let key in res.data.body) {
        // console.log(key);
        const total = key;
        setPageCount(total / limit);
      }
    } catch (err) {
      throw err;
    }
  };

  // 카테고리별 데이터 1페이지 조회
  const handleLoadCate = async (cate) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${url}/boards/all/${cate}?page=1&size=${limit}&sort-by=${sortby}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setLoading(false);
      // console.log(res.data);
      for (let key in res.data.body) {
        // console.log(key);
        console.log(res.data.body[key]);
        setItems(res.data.body[key]);
      }
      // setItems(res.data.body);
      setLoading(false);
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
        // setPosts(response.data);
        // setLoading(false);
        // console.log(res.data);
        for (let key in res.data.body) {
          // console.log(key);
          console.log(res.data.body[key]);
          setItems(res.data.body[key]);
        }
        // setItems(res.data.body[2]);
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
      // console.log(key);
      console.log(res.data.body[key]);
      const data = await res.data.body[key];
      return data;
    }
    // const data = await res.data.body[2];
    // return data;
  };

  const axiosPostsCate = async (currentPage, cate) => {
    const res = await axios.get(
      `${url}/boards/all/${cate}?page=${currentPage}&size=${limit}&sort-by=${sortby}`
    );
    for (let key in res.data.body) {
      // console.log(key);
      console.log(res.data.body[key]);
      const data = await res.data.body[key];
      return data;
    }
    // const data = await res.data.body[2];
    // return data;
  };

  const handlePageClick = async (data) => {
    // console.log(data.selected);
    setPage(data.selected);
    let currentPage = data.selected + 1;
    let commentsFormServer = await axiosPosts(currentPage, "");
    setLoading(true);

    if (cate === 1) {
      // commentsFormServer = await axiosPostsCate(currentPage, 1);
      commentsFormServer = await axiosPosts(currentPage, "/1");
    }

    if (cate === 2) {
      // commentsFormServer = await axiosPostsCate(currentPage, 2);
      commentsFormServer = await axiosPosts(currentPage, "/2");
    }

    if (cate === 3) {
      // commentsFormServer = await axiosPostsCate(currentPage, 3);
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
                <FontAwesomeIcon icon={faFilter} size="xs" color="#62B6B7" />
              </Filter>
              <Filter>최신순</Filter>
              <Filter>조회순</Filter>
              <Filter>추천순</Filter>
              <Filter>북마크순</Filter>
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
                    // handleLoadCate(1);
                    handleLoadAll("/1", "최신순");
                  }}
                >
                  일반
                </Cate>
                <Cate
                  style={{ fontWeight: cate === 2 ? "700" : "" }}
                  onClick={() => {
                    setCate(2);
                    // handleLoadCate(2);
                    handleLoadAll("/2", "최신순");
                  }}
                >
                  정보
                </Cate>
                <Cate
                  style={{ fontWeight: cate === 3 ? "700" : "" }}
                  onClick={() => {
                    setCate(3);
                    // handleLoadCate(3);
                    handleLoadAll("/3", "최신순");
                  }}
                >
                  질문
                </Cate>
                {console.log(cate)}
              </Categories>
              <BtnBox>
                {/* <FilterBtn>
                  <FontAwesomeIcon icon={faFilter} size="xs" color="gray" />{" "}
                  FILTER
                </FilterBtn> */}
                <WritingBtn onClick={handleClick}>글 작성</WritingBtn>
              </BtnBox>
            </CategoryWritingBtnBar>
            <PostInfoBarMargin></PostInfoBarMargin>
          </TopBox>
          <PostsList>
            {loading && <Loading>게시글을 받아오는 중입니다... </Loading>}
            {Array.isArray(items) && items.length > 0
              ? items.map((item) => {
                  return (
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
                      {/* <PostBox> */}

                      <PostTitleBox>
                        <PostTitle className="ellipsis">
                          <StyledLink to={`/boards/${item.boardSeq}`}>
                            {item.title}
                          </StyledLink>
                        </PostTitle>

                        <PostComment>[{item.commented}]</PostComment>
                      </PostTitleBox>
                      {/* <PostInfo>
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
                      </PostInfo> */}
                      {/* </PostBox> */}
                      <PostWriter>
                        <FontAwesomeIcon
                          icon={faCircleUser}
                          size="lg"
                          color="gray"
                        />{" "}
                        {item.username}
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
                      </PostInfo>
                    </Post>
                  );
                })
              : // : Array.isArray(items) && items.length === 0 ? (
                //   <PostsError>작성된 게시글이 없습니다.</PostsError>
                // )
                ""}
            {/* // : (
            //   <PostsError>게시글을 받아올 수 없습니다.</PostsError>
            // )
          } */}
          </PostsList>
        </ComuContainer>
      </Container>
      <MyPaginate
        forcePage={page}
        previousLabel={"〈"}
        nextLabel={"〉"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={2}
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
      <Filter1
        onClick={() => {
          // handleLoadAll("", "최신순");
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
      </Filter1>
      <Filter2
        onClick={() => {
          // handleLoadAll("", "조회순");
          // cate에 따라 작동 나누기
          if (cate === 0) {
            handleLoadAll("", "조회순");
          } else if (cate === 1) {
            handleLoadAll("/1", "조회순");
          } else if (cate === 2) {
            handleLoadAll("/2", "조회순");
          } else {
            handleLoadAll("/3", "조회순");
          }
          // cate === 1 ? handleLoadAll("/1", "조회순") : "";
        }}
      >
        조회순
      </Filter2>
      <Filter3
        onClick={() => {
          // handleLoadAll("", "추천순");
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
      </Filter3>
      <Filter4
        onClick={() => {
          // handleLoadAll("", "북마크순");
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
      </Filter4>
      {/* <Mui /> */}
      <MuiContainer>
        <CategoryBox sx={{ minWidth: 180 }}>
          <CategoryFormControl>
            <CategoryInputLabel id="demo-simple-select-label">
              <span className="CategorySpan">
                <FontAwesomeIcon icon={faFilter} size="xs" color="gray" />
                FILTER
              </span>
              {/* 카테고리 */}
            </CategoryInputLabel>
            <CategorySelect
              sx={{
                // 카테고리 테두리 지우는 부분
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={category}
              label="category"
              // onChange={handleChange}
            >
              <CategoryMenuItem value={"GENERAL"}>최신순</CategoryMenuItem>
              <CategoryMenuItem value={"INFORMATION"}>조회순</CategoryMenuItem>
              <CategoryMenuItem value={"QUESTION"}>추천순</CategoryMenuItem>
              <CategoryMenuItem value={"QUESTION"}>북마크순</CategoryMenuItem>
            </CategorySelect>
          </CategoryFormControl>
        </CategoryBox>
      </MuiContainer>
      <ViewdateCommu></ViewdateCommu>
    </>
  );
}

const FilterDiv = styled.div`
  display: flex;
  justify-content: flex-end;
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
  border-bottom: 2.3px solid ${({ theme }) => theme.colors.gray_01};
`;

const Filter = styled.div`
  margin-right: 15px;
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
`;

const Filter1 = styled.div``;
const Filter2 = styled.div``;
const Filter3 = styled.div``;
const Filter4 = styled.div``;

const MuiContainer = styled.div`
  button {
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }
`;
const CategoryBox = styled(Box)`
  width: 180px;

  @media (max-width: 1336px) {
    width: 100%;
    margin-top: 8%;
  }
  @media (max-width: 456px) {
    margin-top: 27%;
  }
  // 방금 한것
  .css-1nrlq1o-MuiFormControl-root {
    @media (max-width: 1336px) {
    }
  }
`;
// 카테고리 글씨 움직이는 틀
const CategoryInputLabel = styled(InputLabel)`
  width: 100%;
  margin: -8px 0 0px 12px;

  .CategorySpan {
    @media (max-width: 1336px) {
      font-size: 14px;
    }
  }

  /* @media (max-width: 1336px) {
    width: 50%;
    font-size: 12px;
  } */
`;
//.
const CategorySelect = styled(Select)`
  height: 40px;
  width: 130px;

  // icon
  // 반응형을 줬을 때 아이콘이 변함
  .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon {
    color: ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fontSizes.fs24};
    margin-right: 8px;

    @media (max-width: 1336px) {
      width: 30%;
    }
  }
`;
// 전체 크기
const CategoryFormControl = styled(FormControl)`
  width: 100%;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  label {
    font-weight: 800;
    font-family: "Noto Sans CJK KR";
  }
  // X
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select {
    margin: 8px 0 0 12px;
    font-size: ${({ theme }) => theme.fontSizes.fs18};
  }
  // x
  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root {
    display: none;
  }
  //전체 크기
  @media (max-width: 1336px) {
    width: 75%;
  }
  /* @media (max-width: 850px) {
    width: 75%;
    background-color: black;
  } */

  .css-1m5xwth-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root {
    @media (max-width: 850px) {
    }
  }
`;
const CategoryMenuItem = styled(MenuItem)``;
