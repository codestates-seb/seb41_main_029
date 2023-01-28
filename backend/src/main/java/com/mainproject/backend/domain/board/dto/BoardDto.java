package com.mainproject.backend.domain.board.dto;


import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.option.Category;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;


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
        private String profileImageUrl;
        private String userId;
        private boolean BookmarkStatus;
        private int bookmarkCount;
        private int viewCount;
        private int likeCount;
        private int dislikeCount;
        private List<String> imageUrls;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        public response(Board board) {
            this.boardSeq = board.getBoardSeq();
            this.userSeq = board.getUser().getUserSeq();
            this.username = board.getUser().getUsername();
            this.profileImageUrl = board.getUser().getProfileImageUrl();
            this.userId = board.getUser().getUserId();
            this.category = board.getCategory().category;
            this.title = board.getTitle();
            this.content = board.getContent();
            this.BookmarkStatus = board.isBookmarkStatus();
            this.bookmarkCount = board.getBookmarked();
            this.likeCount = board.getLiked();
            this.dislikeCount = board.getDisliked();
            this.viewCount = board.getViewCount();
            this.createdAt = board.getCreatedAt();
            this.modifiedAt = board.getModifiedAt();
            this.imageUrls = board.getImageUrls();
        }
    }
    @Getter
    @AllArgsConstructor
    @Builder
    public static class PageBoardResponse {
        private Long boardSeq;

        private Long userSeq;
        private String username;
        private String category;
        private String title;
        private boolean BookmarkStatus;
        private int bookmarkCount;
        private int viewCount;
        private int likeCount;
        private int dislikeCount;
        private int commented;
        private LocalDateTime createdAt;

        public PageBoardResponse(Board board) {
            this.boardSeq = board.getBoardSeq();
            this.userSeq = board.getUser().getUserSeq();
            this.username = board.getUser().getUsername();
            this.category = board.getCategory().category;
            this.title = board.getTitle();
            this.commented = board.getCommented();
            this.BookmarkStatus = board.isBookmarkStatus();
            this.bookmarkCount = board.getBookmarked();
            this.likeCount = board.getLiked();
            this.dislikeCount = board.getDisliked();
            this.viewCount = board.getViewCount();
            this.createdAt = board.getCreatedAt();
        }
    }
}
