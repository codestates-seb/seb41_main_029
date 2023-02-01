package com.mainproject.backend.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    REPLY_NOT_FOUND(404, "Reply not found"),
    BOARD_NOT_FOUND(404, "Board not found"),
    TAG_NOT_FOUND(404, "Tag not found"),
    UNAUTHORIZED_MEMBER(403, "Unauthorized member"),
    BOOKMARK_NOT_FOUND(404, "Bookmark not found"),

    ACCESS_DENIED_USER(403, "Access Denied User");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
