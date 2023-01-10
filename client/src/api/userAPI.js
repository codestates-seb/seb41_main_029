import axios from "axios";

export const login = async (data) => {
  try {
    const res = await axios({
      method: "post",
      data,
      headers: { Authorization: null },
      url: "",
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};
