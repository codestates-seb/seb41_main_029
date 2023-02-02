package com.mainproject.backend.domain.reply.repository;

import com.mainproject.backend.domain.reply.entity.LikeReply;
import com.mainproject.backend.domain.reply.entity.Reply;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeReplyRepository extends JpaRepository<LikeReply, Long> {

    Optional<LikeReply> findByReplyAndUser(Reply reply, User user);
}
