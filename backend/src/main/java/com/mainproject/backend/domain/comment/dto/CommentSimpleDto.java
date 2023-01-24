package com.mainproject.backend.domain.comment.dto;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentSimpleDto {
    private Long CommentSeq;
    private Long boardSeq;
    private String username;
    private String content;
    private int liked;
    private int disliked;

    public CommentSimpleDto toDto(Comment comment) {
        return new CommentSimpleDto(comment.getCommentSeq(), comment.getBoard().getBoardSeq(), comment.getContent(), comment.getUser().getUsername(), comment.getLiked(),
                comment.getDisliked());
    }
}
