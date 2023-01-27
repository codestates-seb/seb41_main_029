import axios from "axios";

const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;

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
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
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
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReply = async (token, boardSeq, replySep) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}${boardSeq}/${replySep}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
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
      console.log(res);
      return res;
    }
  } catch (error) {
    console.log(error);
  }
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
      console.log(res);
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
