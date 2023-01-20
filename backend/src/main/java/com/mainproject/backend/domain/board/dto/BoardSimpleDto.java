package com.mainproject.backend.domain.board.dto;

import com.mainproject.backend.domain.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardSimpleDto {
    private Long boardSeq;
    private String title;
    private String username;
    private int liked;
    private int bookmarked;

    public BoardSimpleDto toDto(Board board) {
        return new BoardSimpleDto(board.getBoardSeq(), board.getTitle(), board.getUser().getUsername(), board.getLiked(),
                board.getBookmarked());
    }
}
