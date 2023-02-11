import { useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { GuestNotFound } from "../NotFound";
import MypageContainer from "./MypageContainer";
import * as s from "./MypageStyle";

const MypagePresenter = () => {
  return (
    <>
      {/* {userInfo?.roleType === "GUEST" ? (
        <>
          <GuestNotFound></GuestNotFound>
        </>
      ) : (
        <>
           {Token !== undefined ? (
        <s.MypageContainer>
          <s.MypageTitle> */}
      <MypageContainer />
      {/* </s.MypageTitle>
        </s.MypageContainer>
           ) : (
             <>
               {alert("로그인이 되어 있지 않습니다!")}
               <Navigate to="/login" />
             </>
           )}
         </>
      )} */}
    </>
  );
};
export default MypagePresenter;
