import styled from "styled-components";

const LoginBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0px;
  border-radius: 5px;
  margin-top: 20px;
  width: ${(props) => props.width || "80px"};
  height: ${(props) => props.height || "30px"};
  &:hover {
    background-color: ${({ theme }) => theme.colors.main_hover};
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

export const MainBtn = ({ text, width, height }) => {
  return (
    <LoginBtn width={width} height={height}>
      {text}
    </LoginBtn>
  );
};
