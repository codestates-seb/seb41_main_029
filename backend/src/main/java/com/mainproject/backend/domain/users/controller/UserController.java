package com.mainproject.backend.domain.users.controller;

import com.mainproject.backend.domain.users.dto.UserDto;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.mapper.UserMapper;
import com.mainproject.backend.domain.users.repository.UserRepository;
import com.mainproject.backend.domain.users.service.UserService;
import com.mainproject.backend.global.Response.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final UserMapper mapper;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserDto.Response> postMember(@Valid @RequestBody UserDto.post requestBody){
        User user = mapper.userPostToUser(requestBody);
        User createUser = userService.createUser(requestBody);

        return ApiResponse.success("user", mapper.userToUserResponse(createUser));
    }



    @GetMapping("/mypage")
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = getPrincipal();
        //User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", user);
    }

//    @ResponseStatus(HttpStatus.OK)
//    @PutMapping("/users")
//    public ApiResponse editUserInfo(@RequestBody MemberEditRequestDto memberEditRequestDto) {
//        User member = getPrincipal();
//        return ApiResponse.success("user", memberService.editMemberInfo(member, memberEditRequestDto));
//    }

    public User getPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserId(authentication.getName());
        return user;
    }
    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || AnonymousAuthenticationToken.class.
                isAssignableFrom(authentication.getClass())) {
            return false;
        }
        return authentication.isAuthenticated();
    }
}