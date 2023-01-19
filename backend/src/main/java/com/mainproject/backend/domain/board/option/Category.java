package com.mainproject.backend.domain.board.option;

import javax.swing.plaf.PanelUI;

public enum Category implements EnumModel{
    GENERAL("# 자유 게시판"),
    INFORMATION("# 정보 공유"),
    QUESTION("질문 사항");

    public String value;

    Category(String value) {
        this.value = value;
    }

    @Override
    public String getKey() {
        return name();
    }

    @Override
    public String getValue(){
        return value;
    }
}
