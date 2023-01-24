package com.mainproject.backend.domain.comment.service;

import com.mainproject.backend.domain.board.entity.Board;
<<<<<<< HEAD
import com.mainproject.backend.domain.board.repositoty.BoardRepository;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.repository.CommentRepository;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.entity.UserRefreshToken;
import com.mainproject.backend.domain.users.repository.UserRepository;
=======
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.repository.CommentRepository;
import com.mainproject.backend.domain.users.entity.User;
>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4
import com.mainproject.backend.global.exception.BusinessLogicException;
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
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    public Comment createComment(Comment comment, User user, Board board){
        comment.setUser(user);
        comment.setBoard(board);

        User user = userRepository.getReferenceById(comment.getUser().getUserSeq());
        Board board = boardRepository.getReferenceById(comment.getBoard().getBoardSeq());

        comment.setUser(user);
        comment.setBoard(board);

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment){

        Comment findComment = findVerifiedComment(comment.getCommentSeq());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);
    }

    public void deleteComment(long commentSeq){
        Comment findComment = findVerifiedComment(commentSeq);

        commentRepository.delete(findComment);
    }

    private Comment findVerifiedComment(Long commentSeq){
        Optional<Comment> optionalComment = commentRepository.findById(commentSeq);
        Comment findComment =
                optionalComment.orElseThrow( () ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

}
