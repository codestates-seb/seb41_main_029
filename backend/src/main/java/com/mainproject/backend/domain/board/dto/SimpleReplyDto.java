package com.mainproject.backend.domain.board.dto;

import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.reply.entity.Reply;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class SimpleReplyDto {
        private long replySeq;
        private long commentSeq;
        private long userSeq;
        private int liked;
        private int disliked;
        private String userId;
        private int point;
        private String content;
        private String username;
        private Reply.ReplyStatus replyStatus;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
}