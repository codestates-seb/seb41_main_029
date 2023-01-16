import axios from "axios";

const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;

export const postComment = async (data, token, boardsId, userSeq) => {
  const formdata = {
    userSeq,
    content: data.comment,
  };
  try {
    const response = await axios({
      method: "post",
      url: `${url}/boards/${boardsId.id}`,
      data: formdata,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editAnswer = async (
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
      url: `${url}/boards/${boardSeq}/${commentSeq}`,
      data: formData,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (boardSeq, userId, commentSeq, Token) => {
  const res = await axios({
    method: "delete",
    url: ``,
    headers: { Authorization: `Bearer ${Token}` },
  });
  console.log(res);
  return res;
};

export const commentUpVote = async (boardSeq, userId, commentSeq, Token) => {
  const res = await axios({
    method: "post",
    data: { data: 1 },
    headers: { Authorization: `Bearer ${Token}` },
    url: ``,
  });
  console.log(res);
  return res;
};
export const commentDownVote = async (boardSeq, userId, commentSeq, Token) => {
  const res = await axios({
    method: "post",
    data: { data: 1 },
    headers: { Authorization: `Bearer ${Token}` },
    url: ``,
  });
  console.log(res);
  return res;
};
