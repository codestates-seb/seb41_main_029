package com.mainproject.backend.global.exception;

public class BookmarkNotFoundException extends RuntimeException{
    public ExceptionCode ReplyNotFoundException() {

        return ExceptionCode.BOOKMARK_NOT_FOUND;
    }
}
