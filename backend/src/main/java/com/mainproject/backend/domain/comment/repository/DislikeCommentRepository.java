package com.mainproject.backend.domain.comment.repository;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.DislikeBoard;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.entity.DislikeComment;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DislikeCommentRepository extends JpaRepository<DislikeComment, Long> {

    Optional<DislikeComment> findByCommentAndUser(Comment comment, User user);
}
