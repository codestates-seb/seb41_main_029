package com.mainproject.backend.domain.comment.repository;

import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.entity.LikeComment;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeCommentRepository extends JpaRepository<LikeComment, Long> {

    Optional<LikeComment> findByCommentAndUser(Comment comment, User user);
}
