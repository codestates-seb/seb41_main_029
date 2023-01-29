import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 290px;
  width: 420px;
  margin: 150px 16px;
  border-radius: 20px;
  background-color:
  /* ${({ theme }) => theme.colors.container}; */ #f2f2f2;
`;

const CheckImg = styled.div`
  margin-bottom: 10px;
`;

const SignupComplete = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs24};
  font-weight: 500;
  margin: 10px;
`;

const LoginInfo = styled.div`
  color: gray;
  padding: 0 20px;
`;

const LoginBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0;
  border-radius: 5px;
  margin: 25px 13px 0px 0;
  /* width: 170px; */
  padding: 0 15px;
  height: 40px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.main_hover};
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

const BtnBox = styled.div`
  display: flex;
`;

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <NoticeDiv>
          <CheckImg>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              color="#aaa"
              size="4x"
            />
          </CheckImg>
          <SignupComplete>페이지를 찾을 수 없습니다.</SignupComplete>
          {/* <LoginInfo>
            찾으시려는 페이지의 주소가 잘못 입력되었거나, 페이지 주소의 변경
            혹은 삭제로 인해 현재 사용하실 수 없습니다. 아래 바로 가기 버튼을
            클릭 후 이동하여 이용해 주시기 바랍니다.
          </LoginInfo> */}
          <BtnBox>
            <LoginBtn
              onClick={() => {
                navigate(-1);
              }}
            >
              이전 페이지
            </LoginBtn>
            <LoginBtn
              onClick={() => {
                navigate("/");
              }}
            >
              홈으로 가기
            </LoginBtn>
          </BtnBox>
        </NoticeDiv>
      </Container>
    </>
  );
}
