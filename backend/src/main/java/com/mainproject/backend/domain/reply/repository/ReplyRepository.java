package com.mainproject.backend.domain.reply.repository;

import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.reply.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    List<Reply> findAllByComment(Comment Comment);
}
