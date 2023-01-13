import styled from "styled-components";
import Test from "../component/Test";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  .flex {
    display: flex;
  }
`;

export default function LandingPage() {
  return (
    <>
      <Wrapper>
        <Test />
      </Wrapper>
    </>
  );
}
