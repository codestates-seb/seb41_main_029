package com.mainproject.backend.global.auth.info;

import com.mainproject.backend.global.auth.entity.ProviderType;
import com.mainproject.backend.global.auth.info.impl.FacebookOAuth2UserInfo;
import com.mainproject.backend.global.auth.info.impl.GoogleOAuth2UserInfo;
import com.mainproject.backend.global.auth.info.impl.KakaoOAuth2UserInfo;
import com.mainproject.backend.global.auth.info.impl.NaverOAuth2UserInfo;

import java.util.Map;


//ProviderType에 따라 UserInfo 나눔
public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType) {
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
            case FACEBOOK: return new FacebookOAuth2UserInfo(attributes);
            case NAVER: return new NaverOAuth2UserInfo(attributes);
            case KAKAO: return new KakaoOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}
