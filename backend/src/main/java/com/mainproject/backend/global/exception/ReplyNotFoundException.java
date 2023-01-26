package com.mainproject.backend.global.exception;

public class ReplyNotFoundException extends RuntimeException{

    public ExceptionCode ReplyNotFoundException() {

        return ExceptionCode.REPLY_NOT_FOUND;
    }
}
