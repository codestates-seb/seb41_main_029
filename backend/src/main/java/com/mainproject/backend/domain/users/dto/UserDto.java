package com.mainproject.backend.domain.users.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class UserDto {

    @Getter
    @AllArgsConstructor
    public static class post {
        @NotNull(message = "아이디는 공백이 아니어야 합니다.")
        private String userId;

        @NotNull(message = "닉네임은 공백이 아니어야 합니다.")
        private String username;

        @NotNull(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        @NotNull(message = "아이디는 공백이 아니어야 합니다.")
        private String userId;

        @NotNull(message = "닉네임은 공백이 아니어야 합니다.")
        private String username;

        @NotNull(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        @NotNull
        private String profileImageUrl;
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long userSeq;
        private long point;
        private String userId;
        private String username;
        private String password;
        private String providerType;
        private String profileImageUrl;
        private String roleType;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
