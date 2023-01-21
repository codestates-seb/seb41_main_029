package com.mainproject.backend.domain.board.dto;


import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.option.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;


public class BoardDto {

    @Getter
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

        public Patch(Category category, String title, String content) {
            this.category = category;
            this.title = title;
            this.content = content;
        }
    }
    @AllArgsConstructor
    @Getter
    @Setter
    public static class response{
        private Long boardSeq;
        private Long userSeq;
        private String username;
        private String category;
        private String title;
        private String content;
        private boolean BookmarkStatus;
        private int bookmarkCount;
        private int viewCount;
        private int likeCount;
        private int dislikeCount;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        public response(Board board) {
            this.boardSeq = board.getBoardSeq();
            this.userSeq = board.getUser().getUserSeq();
            this.username = board.getUser().getUsername();
            this.category = board.getCategory().getValue();
            this.title = board.getTitle();
            this.content = board.getContent();
            this.BookmarkStatus = board.isBookmarkStatus();
            this.bookmarkCount = board.getBookmarked();
            this.likeCount = board.getLiked();
            this.dislikeCount = board.getDisliked();
            this.viewCount = board.getViewCount();
            this.createdAt = board.getCreatedAt();
            this.modifiedAt = board.getModifiedAt();
        }
    }
}
