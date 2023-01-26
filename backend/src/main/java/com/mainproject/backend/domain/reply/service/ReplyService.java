package com.mainproject.backend.domain.reply.service;

import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.entity.DislikeComment;
import com.mainproject.backend.domain.comment.entity.LikeComment;
import com.mainproject.backend.domain.comment.repository.CommentRepository;
import com.mainproject.backend.domain.comment.repository.DislikeCommentRepository;
import com.mainproject.backend.domain.comment.repository.LikeCommentRepository;
import com.mainproject.backend.domain.reply.dto.CommentReplyDto;
import com.mainproject.backend.domain.reply.entity.DislikeReply;
import com.mainproject.backend.domain.reply.entity.LikeReply;
import com.mainproject.backend.domain.reply.entity.Reply;
import com.mainproject.backend.domain.reply.repository.DislikeReplyRepository;
import com.mainproject.backend.domain.reply.repository.LikeReplyRepository;
import com.mainproject.backend.domain.reply.repository.ReplyRepository;
import com.mainproject.backend.domain.users.dto.UserDto;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.global.exception.CommentNotFoundException;
import com.mainproject.backend.global.exception.ReplyNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReplyService {

    private final CommentRepository commentRepository;
    private final DislikeReplyRepository dislikeReplyRepository;
    private final LikeReplyRepository likeReplyRepository;
    private final ReplyRepository replyRepository;
    private final static String SUCCESS_LIKE_REPLY = "추천 처리 완료";
    private final static String FAIL_LIKE_REPLY = "이미 추천을 누르셨습니다.";
    private final static String SUCCESS_DISLIKE_REPLY = "비추천 처리 완료";
    private final static String FAIL_DISLIKE_REPLY = "이미 비추천을 누르셨습니다.";


    //대댓글 기능
    public Reply createReply(Reply reply, Comment comment, User user, CommentReplyDto.ReplyPost req){
        reply.setComment(comment);
        reply.setUser(user);
        reply.setContent(req.getContent());

        return replyRepository.save(reply);
    }


    //대댓글 수정
   @Transactional
    public Reply editReply(Reply reply, User user, CommentReplyDto.ReplyPatchDto req) {
        reply.setUser(user);
        reply.editReply(req);
        return replyRepository.save(reply);
    }

    //대댓글 삭제
    @Transactional
    public void deleteReply(Reply reply) {
        replyRepository.delete(reply);
    }

    //추천 기능
    public String createLikeReply(Reply reply, User user) {
        LikeReply likeReply = new LikeReply(reply, user); // true 처리
        likeReplyRepository.save(likeReply);
        return SUCCESS_LIKE_REPLY;
    }
    //비추천 기능
    public String createDislikeReply(Reply reply, User user) {
        DislikeReply dislikeReply = new DislikeReply(reply, user); // true 처리
        dislikeReplyRepository.save(dislikeReply);
        return SUCCESS_DISLIKE_REPLY;
    }


    //추천 로직
    @Transactional
    public String updateLikeOfReply(Long ReplySeq, User user) {
        Reply reply = replyRepository.findById(ReplySeq).orElseThrow(ReplyNotFoundException::new);
        if (!hasLikeReply(reply, user)) {
            reply.increaseLikeCount();
            return createLikeReply(reply, user);
        }else return FAIL_LIKE_REPLY;
    }

    //비추천 로직
    @Transactional
    public String updateDislikeOfReply(Long ReplySeq, User user) {
        Reply reply = replyRepository.findById(ReplySeq).orElseThrow(ReplyNotFoundException::new);
        if (!hasDislikeReply(reply, user)) {
            reply.increaseDislikeCount();
            return createDislikeReply(reply, user);
        }else return FAIL_DISLIKE_REPLY;
    }

    //DB에 추천 여부 확인
    public boolean hasLikeReply(Reply reply, User user){
        return likeReplyRepository.findByReplyAndUser(reply, user).isPresent();
    }

    //DB에 비추천 여부 확인
    public boolean hasDislikeReply(Reply reply, User user) {
        return dislikeReplyRepository.findByReplyAndUser(reply, user).isPresent();
    }
}
