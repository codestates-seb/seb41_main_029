package com.mainproject.backend.domain.board.dto;


import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.option.Category;
import com.mainproject.backend.domain.comment.dto.CommentResponseDto;
import com.mainproject.backend.domain.users.dto.UserDto;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;


public class BoardDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{

        private Category category;
        @NotBlank
        private String title;
        @NotBlank
        private String content;

    }

    @Getter
    @Setter
    public static class Patch{

        private Long boardSeq;
        private Category category;
        @NotBlank
        private String title;
        @NotBlank
        private String content;

        private LocalDateTime updateAt;

        public Patch(Category category, String title, String content) {
            this.category = category;
            this.title = title;
            this.content = content;
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class response{
//        private UserDto.Response user;
        private Long boardSeq;
        private String category;
        private String title;
        private String content;
        private Long voteResult;
        private int viewCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        private UserDto.Response user;

//        public response(Board board) {
//            this.boardSeq = board.getBoardSeq();
//            this.category = board.getCategory().getValue();
//            this.title = board.getTitle();
//            this.content = board.getContent();
//            this.voteResult = board.getVoteResult();
//            this.viewCount = board.getViewCount();
//            this.createdAt = board.getCreatedAt();
//            this.modifiedAt = board.getModifiedAt();
//        }
    }

}
