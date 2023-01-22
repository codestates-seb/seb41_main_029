package com.mainproject.backend.domain.board.option;

import lombok.Getter;

public enum Category {
    GENERAL("# 자유 게시판"),
    INFORMATION("# 정보 공유"),
    QUESTION("질문 사항");

    @Getter
    public String category;

    Category(String category) {
        this.category = category;
    }
}
