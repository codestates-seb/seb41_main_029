package com.mainproject.backend.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CommentDto {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class commentPostDto{
        private long userId;
        private long boardId;
        private String content;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class commentPatchDto{
        private long userId;
        private long boardId;
        private String content;
    }
}
