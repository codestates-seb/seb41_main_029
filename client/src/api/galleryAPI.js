import axios from "axios";

const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;

export const getGallery = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}gallery`,
      //   headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {}
};

export const postGallery = async (token, formdata2) => {
  try {
    const res = await axios({
      method: "post",
      data: formdata2,
      url: `${url}gallery/post`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {}
};

export const deleteGallery = async (token, gallerySeq) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}gallery/delete/${gallerySeq}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {}
};

export const voteGallery = async (token, seq) => {
  try {
    const res = await axios({
      method: "post",
      url: `${url}gallery/like/${seq}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {}
};

export const newGallery = async (token, size) => {
  if (token) {
    try {
      const res = await axios({
        method: "get",
        url: `${url}gallery/all/?page=${1}&size=${size}&sort-by=최신순`,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res?.data?.body?.galleries;
    } catch (error) {}
  } else if (!token) {
    try {
      const res = await axios({
        method: "get",
        url: `${url}gallery/all/?page=${1}&size=${size}&sort-by=최신순`,
        // headers: { Authorization: `Bearer ${token}` },
      });
      return res?.data?.body?.galleries;
    } catch (error) {}
  }
};

export const likedGallery = async (token, size) => {
  if (token) {
    try {
      const res = await axios({
        method: "get",
        //   url: `${url}gallery/all/?page=1&size=30&sort-by=최신순`,
        url: `${url}gallery/all/?page=${1}&size=${size}&sort-by=추천순`,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res?.data?.body?.galleries;
    } catch (error) {}
  } else if (!token) {
    try {
      const res = await axios({
        method: "get",
        //   url: `${url}gallery/all/?page=1&size=30&sort-by=최신순`,
        url: `${url}gallery/all/?page=${1}&size=${size}&sort-by=추천순`,
        // headers: { Authorization: `Bearer ${token}` },
      });
      return res?.data?.body?.galleries;
    } catch (error) {}
  }
};
