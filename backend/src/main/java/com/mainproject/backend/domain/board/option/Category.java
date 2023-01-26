package com.mainproject.backend.domain.board.option;

import lombok.Getter;

public enum Category {
    GENERAL("GENERAL"),
    INFORMATION("INFORMATION"),
    QUESTION("QUESTION");

    @Getter
    public String category;

    Category(String category) {
        this.category = category;
    }
}
