import * as React from "react";
import WritingMui from "./WritingMui";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import * as s from "./WritingStyle";

export default function WritingPresenter() {
  const cookie = new Cookies();
  const Token = cookie.get("token");

  return (
    <>
      {Token !== undefined ? (
        <s.TotalContainer>
          <s.ContainerView>
            <WritingMui />
          </s.ContainerView>
        </s.TotalContainer>
      ) : (
        <>
          {alert("로그인이 되어 있지 않습니다!")}
          <Navigate to="/login" />
        </>
      )}
    </>
  );
}
