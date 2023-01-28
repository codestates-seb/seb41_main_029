package com.mainproject.backend.domain.comment.dto;

import com.mainproject.backend.domain.board.dto.SimpleReplyDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
public class CommentResponseDto {
    private long commentSeq;
    private long userSeq;
    private int liked;
    private int disliked;
    private String userId;
    private String username;
    private String content;
    private long boardSeq;
    private Comment.CommentStatus commentStatus;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<SimpleReplyDto> reply;
}
