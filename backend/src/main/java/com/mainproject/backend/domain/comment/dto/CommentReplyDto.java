package com.mainproject.backend.domain.comment.dto;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.entity.Reply;
import lombok.*;

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

//        public ReplyResponse(Reply reply){
//            this.replySeq = reply.getReplySeq();
//            this.commentSeq = reply.getComment().getCommentSeq();
//            this.userSeq = reply.getUser().getUserSeq();
//            this.content = reply.getContent();
//            this.createdAt = reply.getCreatedAt();
//            this.modifiedAt = reply.getModifiedAt();
//        }
    }
}