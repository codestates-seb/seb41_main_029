package com.mainproject.backend.global.auth.filter;

import com.mainproject.backend.global.auth.token.AuthToken;
import com.mainproject.backend.global.auth.token.AuthTokenProvider;
import com.mainproject.backend.global.utils.HeaderUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final AuthTokenProvider tokenProvider;

    // usernamepasswordAuthenticationFilter보다 먼저 토큰을 바탕으로 유저를 등록시킨다.
    //토큰을 갖고와서 토큰이 맞으면 해당 유저 정보를 등록 시키고, 인증된 유저정보를 바탕으로 시큐리티에서 사용하는 토큰을 생성하고 등록한다.

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String tokenStr = HeaderUtil.getAccessToken(request);
        AuthToken token = tokenProvider.convertAuthToken(tokenStr);

        if(token.validate()){
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }
}
