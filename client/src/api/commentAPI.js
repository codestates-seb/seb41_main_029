import axios from "axios";
import { Cookies } from "react-cookie";
import { getCookie } from "../Cookies";

const url = `https://api.gohiking.co.kr`;

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
    return response;
  } catch (error) {}
};

export const editComment = async (token, data, boardSeq, commentSeq) => {
  const formdata = {
    content: data?.content,
  };
  try {
    const response = await axios({
      method: "patch",
      url: `${url}comments/${boardSeq}/${commentSeq}`,
      data: formdata,
      // headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    return response;
  } catch (error) {}
};

export const deleteComment = async (token, boardSeq, commentSeq) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}comments/${boardSeq}/${commentSeq}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {}
};

export const commentUpVote = async (Token, commentSeq) => {
  try {
    const res = await axios({
      method: "post",
      headers: { Authorization: `Bearer ${Token}` },
      url: `${url}comments/like/${commentSeq}`,
    });
    if (res?.data?.header?.code === 403) {
      alert("이미 추천하셨습니다.");
      window.location.reload();
    } else {
      return res;
    }
  } catch (error) {}
};
export const commentDownVote = async (Token, commentSeq) => {
  try {
    const res = await axios({
      method: "post",
      headers: { Authorization: `Bearer ${Token}` },
      url: `${url}comments/dislike/${commentSeq}`,
    });
    if (res?.data?.header?.code === 403) {
      alert("이미 비추천하셨습니다.");
      window.location.reload();
    } else {
      return res;
    }
  } catch (error) {}
};
