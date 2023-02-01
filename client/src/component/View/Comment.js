import React, { useState } from "react";
import { Cookies } from "react-cookie";
import styled from "styled-components";
import { deleteComment, editComment, postComment } from "../../api/commentAPI";
import { CommentDate } from "../DateCalculator";
import Input from "../Input";
import CommentVote from "./CommentVote";
import { useForm, FormProvider } from "react-hook-form";
import CommentReply from "./ReplyForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import Reply from "./Reply";

import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6 } from "../UserIcon";

const CommentInfo = styled.div`
  display: flex;
  padding-top: 16px;
  padding-left: 24px;
  height: 35px;
  width: 100%;
  max-width: 440px;
`;
const CommentInfo1 = styled.div`
  display: flex;
  padding-top: 16px;
  padding-left: 24px;
  height: 35px;
  width: 100%;
  max-width: 440px;
`;

const EtcIcon = styled.div`
  float: right;
  margin-top: 5px;
  height: 30px;
  margin-right: 12px;
  @media screen and (max-width: 1336px) {
    /* width: 90%; */
    height: 0px;
    margin-right: 12px;
  }
`;
const EditImg = styled.img`
  width: 28px;
  height: 30px;
  margin-bottom: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

const DeleteImg = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  margin-right: 15px;
  cursor: pointer;
`;

const CommentContainer = styled.div`
  width: 100%;
  max-width: 1135px;
  height: 100%;
  min-height: 65px;
  border-radius: 10px;
  margin-left: 24px;
  /* margin-right: 24px; */
  background-color: #f9f7f7;
  /* background-color: white; */
  padding: 8px;
  @media screen and (max-width: 1336px) {
    width: 90%;
  }
  @media screen and (max-width: 500px) {
    width: 85%;
  }
`;
const CommentContainer1 = styled.div`
  width: 100%;
  max-width: 136px;
  height: 100%;
  font-size: 17px;
  max-height: 30px;
  border-radius: 10px;
  /* margin-left: 24px;
  margin-right: 24px; */
  margin-bottom: 6px;
  background-color: #f9f7f7;
  /* background-color: white; */
  padding: 8px;
`;
const InputLayout = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 65px;
  border-radius: 10px;
  margin-left: 12px;
  display: flex;
  /* background-color: #f9f7f7; */
  padding-top: 8px;
  padding-left: 8px;
  .input {
    @media screen and (max-width: 1336px) {
      width: 95%;
    }
  }
`;
const SubmitEdit = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0px;
  border-radius: 5px;
  margin-top: 15px;
  width: ${(props) => props.width || "80px"};
  height: ${(props) => props.height || "30px"};
  &:hover {
    background-color: ${({ theme }) => theme.colors.main_hover};
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

const SubmitEditLayout = styled.div`
  /* float: right; */
  /* width: -10%; */
  margin-right: -45px;
  display: flex;
  flex-direction: row-reverse;
  .btn {
    margin-left: 12px;
    @media screen and (max-width: 1336px) {
      margin-right: 110px;
      /* display: flex; */
    }
  }
`;

const CommentLayout = styled.div`
  /* margin-right: 10px; */
`;
const CommentLayout1 = styled.div`
  display: flex;
  margin-bottom: -20px;
  margin-top: -15px;
  height: 80px;
  margin-left: 25px;
  /* justify-content: center; */
  align-items: center;
`;

const CommentBottom = styled.div`
  /* margin-right: 10px; */
  display: flex;
  width: 90%;
  height: 50px;
`;

const ReplyLayout = styled.div`
  display: flex;
  /* height: 20px; */
  /* width: 300px; */
  /* flex-direction: row-reverse; */
  justify-content: center;
  /* float: right; */
  /* margin-top: -12px; */
  /* margin-right: 40px; */
`;
const BottomContainer = styled.div`
  display: flex;
  /* height: 50px; */
`;

const PostWriter = styled.div`
  margin-top: -8px;
  margin-right: -4px;
  margin-left: -12px;
`;

const Comment = ({ comment }) => {
  const { boardSeq } = useParams();
  const methods = useForm();
  const onSubmit = async (data) => {
    editComment(token, data, boardSeq, commentSeq);
    window.location.reload();
    // console.log(data);
  };
  const [edit, setEdit] = useState(false);
  // const userId = localStorage.getItem("userId");
  const cookie = new Cookies();
  const token = cookie.get("token");
  const userId1 = JSON.parse(localStorage.getItem("userId"));
  const commentSeq = comment?.commentSeq;
  const [cancle, setCancle] = useState();
  // console.log(comment?.hide);
  const handleClickEdit = () => {
    //수정예정
    if (2 !== 2) {
      alert("권한이 없습니다.");
    } else {
      setEdit(!edit);
    }
  };
  // const EditSubmit = () => {
  //   // editComment();
  //   editComment(boardSeq);
  // };
  const handleDelete = () => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      // alert("삭제되었습니다")
      const res = deleteComment(token, boardSeq, commentSeq);
      window.location.reload();
      // console.log(res);
    }
  };
  return (
    <>
      {comment?.commentStatus === "COMMENT_NOT_EXIST" ? (
        <>
          <CommentInfo1>
            <span style={{ marginRight: "10px" }}>{comment?.username}</span>
            {/* <CommentDate createdAt={comment?.createdAt} /> */}
          </CommentInfo1>
          <CommentLayout1>
            <CommentContainer1>삭제된 댓글입니다.</CommentContainer1>
          </CommentLayout1>
          {comment?.reply?.map((item, index) => (
            <div key={index}>
              <Reply reply={item}></Reply>
            </div>
          ))}
        </>
      ) : (
        <CommentLayout>
          {userId1 === comment?.userId ? (
            <EtcIcon>
              <EditImg
                src={process.env.PUBLIC_URL + "/image/editIcon.svg"}
                alt="edit"
                onClick={handleClickEdit}
              />
              <DeleteImg
                src={process.env.PUBLIC_URL + "/image/deleteIcon.svg"}
                alt="delete"
                onClick={handleDelete}
              />
            </EtcIcon>
          ) : null}

          <CommentInfo>
            <PostWriter>
              {0 <= comment?.point && comment?.point <= 30 ? <Icon1 /> : ""}
              {31 <= comment?.point && comment?.point <= 70 ? <Icon2 /> : ""}
              {71 <= comment?.point && comment?.point <= 100 ? <Icon3 /> : ""}
              {101 <= comment?.point && comment?.point <= 200 ? <Icon4 /> : ""}
              {201 <= comment?.point && comment?.point <= 300 ? <Icon5 /> : ""}
              {301 <= comment?.point ? <Icon6 /> : ""}
            </PostWriter>
            <span style={{ marginRight: "10px" }}>{comment?.username}</span>
            <CommentDate createdAt={comment?.createdAt} />
          </CommentInfo>
          {edit ? (
            <>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormProvider {...methods}>
                  <InputLayout>
                    <Input
                      className="input"
                      width="1135px"
                      height="65px"
                      fieldName="content"
                      defaultValue={comment?.content}
                    />
                    <SubmitEditLayout>
                      <SubmitEdit className="btn" width="60px">
                        수정
                      </SubmitEdit>
                    </SubmitEditLayout>
                  </InputLayout>
                  {/* <EditInput defaultValue={comment?.content} /> */}
                </FormProvider>
              </form>
            </>
          ) : (
            <CommentContainer>{comment?.content} </CommentContainer>
          )}
          <BottomContainer>
            <CommentBottom>
              <CommentVote
                commentSeq={commentSeq}
                liked={comment?.liked}
                disliked={comment?.disliked}
              />
            </CommentBottom>
            <ReplyLayout>
              <CommentReply commentSeq={commentSeq} />
            </ReplyLayout>
          </BottomContainer>

          {/* {comment?.commentSeq === true ? ( */}
          {/* <ReplyContainer> */}
          {comment?.reply?.map((item, index) => (
            <div key={index}>
              <Reply reply={item}></Reply>
            </div>
          ))}
          {/* </ReplyContainer>  */}
          {/* //  ) : null} */}
        </CommentLayout>
      )}
    </>
  );
};

export default Comment;
