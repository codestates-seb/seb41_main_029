import React from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: #000;
  padding: 1px;
  /* border-top: 3px solid #186ead;
  border-bottom: 3px solid #186ead; */
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
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

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

const Paginations = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page-link">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Paginations;
