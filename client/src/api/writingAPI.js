import axios from "axios";

const url = "";

export const getWriting = async () => {
  const res = await axios({
    method: "get",
    // url: `${url}/community/${writingId}`,
    // url: `http://localhost:3001/boards/${boardSeq}`,
    url: `http://localhost:3001/boards`,
  });
  return res.data;
};

export const dele = async (writingId, Token) => {
  const res = await axios({
    method: "delete",
    url: `${url}/community/${writingId}`,
    headers: { Authorization: `Bearer ${Token}` },
  });
  console.log(res);
  return res;
};
