import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faLemon,
  faTree,
  faMountain,
  faMountainSun,
  faCannabis,
} from "@fortawesome/free-solid-svg-icons";

export const Icon1 = () => {
  return (
    <IconTestXS>
      <FontAwesomeIcon icon={faLemon} color="#D5A56D" size="xs" />
    </IconTestXS>
  );
};

export const Icon2 = () => {
  return (
    <IconTestXS>
      <FontAwesomeIcon icon={faSeedling} color="#AAC9C9" size="xs" />
    </IconTestXS>
  );
};

export const Icon3 = () => {
  return (
    <IconTestXS>
      <FontAwesomeIcon icon={faCannabis} color="#7ABCBD" size="xs" />
    </IconTestXS>
  );
};

export const Icon4 = () => {
  return (
    <IconTestXS>
      <FontAwesomeIcon icon={faTree} color="#62B6B7" size="xs" />
    </IconTestXS>
  );
};

export const Icon5 = () => {
  return (
    <IconTestXS>
      <FontAwesomeIcon icon={faMountain} color="#49AEAF" size="xs" />
    </IconTestXS>
  );
};

export const Icon6 = () => {
  return (
    <IconTestXS>
      <FontAwesomeIcon icon={faMountainSun} color="#309798" size="xs" />
    </IconTestXS>
  );
};
export const Icon11 = () => {
  return (
    <IconTest>
      <FontAwesomeIcon icon={faLemon} color="#D5A56D" size="xs" />
    </IconTest>
  );
};

export const Icon12 = () => {
  return (
    <IconTest>
      <FontAwesomeIcon icon={faSeedling} color="#AAC9C9" size="xs" />
    </IconTest>
  );
};

export const Icon13 = () => {
  return (
    <IconTest>
      <FontAwesomeIcon icon={faCannabis} color="#7ABCBD" size="xs" />
    </IconTest>
  );
};

export const Icon14 = () => {
  return (
    <IconTest>
      <FontAwesomeIcon icon={faTree} color="#62B6B7" size="xs" />
    </IconTest>
  );
};

export const Icon15 = () => {
  return (
    <IconTest>
      <FontAwesomeIcon icon={faMountain} color="#49AEAF" size="xs" />
    </IconTest>
  );
};

export const Icon16 = () => {
  return (
    <IconTest>
      <FontAwesomeIcon icon={faMountainSun} color="#309798" size="xs" />
    </IconTest>
  );
};

const IconTestXS = styled.div`
  margin: 10px;
  background-color: #fafafa;
  /* ${({ theme }) => theme.colors.container}; */
  border: 1px solid #bbb;
  width: 17px;

  height: 17px;
  border-radius: 17px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 2px 3px #eee;
  @media (max-width: 600px) {
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }
`;
const IconTest = styled.div`
  width: 15px;
  margin: 8px;
  background-color: #fafafa;
  border: 1px solid #bbb;
  height: 17px;
  border-radius: 17px;
  padding: 3px;
  box-shadow: inset 0 0 2px 3px #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  display: inline-block;
`;
