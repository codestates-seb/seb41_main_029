package com.mainproject.backend.domain.comment.repository;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findAllByUserAndCommentExist(User user, Comment.CommentStatus commentStatus);
//    List<Comment> findAllByBoardExists(Board.BoardStatus boardStatus);
    List<Comment> findAllByBoardAndCommentExist(Board board, Comment.CommentStatus commentStatus);
}
