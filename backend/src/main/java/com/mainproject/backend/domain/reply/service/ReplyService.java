package com.mainproject.backend.domain.reply.service;

import com.mainproject.backend.domain.board.service.BoardService;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.reply.dto.CommentReplyDto;
import com.mainproject.backend.domain.reply.entity.DislikeReply;
import com.mainproject.backend.domain.reply.entity.LikeReply;
import com.mainproject.backend.domain.reply.entity.Reply;
import com.mainproject.backend.domain.reply.repository.DislikeReplyRepository;
import com.mainproject.backend.domain.reply.repository.LikeReplyRepository;
import com.mainproject.backend.domain.reply.repository.ReplyRepository;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.global.exception.BusinessLogicException;
import com.mainproject.backend.global.exception.ExceptionCode;
import com.mainproject.backend.global.exception.ReplyNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReplyService {

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
    public void deleteReply(long replySeq, Long userSeq) {
        Reply findReply = findVerifiedReply(replySeq);
//        Board board = new Board();
//        Board currentBoard = boardService.findVerifiedBoard(board.getBoardSeq());
        if(userSeq != findReply.getUser().getUserSeq()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        }
//        currentBoard.decreaseCommentCount();
        findReply.setReplyExist(Reply.ReplyStatus.REPLY_NOT_EXIST);
        replyRepository.save(findReply);
    }

    //코맨트 존재 확인
    private Reply findVerifiedReply(Long replySeq){
        Optional<Reply> optionalComment = replyRepository.findById(replySeq);
        Reply findReply =
                optionalComment.orElseThrow( () ->
                        new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));
        return findReply;
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
