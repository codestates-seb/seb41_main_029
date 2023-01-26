package com.mainproject.backend.domain.board.dto;

import com.mainproject.backend.domain.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardSimpleDto {
    private Long boardSeq;
    private String title;
    private String username;
    private int liked;
    private int bookmarked;
    private int viewCount;
    private int commented;
    private LocalDateTime createdAt;

    public BoardSimpleDto toDto(Board board) {
        return new BoardSimpleDto(board.getBoardSeq(),
                board.getTitle(),
                board.getUser().getUsername(),
                board.getLiked(),
                board.getBookmarked(),
                board.getViewCount(),
                board.getCommented(),
                board.getCreatedAt());
    }
}
