import axios from "axios";

const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;

export const postComment = async (data, token, boardSeq) => {
  const formdata = {
    content: data?.content,
  };
  try {
    const response = await axios({
      method: "post",
      url: `${url}comments/${boardSeq}`,
      data: formdata,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editComment = async (
  data,
  token,
  boardSeq,
  userSeq,
  commentSeq
) => {
  const formData = {
    userSeq,
    commentSeq,
    content: data.content,
  };
  try {
    const response = await axios({
      method: "patch",
      url: `${url}/boards/${boardSeq}/comments/${commentSeq}`,
      data: formData,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (commentSeq, Token) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}comments/`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const commentUpVote = async (boardSeq, userId, commentSeq, Token) => {
  try {
    const res = await axios({
      method: "post",
      data: { data: 1 },
      headers: { Authorization: `Bearer ${Token}` },
      url: `${url}`,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const commentDownVote = async (boardSeq, userId, commentSeq, Token) => {
  try {
    const res = await axios({
      method: "post",
      data: { data: 1 },
      headers: { Authorization: `Bearer ${Token}` },
      url: `${url}`,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
