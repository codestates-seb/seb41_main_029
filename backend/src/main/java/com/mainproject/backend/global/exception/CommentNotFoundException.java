package com.mainproject.backend.global.exception;

public class CommentNotFoundException extends RuntimeException{

    public ExceptionCode CommentNotFoundException() {

        return ExceptionCode.COMMENT_NOT_FOUND;
    }
}
