import styled from "styled-components";

const Abc = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.paddings.xl};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

export default function LandingPage() {
  return (
    <>
      <Abc>LandingPage</Abc>
      <a href="/Login">
        <div>글작성</div>
      </a>
    </>
  );
}
