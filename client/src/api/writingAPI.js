import axios from "axios";

const url = `https://gohiking.co.kr/`;
const instance = axios.create({
  timeout: 30000,
});

export const postWriting = async (Token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${url}boards/articles`,
      // Token이 있어야 접속 가능
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res.data;
  } catch (error) {}
};

export const getWriting = async (Token, boardSeq) => {
  if (Token) {
    try {
      const res = await axios({
        method: "get",
        url: `${url}boards/${boardSeq}`,
        headers: { Authorization: `Bearer ${Token}` },
      });
      return res;
    } catch (error) {}
  } else if (!Token) {
    try {
      const res = await axios({
        method: "get",
        url: `${url}boards/${boardSeq}`,
      });
      return res;
    } catch (error) {}
  }
};

// export const baseApi = ()

export const deleteWriting = async (Token, boardSeq) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}boards/${boardSeq}`,
      // url: `${url}boards/7`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res;
  } catch (error) {}
};

export const editWriting = async (data, token, boardSeq) => {
  const endpoint = `${url}${boardSeq}`;
  const formData = {
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
  } catch (error) {}
};

export const bookMarking = async (Token, boardSeq) => {
  try {
    const response = await axios({
      method: "post",
      url: `${url}boards/bookmark/${boardSeq}`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    return response;
  } catch (error) {}
};

export const viewUpVote = async (Token, boardSeq) => {
  try {
    const res = await axios({
      method: "post",
      headers: { Authorization: `Bearer ${Token}` },
      url: `${url}boards/like/${boardSeq}`,
      // url: `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/11`,
    });
    if (res?.data?.header?.code === 403) {
      alert("이미 추천하셨습니다.");
      window.location.reload();
    } else {
      return res;
    }
  } catch (error) {}
};
export const viewDownVote = async (Token, boardSeq) => {
  try {
    const res = await axios({
      method: "post",
      headers: { Authorization: `Bearer ${Token}` },
      url: `${url}boards/dislike/${boardSeq}`,
    });
    if (res?.data?.header?.code === 403) {
      alert("이미 비추천하셨습니다.");
      window.location.reload();
    } else {
      return res;
    }
  } catch (error) {}
};
