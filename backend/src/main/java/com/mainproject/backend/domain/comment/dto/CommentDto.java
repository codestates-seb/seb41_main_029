package com.mainproject.backend.domain.comment.dto;

import com.mainproject.backend.domain.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class CommentPostDto{

        @NotBlank
        private String content;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class CommentPatchDto{

        @NotBlank
        private String content;
    }

    @Getter
    @Setter
    public static class Response{
        private long commentSeq;
        private long userSeq;
        private long boardSeq;
        private String content;
        private int liked;
        private int disliked;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;


        public void setBoard(Board board){
            this.boardSeq = board.getBoardSeq();
        }
    }


}


