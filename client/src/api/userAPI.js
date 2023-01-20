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
