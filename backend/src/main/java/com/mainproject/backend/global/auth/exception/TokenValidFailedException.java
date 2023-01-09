package com.mainproject.backend.global.auth.exception;


//인증 오류, RuntimeException
public class TokenValidFailedException extends RuntimeException{

    public TokenValidFailedException(){
        super("Failed to generate Token");
    }

    private TokenValidFailedException(String message){
        super(message);
    }
}
