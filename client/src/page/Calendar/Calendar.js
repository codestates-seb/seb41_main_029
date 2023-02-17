import { useEffect, useState } from "react";
import styled from "styled-components";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faPersonHiking } from "@fortawesome/free-solid-svg-icons";

import CalendarDummy from "./CalendarDummy";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 160px);

  img {
    border-radius: 10px;
    height: 100px;
    margin-right: 20px;
    object-fit: cover;
    width: 120px;
  }

  .cg {
    color: gray;
  }

  .flex {
    display: flex;
  }

  .ha {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .margin {
    margin: 20px;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .meeting {
    border: 1px solid ${(props) => props.theme.colors.main};
    border-radius: 10px;
    max-width: 600px;
    width: 100%;
  }

  .ml20 {
    margin-left: 20px;
  }

  .mt20 {
    margin-top: 20px;
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

  .title {
    font-weight: bold;
  }

  .va {
    display: flex;
    justify-content: center;
  }
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.disabled === true ? "#CCCCCC" : "#62B6B7"};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0px;
  border-radius: 5px;
  width: ${(props) => props.width || "80px"};
  height: ${(props) => props.height || "30px"};
  &:hover {
    background-color: ${(props) =>
      props.disabled === true ? "#CCCCCC" : "#439A97"};
  }

  &:active {
    transform: ${(props) => (props.disabled === true ? "none" : "scale(0.95)")};
    box-shadow: ${(props) =>
      props.disabled === true
        ? "none"
        : "3px 2px 22px 1px rgba(0, 0, 0, 0.24)"};
  }
`;

const Modal = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  height: 100vh;
  justify-content: center;
  margin-top: -80px;
  position: fixed;
  width: 100vw;
  z-index: 1;

  .modal {
    align-items: center;
    background-color: #62b6b7;
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    height: 200px;
    justify-content: center;
    padding: 5px;
    width: 200px;
    z-index: 2;
  }
`;

export default function CalendarPage() {
  const [value, onChange] = useState(new Date());
  const [contentNum, setContentNum] = useState(3);
  const [modalOpenStatus, setModalOpenStatus] = useState({
    participant: false,
    join: false,
    register: false,
  });
  const [modalContent, setModalContent] = useState("");

  let showingCalenderDummy = CalendarDummy.slice(0, contentNum);

  const onParticipantButtonClick = () => {
    setModalOpenStatus({ ...modalOpenStatus, participant: true });
    document.body.style.overflow = "hidden";
  };

  const onJoinButtonClick = () => {
    setModalOpenStatus({ ...modalOpenStatus, join: true });
    document.body.style.overflow = "hidden";
  };

  const onRegisterButtonClick = () => {
    setModalOpenStatus({ ...modalOpenStatus, register: true });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalContent("");
    setModalOpenStatus({ participant: false, join: false, register: false });
    document.body.style.overflow = "unset";
  };

  const onSeeMoreButtonClick = () => {
    setContentNum(contentNum + 3);
    showingCalenderDummy = CalendarDummy.slice(0, contentNum);
  };

  const deliverindex = (idx) => {
    setModalContent(showingCalenderDummy[idx].participant);
  };

  const calendarMaker = showingCalenderDummy.map((e, idx) => {
    return (
      <div className="flex margin">
        <img className="thumbnail" src={e.imgURL} alt="post thumbnail" />
        <div className="ha">
          <div className="flex mountain">
            {e.mountain}
            <div className="ml20">{e.maker}</div>
          </div>
          <div className="title">{e.title}</div>
          <div>
            <FontAwesomeIcon icon={faPersonHiking} /> {e.current} / {e.limit}
            {e.participant.indexOf(
              localStorage.getItem("userId").slice(1, -1)
            ) !== -1 ? (
              <Button
                className="ml20"
                width="100px"
                onClick={() => {
                  onParticipantButtonClick();
                  deliverindex(idx);
                }}
              >
                {" "}
                참여자 보기{" "}
              </Button>
            ) : (
              <Button className="ml20" onClick={onJoinButtonClick}>
                {" "}
                참여하기{" "}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <Wrapper>
      <Calendar
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format("DD")}
        value={value}
        showNeighboringMonth={false}
        className="mb20 mt20"
      />
      <div className="mb20 meeting mt20">
        <div className="roof">{moment(value).format("YYYY년 MM월 DD일")}</div>
        {calendarMaker}
        <div className="flex mb20 mt20 va">
          {JSON.stringify(CalendarDummy) ===
            JSON.stringify(showingCalenderDummy) ||
          CalendarDummy.length === 0 ? (
            <div className="flex">
              원하시는 모임이 없나요?
              <Button className="ml20" onClick={onRegisterButtonClick}>
                모임 등록하기
              </Button>
            </div>
          ) : (
            <div className="cg" onClick={onSeeMoreButtonClick}>
              <FontAwesomeIcon icon={faArrowDown} /> 더보기
            </div>
          )}
        </div>
      </div>
      {modalOpenStatus.participant && (
        <Modal onClick={closeModal}>
          <div className="modal">
            {modalContent.split(",").map((e) => {
              return <div>{e}</div>;
            })}
          </div>
        </Modal>
      )}
      {modalOpenStatus.join && (
        <Modal onClick={closeModal}>
          <div className="modal">참여하기 모달</div>
        </Modal>
      )}
      {modalOpenStatus.register && (
        <Modal onClick={closeModal}>
          <div className="modal">등록하기 모달</div>
        </Modal>
      )}
    </Wrapper>
  );
}
