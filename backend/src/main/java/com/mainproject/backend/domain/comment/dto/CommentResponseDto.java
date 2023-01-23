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
<<<<<<< HEAD
=======
    private String userId;
>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4
    private String content;
    private long boardSeq;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


}
