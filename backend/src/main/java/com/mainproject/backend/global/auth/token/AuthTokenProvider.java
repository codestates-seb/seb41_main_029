package com.mainproject.backend.global.auth.token;

import com.mainproject.backend.global.auth.exception.TokenValidFailedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public class AuthTokenProvider {

    @Value("${mail.address.admin}")
    private String adminMailAddress;

    private final Key key;
    private static final String AUTHORITIES_KEY = "role";


    //스트링인 yml 파일의 secret키를 인코딩 된 byte 배열로 변환후 다시 SecretKey로 변환해 주는 hmacShaKeyFor
    public AuthTokenProvider(String secret){
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public AuthToken createAuthToken(String id, Date expiry){
        return new AuthToken(id, expiry, key);
    }

    //토큰에 권한 추가
    public AuthToken createAuthToken(String id, String role, Date expiry) {
        return new AuthToken(id, role, expiry, key);
    }

    //토큰 전환 String -> token
    public AuthToken convertAuthToken(String token) {
        return new AuthToken(token, key);
    }

    // token 값에서 사용자의 정보를 꺼내는 함수
    public Authentication getAuthentication(AuthToken authToken){
        //유효한 토큰이라면
        if(authToken.validate()){

            //토큰 정보를 가져온다.
            //사용자의 Role을 조회하여 authorities에 세팅한다.
            Claims claims = authToken.getTokenClaims();
            Collection<? extends GrantedAuthority> authorities =
                    Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());

            log.debug("claims subject := [{}]", claims.getSubject());
            //org.springframework.security.core.userdetails.User
            User principal = new User(claims.getSubject(), "",authorities);

            return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
        }else{
            throw new TokenValidFailedException();
        }
    }
}
