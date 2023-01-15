import React from "react";
import { add, format } from "date-fns";
import { ko } from "date-fns/locale";
import Parser from "html-react-parser";

const DateFnsExample = ({ createdAt }) => {
  const date = new Date();
  console.log(date);

  return (
    <div>
      <div>{format(date, `yy-MM-dd/hh:mm`)}</div>
    </div>
  );
};

export default DateFnsExample;

// function foramtDate({ createdAt }) {
//   const d = new Date(createdAt);

//   return format(d, "PPP EEE p", { locale: ko }); // 날짜 포맷
// }

// function DateFnsExample({ createdAt }) {
//   return <div>{foramtDate(createdAt)}</div>;
// }
// export default DateFnsExample;
