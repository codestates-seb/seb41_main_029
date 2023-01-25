package com.mainproject.backend.domain.board.dto;

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
        private String userId;
        private String content;
        private String username;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

}