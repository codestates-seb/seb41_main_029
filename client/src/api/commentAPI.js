import axios from "axios";
import { Cookies } from "react-cookie";

const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;

export const postComment = async (data, token, boardSeq) => {
  const formdata = {
    content: data?.content,
    // content: data,
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

export const editComment = async (data, token, boardSeq, commentSeq) => {
  const formdata = {
    content: data?.content,
  };
  try {
    const response = await axios({
      method: "patch",
      url: `${url}comments/${boardSeq}/${commentSeq}`,
      data: formdata,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (token, boardSeq, commentSeq) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}comments/${boardSeq}/${commentSeq}`,
      headers: { Authorization: `Bearer ${token}` },
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
