import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.container};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 900px;
  justify-content: center;
  margin: 120px auto 0 auto;
  max-width: 900px;
  width: 100%;
  .container {
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 10px;
    height: 70%;
    width: 70%;
  }
`;

export default function MyPageEdit() {
  return (
    <Wrapper>
      <div className="container">
        정보
        <div>
          프로필 사진 줄<div> 프로필 사진 이름</div>
          <div>
            프로필 사진 내용
            <div>프로필 사진</div>
            <div>이미지 첨부 버튼</div>
          </div>
        </div>
        <div>
          닉네임 줄<div> 닉네임 이름</div>
          <div>
            닉네임 내용
            <div>닉네임 칸</div>
          </div>
        </div>
        <div>
          비밀번호 줄<div> 비밀번호 이름</div>
          <div>
            비밀번호 내용
            <div>비밀번호 칸</div>
          </div>
        </div>
      </div>
      <div>
        버튼
        <div> 취소</div>
        <div> 확인</div>
      </div>
    </Wrapper>
  );
}
