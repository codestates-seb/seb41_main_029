package com.mainproject.backend.global.auth.token;

import io.jsonwebtoken.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.security.Key;
import java.util.Date;

//Jwt 패키지를 생성, 토큰 생성과 토큰의 유효성 검증 담당

@Slf4j
@RequiredArgsConstructor
public class AuthToken {

    @Getter
    private final String token;
    private final Key key;

    private static final String AUTHORITIES_KEY ="role";

    AuthToken(String id, Date expiry, Key key){
        this.key = key;
        this.token = createAuthToken(id, expiry);
    }
    AuthToken(String id, String role, Date expiry, Key key){
        this.key= key;
        this.token = createAuthToken(id, role, expiry);
    }

    //토큰 생성
    private String createAuthToken(String id, String role, Date expiry){
        return Jwts.builder()
                .setSubject(id)
                .claim(AUTHORITIES_KEY, role) //payload 부분에 들어갈 정보 조각들
                .signWith(key, SignatureAlgorithm.HS256) //토큰생성
                .setExpiration(expiry) // 토큰 유효기간 설정
                .compact();
    }
    private String createAuthToken(String id, Date expiry) {
        return Jwts.builder()
                .setSubject(id)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }

    //검증
    public boolean validate(){
        return this.getToken() != null;
    }

    //토큰 정보 해석, 예외 처리
    public Claims getTokenClaims(){
        try{//인스턴스를 생성
            return Jwts.parserBuilder()
                    .setSigningKey(key) //JWS 서명 검증을 위한 SecretKey 혹은 비대칭 PublicKey를 지정
                    .build()  //스레드에 안전한 JwtPaser를 리턴하기 위해 JwtPaserBuilder의 build()메서드를 호출
                    .parseClaimsJws(token)
                    .getBody();
        }catch (SecurityException e){
            log.info("invalid JWT signature.");
        }catch (MalformedJwtException e){
            log.info("invalid JWT token");
        }catch (ExpiredJwtException e){
            log.info("Expired JWT token"); //유효기간이 지남
        }catch (UnsupportedJwtException e){
            log.info("Unsupported JWT token");
        }catch (IllegalArgumentException e){
            log.info("JWT token compact of handler are invalid."); //토큰 압축 오류
        }
        return null;
    }

    public Claims getExpiredTokenClaims(){
        try{
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

        }catch (ExpiredJwtException e){
            log.info("Expired JWT token");
            return e.getClaims();
        }
        return null;
    }
}
