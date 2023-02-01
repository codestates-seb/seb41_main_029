import axios from "axios";

const url = `http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080/`;

export const getGallery = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}gallery`,
      //   headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postGallery = async () => {
  try {
    const res = await axios({
      method: "post",
      data: formdata,
      url: `${url}gallery/post`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGallery = async () => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}/gallery/delete/{gallery-seq}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const voteGallery = async () => {
  try {
    const res = await axios({
      method: "post",
      url: `${url}gallery/like/{gallery-seq}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const sort1Gallery = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}gallery/`,
      //   headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const sort2Gallery = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}gallery/`,
      //   headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
