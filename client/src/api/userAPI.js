import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../Cookies";
import { Link } from "react-router-dom";

// const url = `https://api.gohiking.co.kr/`;
const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;
const upload_endpoint = "uploadFiles";

export const login = async (data) => {
  try {
    const res = await axios({
      method: "post",
      data,
      headers: { Authorization: null },
      url: `${url}auth/login`,
    });
    return res;
  } catch (e) {
    return e;
  }
};

// export const gusetLogin = async () => {
//   const getRandom = Math.random();
//   await axios
//     .post(
//       "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/articles",
//       {
//         userId: getRandom,
//         username: getRandom,
//         password: getRandom,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then(
//       axios
//         .post(
//           "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/articles",
//           {
//             userId: getRandom,
//             password: getRandom,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         )
//         return res;
//     )
//     .catch((err) => {
//       alert("다시한번 시도해주세요.");
//     });
// };
const getRandom = Math.random();
export const guestSignup = async () => {
  try {
    const res = axios({
      method: "post",
      data: {
        userId: getRandom,
        username: getRandom,
        password: getRandom,
      },
      headers: { Authorization: null },
      url: "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users/guest",
    });
    // console.log(res);
    return res;
  } catch (err) {
    // console.log(err);
    alert("다시 시도해주세요.");
  }
};

export const guestLogin = async () => {
  try {
    const res = axios({
      method: "post",
      data: {
        userId: getRandom,
        password: getRandom,
      },
      headers: { Authorization: null },
      url: "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/auth/login",
    });
    // console.log(res);
    return res;
  } catch (error) {
    // console.log(error);
  }
};

export const socialLogin = async (data) => {
  try {
    const res = await axios({
      method: "post",
      data,
      headers: { Authorization: null },
      url: `${url}auth/login`,
    });
    return res;
  } catch (e) {}
};

export const getUser = async (Token, userId) => {
  try {
    const res = await axios({
      url: `${url}users/mypage`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` },
      // "Content-Type": "application/json",
    });
    // return res.data.data;
    return res;
  } catch (error) {}
};

export const postImage = async (data) => {
  try {
    const res = await axios({
      method: "post",
      data,
      headers: { Authorization: `Bearer ${getCookie("token")}` },
      url: `${url}${upload_endpoint}`,
    });
    return res;
  } catch (e) {}
};

export const patchUser = async (data) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${url}users/mypage`,
      data: data,
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    return response;
  } catch (error) {}
};

export const getWrite = async (Token, userId) => {
  try {
    const res = await axios({
      url: `${url}users/write`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` },
      // "Content-Type": "application/json",
    });
    // return res.data.data;
    return res;
  } catch (error) {}
};

export const getComment = async (Token, useId) => {
  try {
    const res = await axios({
      url: `${url}users/comment`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res;
  } catch (error) {}
};

export const getBookmark = async (Token, useId) => {
  try {
    const res = await axios({
      url: `${url}users/bookmark`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res;
  } catch (error) {}
};

export const DeleteClick = () => {
  if (window.confirm("정말 회원 탈퇴 하시겠습니까?") === false) {
    alert("취소 되었습니다.");
  } else {
    axios.delete(`${url}users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    // return res;
    // .then((res) => {
    //   alert("이용해 주셔서 감사합니다.");
    //   removeCookie("token");
    //   localStorage.removeItem("userId");
    // });
  }
};
