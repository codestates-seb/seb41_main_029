import React from "react";
import styled from "styled-components";

export const UserIcon = () => {
  return <div>UserIcon</div>;
};


const IconTestXS = styled.div`
  margin: 10px;
  background-color: #f2f2f2;
  /* ${({ theme }) => theme.colors.container}; */
  border: 1px solid #ccc;
  /* width: 17px;
  height: 17px; */
  width: 17px;
  height: 17px;
  border-radius: 17px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 2px 2px #ddd;
  @media (max-width: 600px) {
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }