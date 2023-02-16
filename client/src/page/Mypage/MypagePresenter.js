import { useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { GuestNotFound } from "../NotFound";
import MypageContainer from "./MypageContainer";
import * as s from "./MypageStyle";

const MypagePresenter = () => {
  return (
    <>
      <MypageContainer />
    </>
  );
};
export default MypagePresenter;
