import axios from "axios";

const url = `https://api.gohiking.co.kr`;

export const postReply = async (token, data, boardSeq, commentSeq) => {
  const formdata = {
    content: data?.content,
  };
  try {
    const res = await axios({
      method: "post",
      data: formdata,
      url: `${url}reply/${boardSeq}/${commentSeq}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {}
};
export const editReply = async (token, data, replySep) => {
  const formdata = {
    content: data?.content,
  };
  try {
    const response = await axios({
      method: "patch",
      url: `${url}reply/${replySep}`,
      data: formdata,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {}
};

export const deleteReply = async (token, boardSeq, replySep) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}reply/${boardSeq}/${replySep}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {}
};

export const ReplyUpVote = async (Token, replySep) => {
  try {
    const res = await axios({
      method: "post",
      headers: { Authorization: `Bearer ${Token}` },
      url: `${url}reply/like/${replySep}`,
    });
    if (res?.data?.header?.code === 403) {
      alert("이미 추천하셨습니다.");
      window.location.reload();
    } else {
      return res;
    }
  } catch (error) {}
};
export const ReplyDownVote = async (Token, replySep) => {
  try {
    const res = await axios({
      method: "post",
      headers: { Authorization: `Bearer ${Token}` },
      url: `${url}reply/dislike/${replySep}`,
    });
    if (res?.data?.header?.code === 403) {
      alert("이미 비추천하셨습니다.");
      window.location.reload();
    } else {
      return res;
    }
  } catch (error) {}
};
