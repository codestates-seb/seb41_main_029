package com.mainproject.backend.domain.reply.repository;

import com.mainproject.backend.domain.reply.entity.DislikeReply;
import com.mainproject.backend.domain.reply.entity.Reply;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DislikeReplyRepository extends JpaRepository<DislikeReply, Long> {

    Optional<DislikeReply> findByReplyAndUser(Reply reply, User user);
}
