import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// view2/:boardSeq

const View2 = () => {
  // URL 파라미터 받기 - board의 id
  const { boardSeq } = useParams();
  const [item, setItem] = useState([]);

  // const viewData = async () => {
  //   await axios
  //     .get(`https://jsonplaceholder.typicode.com/comments/${boardSeq}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setItem(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };

  // useEffect(() => {
  //   viewData();
  // }, []);

  // 정식 데이터 세부조회 (axios.async/awit)
  const url =
    "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";
  // const token = Cookies.get("token");

  const handleLoadEach = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(`${url}/boards/${boardSeq}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: token,
        },
      });
      // setPosts(response.data);
      // setLoading(false);

      console.log(res.data);
      setItem(res.data);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    handleLoadEach();
  }, []);

  return (
    <>
      <p>제목</p>
      <div>{item.title}</div>
      <p>내용</p>
      <div>{item.content}</div>;
    </>
  );
};

export default View2;
