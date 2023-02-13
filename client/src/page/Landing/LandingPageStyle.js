import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .flex {
    display: flex;
  }
`;

export const Card = styled.div`
  align-items: center;
  background-color: ${(props) => (props.color ? props.color : "#f6f4eb")};
  display: flex;
  justify-content: center;
  max-width: 1920px;
  width: 100vw;
  word-break: keep-all;
  img {
    height: auto;
    max-width: 800px;
    object-fit: cover;
  }
  .sa {
    justify-content: space-around;
  }
  .text {
    max-width: 450px;
  }
  .mr50 {
    margin-right: 50px;
  }
  .mt80 {
    margin-top: 80px;
  }
  .mtb200 {
    margin: 200px 0;
  }
  .fs64 {
    font-size: ${(props) => props.theme.fontSizes.fs64};
    font-weight: bold;
    cursor: pointer;
  }
  .fs48 {
    font-size: ${(props) => props.theme.fontSizes.fs48};
    color: #dbdbdb;
    cursor: pointer;
  }
  .fs30 {
    font-size: ${(props) => props.theme.fontSizes.fs30};
  }
  .tar {
    text-align: right;
  }
  .tabletVer {
    display: none;
  }
  @media (max-width: 1336px) {
    justify-content: flex-start;
    text-align: ${(props) => (props.color === "White" ? "right" : "left")};
    img {
      margin: ${(props) => (props.color === "White" ? "0 50px" : "0")};
    }
    .desktopVer {
      display: none;
    }
    .flex {
      flex-direction: ${(props) =>
        props.color === "White" ? "column-reverse" : "column"};
      width: 100vw;
    }
    .mr50 {
      margin-left: 50px;
    }
    .mtb200 {
      margin: 100px 0;
    }
    .mt80 {
      margin-top: 40px;
    }
    .tabletVer {
      display: block;
    }
    .text {
      float: right;
      margin: 0 50px;
    }
  }
  @media (max-width: 600px) {
    .fs64 {
      font-size: ${(props) => props.theme.fontSizes.fs36};
      font-weight: bold;
    }
    .fs48 {
      font-size: ${(props) => props.theme.fontSizes.fs30};
      color: #dbdbdb;
    }
    .fs30 {
      font-size: ${(props) => props.theme.fontSizes.fs18};
    }
    .text {
      max-width: 500px;
    }
    .mtb200 {
      margin: 50px 0;
    }
    .mt80 {
      margin-top: 20px;
    }
  }
`;
