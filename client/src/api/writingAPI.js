import axios from "axios";

const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;

export const postWriting = async (Token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${url}boards/articles`,
      // Token이 있어야 접속 가능
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWriting = async (Token, boardSeq) => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}boards/${boardSeq}`,
      // headers: { Authorization: `Bearer ${Token}` },
      // url: `${url}boards/11`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWriting = async (Token, boardSeq) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}boards/${boardSeq}`,
      // url: `${url}boards/7`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editWriting = async (data, token, boardSeq) => {
  const endpoint = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/${boardSeq}`;
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
  } catch (error) {
    console.log(error);
  }
};

export const bookMarking = async (Token, boardSeq) => {
  try {
    const response = await axios({
      method: "post",
      url: `${url}boards/bookmark/${boardSeq}`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const viewUpVote = async (Token, boardSeq) => {
  try {
    const res = await axios({
      method: "post",
      headers: { Authorization: `Bearer ${Token}` },
      url: `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/like/${boardSeq}`,
      // url: `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/11`,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const viewDownVote = async (Token, boardSeq) => {
  try {
    const res = await axios({
      method: "post",
      headers: { Authorization: `Bearer ${Token}` },
      url: `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/dislike/${boardSeq}`,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
