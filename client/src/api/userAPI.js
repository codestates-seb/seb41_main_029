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
