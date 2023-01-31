package com.mainproject.backend.domain.comment.service;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.repositoty.BoardRepository;
import com.mainproject.backend.domain.board.service.BoardService;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.entity.DislikeComment;
import com.mainproject.backend.domain.comment.entity.LikeComment;
import com.mainproject.backend.domain.comment.repository.CommentRepository;
import com.mainproject.backend.domain.comment.repository.DislikeCommentRepository;
import com.mainproject.backend.domain.comment.repository.LikeCommentRepository;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.global.exception.BusinessLogicException;
import com.mainproject.backend.global.exception.CommentNotFoundException;
import com.mainproject.backend.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final DislikeCommentRepository dislikeCommentRepository;
    private final LikeCommentRepository likeCommentRepository;
    private final BoardRepository boardRepository;
    private final BoardService boardService;
    private final static String SUCCESS_LIKE_COMMENT = "추천 처리 완료";
    private final static String FAIL_LIKE_COMMENT = "이미 추천을 누르셨습니다.";
    private final static String SUCCESS_DISLIKE_COMMENT = "비추천 처리 완료";
    private final static String FAIL_DISLIKE_COMMENT = "이미 비추천을 누르셨습니다.";

    //코맨트 생성
    public Comment createComment(Comment comment, User user, Board board){
        comment.setUser(user);
        comment.setBoard(board);
        Board currentBoard = boardService.findVerifiedBoard(comment.getBoard().getBoardSeq());
        currentBoard.increaseCommentCount();

        return commentRepository.save(comment);
    }

    //코맨트 수정
    public Comment updateComment(Comment comment){

        Comment findComment = findVerifiedComment(comment.getCommentSeq());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);
    }

    //코맨트 삭제
    public void deleteComment(long commentSeq, Long userSeq){
        Comment findComment = findVerifiedComment(commentSeq);
        Board currentBoard = boardService.findVerifiedBoard(findComment.getBoard().getBoardSeq());
        if(userSeq != findComment.getUser().getUserSeq()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        }
        currentBoard.decreaseCommentCount();
        findComment.setCommentExist(Comment.CommentStatus.COMMENT_NOT_EXIST);
        commentRepository.save(findComment);
    }

    //코맨트 존재 확인
    private Comment findVerifiedComment(Long commentSeq){
        Optional<Comment> optionalComment = commentRepository.findById(commentSeq);
        Comment findComment =
                optionalComment.orElseThrow( () ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

    //추천 기능
    public String createLikeComment(Comment comment, User user) {
        LikeComment likeComment = new LikeComment(comment, user); // true 처리
        likeCommentRepository.save(likeComment);
        return SUCCESS_LIKE_COMMENT;
    }
    //비추천 기능
    public String createDislikeComment(Comment comment, User user) {
        DislikeComment dislikeComment = new DislikeComment(comment, user); // true 처리
        dislikeCommentRepository.save(dislikeComment);
        return SUCCESS_DISLIKE_COMMENT;
    }


    //코맨트 추천 로직
    @Transactional
    public String updateLikeOfComment(Long CommentSeq, User user) {
        Comment comment = commentRepository.findById(CommentSeq).orElseThrow(CommentNotFoundException::new);
        if (!hasLikeComment(comment, user)) {
            comment.increaseLikeCount();
            comment.setUser(comment.getUser());
            comment.getUser().increasePoint();
            return createLikeComment(comment, user);
        }else return FAIL_LIKE_COMMENT;
    }

    //코맨트 비추천 로직
    @Transactional
    public String updateDislikeOfComment(Long CommentSeq, User user) {
        Comment comment = commentRepository.findById(CommentSeq).orElseThrow(CommentNotFoundException::new);
        if (!hasDislikeComment(comment, user)) {
            comment.increaseDislikeCount();
            comment.setUser(comment.getUser());
            comment.getUser().decreasePoint();
            return createDislikeComment(comment, user);
        }else return FAIL_DISLIKE_COMMENT;
    }

    //코맨트 추천 여부 확인
    public boolean hasLikeComment(Comment comment, User user){
        return likeCommentRepository.findByCommentAndUser(comment, user).isPresent();
    }

    //코맨트 비추천 여부 확인
    public boolean hasDislikeComment(Comment comment, User user) {
        return dislikeCommentRepository.findByCommentAndUser(comment, user).isPresent();
    }
}
