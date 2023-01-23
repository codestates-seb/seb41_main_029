import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";
import Pagination from "./Pagination";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
`;
const ComuContainer = styled.div`
  margin: 10px;
  width: 100%;
  max-width: 1336px;
  height: 600px;
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
  padding: 30px;
  border-bottom: 1px solid #c5ac90;
  font-size: ${({ theme }) => theme.fontSizes.fs24};
`;

const Categories = styled.div`
  display: flex;
`;

const Cate = styled.div`
  padding: 2px;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    color: #91cccd;
    /* background-color: #62b6b7; */
  }
  &:focus::after {
    color: #91cccd;
    /* background-color: #62b6b7; */
  }
`;

const WritingBtn = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs24};
  cursor: pointer;
`;

// 제목,날짜,조회 등이 있는 bar
const PostInfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: ${({ theme }) => theme.fontSizes.fs18};
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
  height: 90px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_03};
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  padding: 0 10px;
`;

const PostHead = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
`;

const PostHeadBox = styled.div`
  background-color: #62b6b7;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
`;

const PostTitleBox = styled.div`
  width: 756px;
  display: flex;
`;

const PostTitle = styled.div`
  padding-left: 5px;
  cursor: pointer;
`;
const PostComment = styled.div`
  color: ${({ theme }) => theme.colors.gray_03};
  padding-left: 5px;
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  cursor: pointer;
`;

const PostDate = styled.div`
  width: 150px;
  text-align: center;
`;

const PostView = styled.div`
  width: 110px;
  text-align: center;
  color: #a67b48;
`;

const PostLike = styled.div`
  width: 110px;
  text-align: center;
  color: #95cecf;
`;

const PostWriter = styled.div`
  width: 150px;
  text-align: center;
`;

// 검색
const Search = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  background-color: ${({ theme }) => theme.colors.container};
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 300px;
  font-size: ${({ theme }) => theme.fontSizes.fs16};
`;

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  // search
  const [searchTerm, setSearchTerm] = useState("");

  // 더미 데이터
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // const token = Cookies.get(token);

  // 정식 데이터 전체조회 (axios.async/awit)
  // useEffect(() => {
  //   const url = "http://ec2-54-180-55-239.ap-northeast-2.compute.amazonaws.com:8080";
  //   const token = localStorage.getItem("accessToken");

  //   const fetchData = async () => {
  //     try{
  //       setLoading(true);
  //       const response = await axios.get(`${url}/boards?page=1&size=15`, {
  //                 headers: {
  //                   Accept: "application/json",
  //                   Authorization: token,
  //                 },
  //               })
  //       setPosts(response.data);
  //       setLoading(false);
  //     } catch(err) {
  //       throw err;
  //     }
  //   };
  //   fetchData();
  // }, []);

  // 정식 데이터 세부조회 (axios.async/awit)
  // useEffect(() => {
  //   const url = "http://ec2-54-180-55-239.ap-northeast-2.compute.amazonaws.com:8080";
  //   const token = localStorage.getItem("accessToken");

  //   const fetchData = async () => {
  //     try{
  //       setLoading(true);
  //       const response = await axios.get(`${url}/boards/1`, {
  //                 headers: {
  //                   Accept: "application/json",
  //                   Authorization: token,
  //                 },
  //               })
  //       setPosts(response.data);
  //       setLoading(false);
  //     } catch(err) {
  //       throw err;
  //     }
  //   };
  //   fetchData();
  // }, []);

  // 상세 조회 데이터 조회.. 유즈파람스 사용?
  // 전체 게시글을 띄우고, 특정 게시물을 클릭하면 특정 게시물 조회
  // 그러면.. {post.title}에 onClick = axios 요청?

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  currentPosts(posts);

  return (
    // <div className="App">
    //   <Posts posts={currentPosts(posts)} loading={loading}></Posts>

    //   {/* Posts */}
    //   {/* {loading && <div> loading... </div>}
    //   <ul>
    //     {posts.map((post) => (
    //       <li key={post.id}>{post.title}</li>
    //     ))}
    //   </ul> */}

    //   <Pagination
    //     postsPerPage={postsPerPage}
    //     totalPosts={posts.length}
    //     paginate={setCurrentPage}
    //   ></Pagination>
    // </div>

    <>
      <Container>
        <ComuContainer>
          <TopBox>
            <CategoryWritingBtnBar>
              <Categories>
                <Cate>
                  {/* 왜 전체 link가 안되지? */}
                  <Link to="/community">전체</Link>
                </Cate>
                <Cate>
                  <Link to="/community/general">일반</Link>
                </Cate>
                <Cate>
                  <Link to="/community/information">정보</Link>
                </Cate>
                <Cate>
                  <Link to="/community/question">질문</Link>
                </Cate>
              </Categories>
              <WritingBtn>
                {/* Link writing 로그인 권한 설정하기 */}
                <Link to="/writing">글 작성</Link>
              </WritingBtn>
            </CategoryWritingBtnBar>
            <PostInfoBar>
              <TitleInfo>제목</TitleInfo>
              <PostInfo>날짜</PostInfo>
              <PostInfoMini>조회</PostInfoMini>
              <PostInfoMini>추천</PostInfoMini>
              <PostInfo>닉네임</PostInfo>
            </PostInfoBar>
            <PostInfoBarMargin></PostInfoBarMargin>
          </TopBox>
          <PostsList>
            <Posts
              posts={currentPosts(posts)}
              loading={loading}
              searchTerm={searchTerm}
            ></Posts>
            {/* {Posts.map((res) => {
              return <Mealitem data={res} />;
            })} */}
          </PostsList>
        </ComuContainer>
      </Container>
      {/* <MyPaginate
  previousLabel={"〈"}
  nextLabel={"〉"}
  breakLabel={"..."}
  pageCount={25}
  marginPagesDisplayed={3}
  pageRangeDisplayed={6}
  onPageChange={handlePageClick}
  containerClassName="pagination justify-content-center"
  pageClassName="page-item"
  pageLinkClassName="page-link"
  previousClassName="page-item"
  previousLinkClassName="page-link"
  nextClassName="page-item"
  nextLinkClassName="page-link"
  activeClassName="active"
/> */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={setCurrentPage}
      ></Pagination>
      <Search>
        <SearchInput
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          //   value={searchTerm}
          //   onKeyDown={searchPost}
        ></SearchInput>
      </Search>
    </>
  );
}

export default App;
