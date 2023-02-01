import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
// import { add, format, parse, parseISO } from "date-fns";
// import { formatInTimeZone, toDate, format, utcToZonedTime } from "date-fns-tz";
// import { ko } from "date-fns/locale";
// import Parser from "html-react-parser";

// const DateFnsExample = ({ createdAt }) => {
//     const parsedDate = parse("29/10/1989", "P", new Date(createdAt), {
//       locale: ko,
//     });
//     const date = toDate(createdAt);
//     const getdate = utcToZonedTime(date, "Asia/Seooul");
//     console.log(date);
//     const date = new Date(createdAt);
//     console.log(format(new Date(createdAt), "yyyy.MM.dd"));
//   const data = new Date();

//   return (
//     <div>
//       <div>{format(parseISO(date), `yy-MM-dd/hh:mm`)}</div>
//       <div>{format(getdate, `yy-MM-dd/hh:mm`)}</div>
//       <div>
//         {formatInTimeZone(date, "Asia/Seooul", "yy-MM-dd/hh:mm", {
//           locale: ko,
//         })}
//       </div>
//       <div>{format(data, `yy-MM-dd/hh:mm`)}</div>
//     </div>
//   );
// };

// export default DateFnsExample;

// function foramtDate({ createdAt }) {
//   const d = new Date(createdAt);

//   return format(d, "PPP EEE p", { locale: ko }); // 날짜 포맷
// }

// function DateFnsExample({ createdAt }) {
//   return <div>{foramtDate(createdAt)}</div>;
// }
// export default DateFnsExample;
dayjs.locale("ko");

export const Viewdate = ({ createdAt }) => {
  const getDay = dayjs(createdAt);
  // getDay.add(9, "H");
  return <div>{getDay.add(9, "h").format("YY-MM-DD / HH:mm")}</div>;
  // return <div>{dayjs.format("YY-MM-DD / HH:MM")}</div>;
};

export const CommentDate = ({ createdAt }) => {
  const getDay = dayjs(createdAt);
  return <div>({getDay.add(9, "h").format("YY-MM-DD / HH:mm")})</div>;
};
export const ModifiedDate = ({ createdAt }) => {
  const getDay = dayjs(createdAt);
  // getDay.add(9, "h");
  return <div>({getDay.format("YY-MM-DD")})</div>;
};

export const ViewdateCommu = ({ createdAt }) => {
  const getDay = dayjs(createdAt);
  const now = dayjs();
  const now2 = dayjs().format("YY/MM/DD");
  const now3 = dayjs().format("YY/MM/DD");
  if (now2 === getDay.format("YY/MM/DD")) {
    return <div>{getDay.add(9, "h").format("HH:mm")}</div>;
  } else {
    return <div>{getDay.format("YY/MM/DD")}</div>;
  }
};
