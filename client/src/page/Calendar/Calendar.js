import { useState } from "react";
import styled from "styled-components";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const Wrapper = styled.div`
  .flex {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .meeting {
    border: 1px solid ${(props) => props.theme.colors.main};
    border-radius: 10px;
    height: calc(100vh - 200px);
    margin-bottom: 20px;
    margin-left: 20px;
    margin-top: 20px;
    max-width: 600px;
    width: 100%;
  }

  .roof {
    align-items: center;
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 10px 10px 0 0;
    color: white;
    display: flex;
    justify-content: center;
    height: 40px;
  }
`;

export default function CalendarPage() {
  const [value, onChange] = useState(new Date());

  return (
    <Wrapper>
      <div className="flex">
        <Calendar
          onChange={onChange}
          formatDay={(locale, date) => moment(date).format("DD")}
          value={value}
          showNeighboringMonth={false}
        />
        <div className="meeting">
          <div className="roof">
            {moment(value).format("YYYY년 MM월 DD일")}{" "}
          </div>
          <div>
            <div>오늘은 모임이 없어요!</div>
            <div>새로운 모임을 만들어보시겠어요?</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
