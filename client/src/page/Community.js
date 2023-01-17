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

// 페이지네이션
const Paginate = styled.div`
  /* display: flex;
  justify-content: center;
  list-style-type: none;
  text-align: center; */
`;

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redefine classes here, if you want.
  activeClassName: "active", // default to "selected"
})`
  margin: 50px 0px;
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

export default function Community() {
  // axios
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);

  // search
  const [searchTerm, setSearchTerm] = useState("");

  // 왜 데이터 500개 다받아오지?

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?_page=1&_limit=5`)
      .then((res) => {
        console.log(res.data);
        const total = res.headers.get("x-total-count");
        console.log(total);
        setItems(res.data);
        // 여기서 filter 적용하는건???
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments`)
      .then((res) => {
        console.log(res.data);
        setSearchItems(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const axiosPosts = async (currentPage) => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=5`
    );
    const data = await res.data;
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await axiosPosts(currentPage);

    setItems(commentsFormServer);
  };

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
            {/* 애초에 items가 _page=1&_limit=5의 데이터인데,
            여기다가 .filter하면 당연히 그 데이터만 나오겠지
            근데 모든 데이터를 나오게 하면, 페이지네이션은 어떻게 하지..
            페이지네이션하려고 제한된 데이터를 받아온건데..?
            삼항연산자를 써서 페이지네이션 시에는 분리된 데이터를 쓰고,
            검색할때는 전체 데이터를 써야하나??????? */}

            {/* 삼항연산자로 구현하려하니까 검색으로 추려진 데이터를 또 페이지네이션 해야하는데.. 
            원래는 애초에 한페이지씩 잘라진 데이터를 받아왔는데.. 이 경우 어떻게 해야하지?  */}

            {/* 카테고리 필터로 게시글 띄울때도 같은 문제... 즉.. 추려진 데이터를 또 페이지네이션 하려면
            전체 데이터를 받아와서 페이지네이션 하는 방법을 찾아야할듯? */}
            {items
              .filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (item.name.includes(searchTerm)) {
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
                      <PostTitle>{item.name}</PostTitle>
                      <PostComment>[1]</PostComment>
                    </PostTitleBox>
                    <PostDate>22/01/04</PostDate>
                    <PostView>123</PostView>
                    <PostLike>15</PostLike>
                    <PostWriter>{item.id}</PostWriter>
                  </Post>
                );
              })}
          </PostsList>
        </ComuContainer>
      </Container>
      <Paginate>
        <MyPaginate
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
        />
      </Paginate>
      <Search>
        <SearchInput
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></SearchInput>
      </Search>
    </>
  );
}
