import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// view2/:boardSeq

const View2 = () => {
  // URL 파라미터 받기 - board의 id
  const { boardSeq } = useParams();
  const [item, setItem] = useState([]);

  const viewData = async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/comments/${boardSeq}`)
      .then((res) => {
        console.log(res.data);
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    viewData();
  }, []);

  return (
    <>
      <p>제목</p>
      <div>{item.name}</div>
      <p>내용</p>
      <div>{item.body}</div>;
    </>
  );
};

export default View2;
