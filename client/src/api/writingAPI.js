import axios from "axios";

const url = "";

export const getWriting = async () => {
  try {
    const res = await axios({
      method: "get",
      // url: `${url}/community/${writingId}`,
      // url: `http://localhost:3001/boards/${boardSeq}`,
      url: `http://localhost:3001/boards`,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWriting = async (writingId, Token) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}/community/${writingId}`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editWriting = async (data, token, boardSeq, userSeq) => {
  if (!token || !userSeq) {
    return alert("post after login");
  }
  const endpoint = ``;
  const formData = {
    userSeq,
    content: data.content,
    title: data.title,
  };
  try {
    const response = await axios({
      method: "patch",
      url: endpoint,
      data: formData,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const bookMarking = async (token) => {
  const endpoint = ``;
  try {
    const response = await axios({
      method: "patch",
      url: endpoint,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
