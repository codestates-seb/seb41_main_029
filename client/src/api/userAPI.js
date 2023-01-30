import axios from "axios";
import { getCookie } from "../Cookies";

// const url = `https://gohiking.co.kr/`;
const url = `https://api.gohiking.co.kr`;
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
  } catch (e) {}
};

export const guestLogin = async (data) => {
  const getRandom = Math.random();
  const formdata = {
    userId: getRandom,
    username: getRandom,
    password: getRandom,
  };
  try {
    const res = await axios({
      method: "post",
      formdata,
      headers: { Authorization: null },
      url: `${url}auth/login`,
    });
    return res;
  } catch (e) {}
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

// export const deleteUser = async (Token, useId) => {
//   try {
//     const res = await axios({
//       url: `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users`,
//       method: "delete",
//       headers: { Authorization: `Bearer ${Token}` },
//     });
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getUser = async (Token, userId) => {
//   try {
//     const res = await axios.all([
//       axios.get(
//         "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users/mypage"
//       ),
//       {
//         headers: { Authorization: `Bearer ${Token}` },
//       },
//       axios.get(
//         "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users/write"
//       ),
//       {
//         headers: { Authorization: `Bearer ${Token}` },
//       },
//       axios.get(
//         "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users/comment"
//       ),
//       {
//         headers: { Authorization: `Bearer ${Token}` },
//       },
//       axios.get(
//         "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users/bookmark"
//       ),
//       {
//         headers: { Authorization: `Bearer ${Token}` },
//       }.then(
//         axios.spread(
//           (
//             { data: mypage },
//             { data: write },
//             { data: comment },
//             { data: bookmark }
//           ) => {
//             console.log({ mypage, write, comment, bookmark });
//           }
//         )
//       ),

//       // "Content-Type": "application/json",
//     ]);

//     // return res.data.data;
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };
