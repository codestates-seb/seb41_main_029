import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import jsonData from "../../data/Posts";
import { useNavigate, Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 10px; */
  margin: 50px 16px 0 16px;
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
  padding: 20px 3%;
  border-bottom: 1px solid #92bdbd;
  /* font-size: ${({ theme }) => theme.fontSizes.fs24}; */
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs16};
  }
`;

const Categories = styled.div`
  display: flex;
`;

const Cate = styled.div`
  padding: 2px;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    color: #62b6b7;
  }
`;

const WritingBtn = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  cursor: pointer;
  &:hover {
    color: #62b6b7;
  }
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs16};
  }
`;

// 제목,날짜,조회 등이 있는 bar
const PostInfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs16};
  }
`;

const TitleInfo = styled.div`
  width: 816px;
  text-align: center;
`;

const PostInfo = styled.div`
  width: 150px;
  text-align: center;
  border-left: 1px solid #000;
`;

const PostInfoMini = styled.div`
  width: 110px;
  text-align: center;
  border-left: 1px solid #000;
`;

const PostInfoBarMargin = styled.div`
  height: 15px;
`;

// 게시글 목록
const PostsList = styled.div``;
const Post = styled.div`
  display: flex;
  align-items: center;
  /* height: 90px; */
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_02};
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  padding: 0 10px;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs12};
  }
`;

const PostHead = styled.div`
  /* width: 60px; */
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
  // 카테고리에 따라 색 변경
  /* background-color: #62b6b7; */
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;

const PostTitleBox = styled.div`
  width: 756px;
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
  @media (max-width: 600px) {
    .ellipsis {
      width: 200px;
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
  color: ${({ theme }) => theme.colors.gray_03};
  padding-left: 5px;
  margin-top: 5px;
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;

const PostDate = styled.div`
  width: 150px;
  text-align: center;
`;

const PostView = styled.div`
  width: 110px;
  text-align: center;
  color:
  /* #a67b48; */ gray;
`;

const PostLike = styled.div`
  width: 110px;
  text-align: center;
  color:
  /* #95cecf; */ gray;
`;

const PostWriter = styled.div`
  width: 150px;
  text-align: center;
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
    border-radius: 7px;
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

  // axios
  const [items, setItems] = useState([]);

  // 페이지네이션
  const [current, setCurrent] = useState(0);
  const limit = 3;

  // 인증
  const cookies = new Cookies();
  const token = cookies.get("token");

  const [hasToken, setHasToken] = useState(false);

  // 필터링,카테고리,검색
  const [sortby, setSortby] = useState("최신순");
  const [cate, setCate] = useState(0); // 전체0, 일반1, 정보2, 질문3
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    token ? setHasToken(true) : setHasToken(false);
  }, [token]);

  const handleClick = () => {
    hasToken ? navigate("/writing") : alert("로그인을 먼저 진행해주세요");
  };

  // 탭메뉴
  const categories = [
    { name: "전체" },
    { name: "일반" },
    { name: "정보" },
    { name: "질문" },
  ];

  const currentClick = (index) => {
    setCurrent(index);
    console.log(current);
  };

  //----------------------------------------------------------------------------

  // 정식 데이터 전체조회 (axios.async/awit)
  const url =
    "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";

  const handleLoadAll = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(
        `${url}/boards/all?page=1&size=${limit}&sort-by=${sortby}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setPosts(response.data);
      // setLoading(false);
      console.log(res.data);
      setItems(res.data);
    } catch (err) {
      throw err;
    }
  };

  // 카테고리별 데이터
  const handleLoadGeneral = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(
        `${url}/boards/all/1?page=1&size=${limit}&sort-by=${sortby}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setPosts(response.data);
      // setLoading(false);
      console.log(res.data);
      setItems(res.data);
    } catch (err) {
      throw err;
    }
  };

  const handleLoadInfo = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(
        `${url}/boards/all/2?page=1&size=${limit}&sort-by=${sortby}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setPosts(response.data);
      // setLoading(false);
      console.log(res.data);
      setItems(res.data);
    } catch (err) {
      throw err;
    }
  };

  const handleLoadQues = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(
        `${url}/boards/all/3?page=1&size=${limit}&sort-by=${sortby}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setPosts(response.data);
      // setLoading(false);
      console.log(res.data);
      setItems(res.data);
    } catch (err) {
      throw err;
    }
  };

  // 검색 데이터
  const handleLoadSearch = async () => {
    //   try {
    //     // setLoading(true);
    //     const res = await axios.get(
    //       `${url}/boards/all/{category-id}?page=1&size=${limit}&sort-by=${sortby}`
    // `${url}/boards/search?keyword = ${searchTitle}&page=1&size=${limit}`
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           // Authorization: token,
    //         },
    //       }
    //     );
    //     // setPosts(response.data);
    //     // setLoading(false);
    //     console.log(res.data);
    //     setItems(res.data);
    //   } catch (err) {
    //     throw err;
    //   }
  };

  useEffect(() => {
    handleLoadAll();
  }, []);

  //----------------------------------------------------------------------------

  // 페이지네이션 데이터
  const axiosPosts = async (currentPage) => {
    const url =
      "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";

    const res = await axios.get(
      `${url}/boards/all?page=${currentPage}&size=${limit}&sort-by=${sortby}`
    );
    const data = await res.data;
    return data;
  };

  const axiosPostsG = async (currentPage) => {
    const url =
      "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";

    const res = await axios.get(
      `${url}/boards/all/1?page=${currentPage}&size=${limit}&sort-by=${sortby}`
    );
    const data = await res.data;
    return data;
  };

  const axiosPostsI = async (currentPage) => {
    const url =
      "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";

    const res = await axios.get(
      `${url}/boards/all/2?page=${currentPage}&size=${limit}&sort-by=${sortby}`
    );
    const data = await res.data;
    return data;
  };

  const axiosPostsQ = async (currentPage) => {
    const url =
      "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";

    const res = await axios.get(
      `${url}/boards/all/3?page=${currentPage}&size=${limit}&sort-by=${sortby}`
    );
    const data = await res.data;
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    let commentsFormServer = await axiosPosts(currentPage);

    if (cate === 1) {
      commentsFormServer = await axiosPostsG(currentPage);
    }

    if (cate === 2) {
      commentsFormServer = await axiosPostsI(currentPage);
    }

    if (cate === 3) {
      commentsFormServer = await axiosPostsQ(currentPage);
    }

    setItems(commentsFormServer);
  };

  // search
  const [searchTerm, setSearchTerm] = useState("");

  // 날짜 변환
  const value = "2023-01-22T11:17:31.407494";
  const date = new Date(value);
  // console.log(date);
  // const year = date.getFullYear();
  // const year2 = year.slice(-2);
  // console.log(year2);
  var str =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  console.log(str);

  return (
    <>
      <Container>
        <ComuContainer>
          <TopBox>
            <CategoryWritingBtnBar>
              <Categories>
                <Cate
                  onClick={() => {
                    setCate(0);
                    handleLoadAll();
                  }}
                >
                  전체
                </Cate>
                <Cate
                  onClick={() => {
                    setCate(1);
                    // handleLoadCate();
                    handleLoadGeneral();
                  }}
                >
                  일반
                </Cate>
                <Cate
                  onClick={() => {
                    setCate(2);
                    // handleLoadCate();
                    handleLoadInfo();
                  }}
                >
                  정보
                </Cate>
                <Cate
                  onClick={() => {
                    setCate(3);
                    // handleLoadCate();
                    handleLoadQues();
                  }}
                >
                  질문
                </Cate>
                {console.log(cate)}
              </Categories>
              <WritingBtn onClick={handleClick}>글 작성</WritingBtn>
            </CategoryWritingBtnBar>
            <PostInfoBar>
              <TitleInfo>제목</TitleInfo>
              <PostInfo onClick={() => setSortby("최신순")}>날짜</PostInfo>
              <PostInfoMini onClick={() => setSortby("조회순")}>
                조회
              </PostInfoMini>
              <PostInfoMini onClick={() => setSortby("추천순")}>
                추천
              </PostInfoMini>
              <PostInfo>닉네임</PostInfo>
            </PostInfoBar>
            <PostInfoBarMargin></PostInfoBarMargin>
          </TopBox>
          <PostsList>
            {items
              // .filter((item) => {
              //   if (searchTerm === "") {
              //     return item;
              //   } else if (item.name.includes(searchTerm)) {
              //     return item;
              //   }
              // })
              .map((item) => {
                // console.log(item.id);
                // const handleTitleClick = (item) => {
                //   // navigate(`/view2/${questionItem.questionId}`);
                //   navigate(`/view2/${item.id}`);
                // };
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
                    <PostTitleBox>
                      <PostTitle className="ellipsis">
                        <StyledLink to={`/boards/${item.boardSeq}`}>
                          {item.title}
                        </StyledLink>
                      </PostTitle>

                      <PostComment>[1]</PostComment>
                    </PostTitleBox>
                    <PostDate>
                      23/01/04
                      {/* {item.createdAt} */}
                    </PostDate>
                    <PostView>{item.viewCount}</PostView>
                    <PostLike>{item.likeCount}</PostLike>
                    <PostWriter>
                      {/* {item.boardSeq} */}
                      {item.username}
                    </PostWriter>
                  </Post>
                );
              })}
          </PostsList>
        </ComuContainer>
      </Container>
      <MyPaginate
        previousLabel={"〈"}
        nextLabel={"〉"}
        breakLabel={"..."}
        pageCount={15}
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
          ></SearchInput>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" size="lg" />
        </Search>
      </SearchContainer>
      <Tabmenutest>
        {categories.map((el, i) => {
          return (
            <div className="Btn">
              <span
                key={i}
                className={current === i ? "submenu focused" : "submenu"}
                onClick={() => currentClick(i)}
              >
                {el.name}
              </span>
            </div>
          );
        })}
      </Tabmenutest>
      {items.map((item) => (current === 0 ? <div>0</div> : ""))}
      {items.map((item) => (current === 1 ? <div>1</div> : ""))}
      {items.map((item) => (current === 2 ? <div>2</div> : ""))}
      {items.map((item) => (current === 3 ? <div>3</div> : ""))}
    </>
  );
}

const Tabmenutest = styled.div`
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
    color: #000;
    /* background-color: #bfbfbf; */
    font-size: 16px;
    &:hover {
      /* background-color: #828282; */
      font-weight: 700;
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
    /* background-color: gray; */
    font-weight: 700;

    &:hover {
      /* background-color: gray; */
      font-weight: 700;
    }
  }
`;
