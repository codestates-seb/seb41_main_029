package com.mainproject.backend.domain.board.dto;

import com.mainproject.backend.domain.comment.dto.CommentResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BoardWithCommentDto {
    private long boardSeq;
    private String category;
    private String title;
    private String content;
    private Long voteResult;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<CommentResponseDto> comments;


}
