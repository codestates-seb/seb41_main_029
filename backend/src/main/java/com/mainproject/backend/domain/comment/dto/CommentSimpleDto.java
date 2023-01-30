package com.mainproject.backend.domain.comment.dto;

import com.mainproject.backend.domain.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentSimpleDto {
    private Long boardSeq;
    private String title;
    private String username;
    private int liked;
    private int bookmarked;
    private int viewCount;
    private int commented;
    private String category;
    private LocalDateTime createdAt;

    public CommentSimpleDto toDto(Comment comment) {
        return new CommentSimpleDto(
                comment.getBoard().getBoardSeq(),
                comment.getBoard().getTitle(),
                comment.getUser().getUsername(),
                comment.getBoard().getLiked(),
                comment.getBoard().getBookmarked(),
                comment.getBoard().getViewCount(),
                comment.getBoard().getCommented(),
                comment.getBoard().getCategory().category,
                comment.getCreatedAt());
    }
}
