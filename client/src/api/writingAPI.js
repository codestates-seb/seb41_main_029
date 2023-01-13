import axios from "axios";

const url = "";

export const dele = async (writingId, Token) => {
  const res = await axios({
    method: "delete",
    url: `${url}/community/${writingId}`,
    headers: { Authorization: `Bearer ${Token}` },
  });
  console.log(res);
  return res;
};
