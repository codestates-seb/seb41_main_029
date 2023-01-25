package com.mainproject.backend.domain.reply.service;

import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.repository.CommentRepository;
import com.mainproject.backend.domain.comment.repository.DislikeCommentRepository;
import com.mainproject.backend.domain.comment.repository.LikeCommentRepository;
import com.mainproject.backend.domain.reply.dto.CommentReplyDto;
import com.mainproject.backend.domain.reply.entity.Reply;
import com.mainproject.backend.domain.reply.repository.ReplyRepository;
import com.mainproject.backend.domain.users.dto.UserDto;
import com.mainproject.backend.domain.users.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReplyService {

    private final CommentRepository commentRepository;
    private final DislikeCommentRepository dislikeCommentRepository;
    private final LikeCommentRepository likeCommentRepository;
    private final ReplyRepository replyRepository;
    private final static String SUCCESS_LIKE_COMMENT = "추천 처리 완료";
    private final static String FAIL_LIKE_COMMENT = "이미 추천을 누르셨습니다.";
    private final static String SUCCESS_DISLIKE_COMMENT = "비추천 처리 완료";
    private final static String FAIL_DISLIKE_COMMENT = "이미 비추천을 누르셨습니다.";


    //대댓글 기능
    public Reply createReply(Reply reply, Comment comment, User user, CommentReplyDto.ReplyPost req){
//        reply.setBoard(board);
        reply.setComment(comment);
        reply.setUser(user);
        reply.setContent(req.getContent());
//        Board currentBoard = boardService.findVerifiedBoard(board.getBoardSeq());
//        currentBoard.increaseCommentCount();

        return replyRepository.save(reply);
    }


   @Transactional
    public Reply editReply(Reply reply/*Comment comment, User user*/, CommentReplyDto.ReplyPatchDto req) {
//        reply.setComment(comment);
//        reply.setUser(user);
        reply.editReply(req);
        return replyRepository.save(reply);
    }

    @Transactional
    public void deleteReply(Reply reply) {
        // jwt 토큰 만료 처리는 어떻게 할지 추후에 고민해보기
        replyRepository.delete(reply);
    }

}
