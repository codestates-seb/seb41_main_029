package com.mainproject.backend.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class BoardDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class BoardPostDto{
        private String title;
        private String content;
        private String header;
    }
}
