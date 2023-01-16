import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import jsonData from "../data/Posts";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
`;
const ComuContainer = styled.div`
  margin: 10px;
  width: 1336px;
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

const Pagination = styled.div``;

const Search = styled.div``;

const SearchInput = styled.input`
  background-color: ${({ theme }) => theme.colors.container};
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 300px;
  font-size: ${({ theme }) => theme.fontSizes.fs16};
`;

export default function Community() {
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const [data, setData] = useState([]);
  const arr = Array.from(jsonData);
  console.log(Array.isArray(arr));
  const [posts, setPosts] = useState(arr.slice(0, 2));
  const [pageNumber, setPageNumber] = useState(0);

  const postsPerPage = 10; // 페이지당 post 개수
  const pagesVisited = pageNumber * postsPerPage; // 사용자가 본 post 개수

  console.log(data);
  // console.log(posts);

  const displayPosts = posts.slice(pagesVisited, pagesVisited + postsPerPage);
  // .map((post) => {
  //   return (
  //     <Post>
  //       <PostHead>
  //         <PostHeadBox>정보</PostHeadBox>
  //       </PostHead>
  //       <PostTitleBox>
  //         <PostTitle>{post.title}</PostTitle>
  //         <PostComment>[1]</PostComment>
  //       </PostTitleBox>
  //       <PostDate>22/01/04</PostDate>
  //       <PostView>123</PostView>
  //       <PostLike>15</PostLike>
  //       <PostWriter>{post.id}</PostWriter>
  //     </Post>
  //   );
  // });
  // 각 페이지에 표시할 post 개수

  return (
    <>
      <Container>
        <ComuContainer>
          <TopBox>
            <CategoryWritingBtnBar>
              <Categories>
                <Cate>전체</Cate>
                <Cate>일반</Cate>
                <Cate>정보</Cate>
                <Cate>질문</Cate>
              </Categories>
              <WritingBtn>글 작성</WritingBtn>
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
            {data.map((post, i) => {
              return (
                <Post>
                  <PostHead>
                    <PostHeadBox>정보</PostHeadBox>
                  </PostHead>
                  <PostTitleBox>
                    <PostTitle>{post.title}</PostTitle>
                    <PostComment>[1]</PostComment>
                  </PostTitleBox>
                  <PostDate>22/01/04</PostDate>
                  <PostView>123</PostView>
                  <PostLike>15</PostLike>
                  <PostWriter>{post.id}</PostWriter>
                </Post>
              );
            })}
            {/* {posts
              .slice(pagesVisited, pagesVisited + postsPerPage)
              .map((post) => {
                return (
                  <Post>
                    <PostHead>
                      <PostHeadBox>정보</PostHeadBox>
                    </PostHead>
                    <PostTitleBox>
                      <PostTitle>{post.title}</PostTitle>
                      <PostComment>[1]</PostComment>
                    </PostTitleBox>
                    <PostDate>22/01/04</PostDate>
                    <PostView>123</PostView>
                    <PostLike>15</PostLike>
                    <PostWriter>{post.id}</PostWriter>
                  </Post>
                );
              })} */}
          </PostsList>
        </ComuContainer>
      </Container>
      <Pagination>1 2 3 4 5</Pagination>
      <Search>
        <SearchInput></SearchInput>
      </Search>
    </>
  );
}
