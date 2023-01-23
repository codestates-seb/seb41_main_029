package com.mainproject.backend.domain.comment.dto;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.users.entity.User;
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
<<<<<<< HEAD
        private long userSeq;
        private long commentSeq;
        private long boardSeq;
=======

>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4
        @NotBlank
        private String content;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class CommentPatchDto{
<<<<<<< HEAD
        private long userSeq;
        private long commentSeq;
        private long boardSeq;
=======

>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4
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
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;


        public void setBoard(Board board){
            this.boardSeq = board.getBoardSeq();
        }

        public void setUser(User user) { this.userSeq = user.getUserSeq();}

    }


}


