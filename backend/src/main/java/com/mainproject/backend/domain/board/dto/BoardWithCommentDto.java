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
    private long userSeq;
    private String category;
    private String title;
    private String content;
    private Integer viewCount;
    private String userId;
    private String username;
    private String profileImageUrl;
    private boolean bookmarkStatus;
    private int bookmarkCount;
    private int likeCount;
    private int dislikeCount;
    private int commented;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<CommentResponseDto> comments;


}
