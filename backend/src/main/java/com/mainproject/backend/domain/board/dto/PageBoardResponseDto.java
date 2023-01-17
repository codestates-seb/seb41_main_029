package com.mainproject.backend.domain.board.dto;

import com.mainproject.backend.domain.board.entity.Board;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PageBoardResponseDto {
    private Long boardSeq;

    private String category;

    private String title;

    private Long voteResult;

    private int viewCount;

    private int bookmarkCount;
    // 멤버 닉네임
    private LocalDateTime createdAt;
    // 답변 가져오기

}
