import axios from "axios";

const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;

export const login = async (data) => {
  try {
    const res = await axios({
      method: "post",
      data,
      headers: { Authorization: null },
      url: `${url}auth/login`,
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
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
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (Token, userId) => {
  try {
    const res = await axios({
      url: `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users/mypage`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` },
      // "Content-Type": "application/json",
    });
    // return res.data.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getWrite = async (Token, userId) => {
  try {
    const res = await axios({
      url: `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/users/write`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` },
      // "Content-Type": "application/json",
    });
    // return res.data.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};
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
