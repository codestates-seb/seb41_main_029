package com.mainproject.backend.domain.board.option;

import lombok.Getter;

public enum Category {
    GENERAL("# 일반"),
    INFORMATION("# 정보"),
    QUESTION("# 질문");

    @Getter
    public String category;

    Category(String category) {
        this.category = category;
    }
}
