package com.mainproject.backend.domain.comment.dto;

import com.mainproject.backend.domain.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.procedure.spi.ParameterRegistrationImplementor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentSimpleDto {
    private Long commentSeq;
    private Long boardSeq;
    private String content;
    private int liked;
    private int disliked;
    private LocalDateTime createdAt;

    public CommentSimpleDto toDto(Comment comment) {
        return new CommentSimpleDto(
                comment.getCommentSeq(),
                comment.getBoard().getBoardSeq(),
                comment.getContent(),
                comment.getLiked(),
                comment.getDisliked(),
                comment.getCreatedAt());
    }
}
