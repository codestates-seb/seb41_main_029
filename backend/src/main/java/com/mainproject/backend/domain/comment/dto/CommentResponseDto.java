package com.mainproject.backend.domain.comment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class CommentResponseDto {
    private long commentSeq;
    private long userSeq;
    private String userId;
    private String content;
    private long boardSeq;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


}
