import axios from "axios";

const url = "";

export const login = async (data) => {
  try {
    const res = await axios({
      method: "post",
      data,
      headers: { Authorization: null },
      url: `${url}/auth/login`,
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
  }
};
