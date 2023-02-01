package com.mainproject.backend.global.exception;

public class MemberNotFoundException extends RuntimeException{

    public ExceptionCode MemberNotFoundException() {

        return ExceptionCode.MEMBER_NOT_FOUND;
    }
}
