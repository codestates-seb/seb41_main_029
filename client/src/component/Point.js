import React from "react";
import styled from "styled-components";
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6 } from "./UserIcon";
const Point1 = styled.div`
  margin-bottom: 80px;
`;

export const Point = ({ score }) => {
  return (
    <>
      <Point1>
        {0 <= score && score <= 30 ? <Icon1 /> : ""}
        {31 <= score && score <= 70 ? <Icon2 /> : ""}
        {71 <= score && score <= 100 ? <Icon3 /> : ""}
        {101 <= score && score <= 200 ? <Icon4 /> : ""}
        {201 <= score && score <= 300 ? <Icon5 /> : ""}
        {301 <= score ? <Icon6 /> : ""}
      </Point1>
    </>
  );
};
