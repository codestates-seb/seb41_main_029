import React from "react";
import styled from "styled-components";

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

// 페이지네이션

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

const Posts = ({ posts, loading, searchTerm }) => {
  return (
    <>
      {loading && <div> loading... </div>}
      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}
      {posts
        .filter((item) => {
          if (searchTerm === "") {
            return item;
          } else if (item.title.includes(searchTerm)) {
            return item;
          }
        })
        .map((item) => {
          return (
            <Post key={item.id}>
              <PostHead>
                <PostHeadBox>정보</PostHeadBox>
              </PostHead>
              <PostTitleBox>
                <PostTitle>{item.title}</PostTitle>
                <PostComment>[1]</PostComment>
              </PostTitleBox>
              <PostDate>22/01/04</PostDate>
              <PostView>123</PostView>
              <PostLike>15</PostLike>
              <PostWriter>{item.id}</PostWriter>
            </Post>
          );
        })}
    </>
  );
};
export default Posts;
