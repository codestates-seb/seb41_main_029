import styled from "styled-components";
import theme from "../Theme";
import { ContainerView } from "./Writing/Writing";

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EditTitle = styled.div`
  background-color: #f2f2f2;
  /* background-color: ${({ theme }) => theme.colors.container}; */
  width: ${({ theme }) => theme.deviceSizes.tablet};
  justify-content: center;
  display: flex;
  margin: 200px 0 200px 0;
  height: 1000px;
`;
const EditContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 68px;
  width: 1000px;
  height: 660px;

  span {
    // or <br />
    width: 45px;
  }
  .profileBox {
    display: flex;
    height: 230px;
    border-bottom: 1px solid #939393;
  }
  .profile {
    width: 250px;
    border-right: 1px solid #939393;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    white-space: normal;
  }
  .profileImg {
    width: 180px;
    height: 150px;
    display: flex;
    margin: 28px 0 0 78px;
    align-items: center;

    border-radius: 10px;
    justify-content: center;
    text-align: center;
    background-color: #bfbfbf;
  }
  .profileBtnDiv {
    display: flex;
    align-items: center;
    margin-left: 176px;
  }
  .profileBtn {
    width: 200px;
    height: 50px;
    border: none;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.main};
  }
`;
const NameContent = styled.div`
  height: 190px;
  display: flex;
  display: flex;
  border: 2px solid red;
`;
export default function MyPageEdit() {
  return (
    <EditContainer>
      <EditTitle>
        <EditContent>
          <div className="profileBox">
            <div className="profile">
              <span>프로필 사진</span>
            </div>
            <div className="profileImg">
              <span>프로필 사진</span>
            </div>
            <div className="profileBtnDiv">
              <button className="profileBtn">이미지 첨부 버튼</button>
            </div>
          </div>
          <NameContent>
            <span className="name">닉네임</span>
          </NameContent>
          <div className="password">비밀번호</div>
        </EditContent>
      </EditTitle>
    </EditContainer>
  );
}
