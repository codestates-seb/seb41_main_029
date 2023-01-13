package com.mainproject.backend.global.config.security;

import com.mainproject.backend.global.auth.token.AuthTokenProvider;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//jwt를 사용하기 위한 설정
@Configuration
public class JwtConfig {
    @Getter
    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public AuthTokenProvider jwtProvider() {
        return new AuthTokenProvider(secret);
    }
}
