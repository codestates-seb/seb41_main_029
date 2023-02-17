import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
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
  return <div>{getDay.format("YY-MM-DD")}</div>;
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
