package com.mainproject.backend.domain.comment.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CommentResponseDto {
    private long commentId;
//    private long userId;
//    private long boardId;
    private String content;

}
