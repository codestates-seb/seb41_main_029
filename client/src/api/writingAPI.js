import axios from "axios";

const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;

export const getWriting = async () => {
  try {
    const res = await axios({
      method: "get",
      // url: `${url}/boards/${id}`,
      url: `${url}boards/1`,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWriting = async (Token) => {
  try {
    const res = await axios({
      method: "delete",
      // url: `${url}/community/${writingId}`,
      url: `${url}boards/7`,
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
  const endpoint = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;
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

export const bookMarking = async (Token) => {
  const endpoint = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/bookmark/1`;
  try {
    const response = await axios({
      method: "post",
      url: endpoint,
      headers: { Authorization: `Bearer ${Token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const viewUpVote = async (/*boardSeq, userId, commentSeq,*/ Token) => {
  try {
    const res = await axios({
      method: "post",
      // data: { data: 1 },
      headers: { Authorization: `Bearer ${Token}` },
      url: `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/1`,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const viewDownVote = async (/*boardSeq, userId, commentSeq,*/ Token) => {
  try {
    const res = await axios({
      method: "post",
      // data: { data: 1 },
      headers: { Authorization: `Bearer ${Token}` },
      url: `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/boards/dislike/1`,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
