package com.mainproject.backend.global.exception;

public class BoardNotFoundException extends RuntimeException{
    public ExceptionCode ReplyNotFoundException() {

        return ExceptionCode.BOARD_NOT_FOUND;
    }
}
