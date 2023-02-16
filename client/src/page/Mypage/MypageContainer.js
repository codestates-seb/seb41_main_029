import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Cookies } from "react-cookie";
import { getUser } from "../../api/userAPI";
import { getCookie, removeCookie } from "../../Cookies";
import { ModifiedDate, ViewdateCommu } from "../../component/DateCalculator";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon11,
  Icon12,
  Icon13,
  Icon14,
  Icon15,
  Icon16,
  IconM,
} from "../../component/UserIcon";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import * as s from "./MypageStyle";
import MypageMenu from "./MypageMenu";
import { GuestNotFound } from "../NotFound";

export default function MypageContainer() {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      const res = await getUser(Token);
      setUserInfo(res.data.body.user);
    }
    getUserInfo();
  }, []);

  const DeleteClick = async () => {
    if (window.confirm("정말 회원 탈퇴 하시겠습니까?") === false) {
      alert("취소 되었습니다.");
    } else {
      await axios
        .delete(
          "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users",
          {
            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        )
        .then((res) => {
          alert("이용해 주셔서 감사합니다.");
          removeCookie("token");
          localStorage.removeItem("userId");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      {userInfo?.roleType === "GUEST" ? (
        <>
          <GuestNotFound></GuestNotFound>
        </>
      ) : (
        // <>
        //   {Token !== undefined ? (
        <s.MypageContainer>
          <s.MypageTitle>
            <s.MypageInfo>
              <s.MypageUser>
                <s.MypageInfoA>
                  <s.MypageProfile
                    src={userInfo?.profileImageUrl}
                  ></s.MypageProfile>
                  <s.MypageUserInfo>
                    <s.MypageProfileModify href="mypageEdit">
                      개인정보 수정
                    </s.MypageProfileModify>
                    <s.MypageDelete onClick={DeleteClick}>
                      회원 탈퇴
                    </s.MypageDelete>
                  </s.MypageUserInfo>
                </s.MypageInfoA>
                <s.MypageCenter>
                  <s.MypageText> {userInfo.username} 님</s.MypageText>
                  <s.MypageProfileInfo>
                    가입 날짜 :
                    <ModifiedDate modifiedAt={userInfo.modifiedAt} />
                  </s.MypageProfileInfo>
                  <s.MypageId>아이디 : {userInfo.userId}</s.MypageId>
                </s.MypageCenter>
              </s.MypageUser>
              <s.PointRemainContiner>
                <s.PointRemain>
                  {userInfo.point <= 30
                    ? `다음 등급까지 남은 포인트 : ${30 - userInfo.point} 점`
                    : "" || (31 <= userInfo.point && userInfo.point <= 70)
                    ? `다음 등급까지 남은 포인트 : ${70 - userInfo.point} 점`
                    : "" || (71 <= userInfo.point && userInfo.point <= 100)
                    ? `다음 등급까지 남은 포인트 : ${100 - userInfo.point} 점`
                    : "" || (101 <= userInfo.point && userInfo.point <= 200)
                    ? `다음 등급까지 남은 포인트 : ${200 - userInfo.point} 점`
                    : "" || (201 <= userInfo.point && userInfo.point <= 300)
                    ? `다음 등급까지 남은 포인트 : ${300 - userInfo.point} 점`
                    : "" || 301 <= userInfo.point
                    ? "당신은 등산 마스터 입니다"
                    : ""}
                </s.PointRemain>
                <s.PointLine>
                  <s.FirstPoint>
                    {userInfo.point <= 30
                      ? "0점"
                      : "" || (31 <= userInfo.point && userInfo.point <= 70)
                      ? "31점"
                      : "" || (71 <= userInfo.point && userInfo.point <= 100)
                      ? "71점"
                      : "" || (101 <= userInfo.point && userInfo.point <= 200)
                      ? "101점"
                      : "" || (201 <= userInfo.point && userInfo.point <= 300)
                      ? "201점"
                      : "" || 301 <= userInfo.point
                      ? "301점"
                      : ""}
                  </s.FirstPoint>
                  <s.LastPoint>
                    {userInfo.point <= 30 ? (
                      "30점"
                    ) : "" || (31 <= userInfo.point && userInfo.point <= 70) ? (
                      "70점"
                    ) : "" ||
                      (71 <= userInfo.point && userInfo.point <= 100) ? (
                      "100점"
                    ) : "" ||
                      (101 <= userInfo.point && userInfo.point <= 200) ? (
                      "200점"
                    ) : "" ||
                      (201 <= userInfo.point && userInfo.point <= 300) ? (
                      "300점"
                    ) : "" || 301 <= userInfo.point ? (
                      <IconM />
                    ) : (
                      ""
                    )}
                  </s.LastPoint>
                </s.PointLine>
                <s.PointBar>
                  <ProgressBar
                    max={
                      userInfo.point <= 30
                        ? 30
                        : "" || (31 <= userInfo.point && userInfo.point <= 70)
                        ? 70
                        : "" || (71 <= userInfo.point && userInfo.point <= 100)
                        ? 100
                        : "" || (101 <= userInfo.point && userInfo.point <= 200)
                        ? 200
                        : "" || (201 <= userInfo.point && userInfo.point <= 300)
                        ? 300
                        : "" || 301 <= userInfo.point
                        ? 301
                        : ""
                    }
                    animated
                    label={`${userInfo.point}P`}
                    now={userInfo.point}
                  />
                </s.PointBar>
                <s.MypageShop
                  href="pointshop"
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                >
                  포인트 상점
                </s.MypageShop>
              </s.PointRemainContiner>
              <s.PointContainer>
                <s.PointTitle>
                  <s.PointLevel>
                    나의 등급
                    {userInfo.point <= 30 ? (
                      <Icon1 />
                    ) : "" || (31 <= userInfo.point && userInfo.point <= 60) ? (
                      <Icon2 />
                    ) : "" ||
                      (61 <= userInfo.point && userInfo.point <= 100) ? (
                      <Icon3 />
                    ) : "" ||
                      (101 <= userInfo.point && userInfo.point <= 200) ? (
                      <Icon4 />
                    ) : "" ||
                      (201 <= userInfo.point && userInfo.point <= 300) ? (
                      <Icon5 />
                    ) : "" || 301 <= userInfo.point ? (
                      <Icon6 />
                    ) : (
                      ""
                    )}
                  </s.PointLevel>
                  <s.PointUserDiv>
                    나의 포인트 : {userInfo.point} 점
                  </s.PointUserDiv>
                  <s.PointModal>
                    <div className="ModalDiv">
                      포인트 획득 방법
                      <div className="ModalText">
                        글 작성 시 +5 <br /> 글 추천 시 +5
                        <br />글 비추천 시 -1 <br />
                        북마크 시 +10 <br />
                        댓글 추천 시 +5
                        <br />
                        댓글 비추천 시 -1
                      </div>
                    </div>
                    <div className="ModalDiv">
                      멤버 등급 안내
                      <div className="ModalText">
                        <s.PointHover>0 ~ 30점</s.PointHover>
                        {<Icon11 />}
                        <br />
                        <s.PointHover>31 ~ 70 점</s.PointHover>
                        {<Icon12 />} <br />
                        <s.PointHover>71 ~ 100 점</s.PointHover>
                        {<Icon13 />} <br />
                        <s.PointHover>101 ~ 200 점</s.PointHover>
                        <Icon14 />
                        <br />
                        <s.PointHover>201 ~ 300 점 </s.PointHover>
                        {<Icon15 />}
                        <br />
                        <s.PointHover>301 점 이상 </s.PointHover>
                        {<Icon16 />}
                      </div>
                    </div>
                  </s.PointModal>
                </s.PointTitle>
              </s.PointContainer>
            </s.MypageInfo>
            <MypageMenu />
          </s.MypageTitle>
        </s.MypageContainer>
        //   ) : (
        //     <>
        //       {alert("로그인이 되어 있지 않습니다!")}
        //       <Navigate to="/login" />
        //     </>
        //   )}
        // </>
      )}
    </>
  );
}
