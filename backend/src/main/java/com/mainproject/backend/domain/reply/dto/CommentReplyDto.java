package com.mainproject.backend.domain.reply.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentReplyDto {


    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class ReplyPost{

        @NotBlank
        private String content;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class ReplyPatchDto{

        @NotBlank
        private String content;
    }

    @Getter
    @Setter
    public static class ReplyResponse{
        private long replySeq;
        private long commentSeq;
        private long userSeq;
        private String content;
        private String username;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}