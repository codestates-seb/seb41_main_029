package com.mainproject.backend.domain.users.controller;

import com.mainproject.backend.domain.board.dto.BoardSimpleDto;
import com.mainproject.backend.domain.board.entity.Bookmark;
import com.mainproject.backend.domain.board.repositoty.BookmarkRepository;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

import static com.mainproject.backend.global.exception.ExceptionCode.UNAUTHORIZED_MEMBER;

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
//        User user = mapper.userPostToUser(requestBody);
        User createUser = userService.createUser(requestBody);

        return ApiResponse.success("user", mapper.userToUserResponse(createUser));
    }



    @GetMapping("/mypage")
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        //User user = getPrincipal();
        User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", mapper.userToUserResponse(user));
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/mypage")
    public ApiResponse<UserDto.Response> editMemberInfo(@RequestBody UserDto.Patch req) {
        User user = getPrincipal();
        User editUser = userService.editMemberInfo(user, req);
        return ApiResponse.success("user", mapper.userToUserResponse(editUser));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping()
    public ApiResponse deleteMemberInfo() {
        User user = getPrincipal();
        userService.deleteMemberInfo(user);
        return ApiResponse.success("회원 탈퇴 성공",null);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/Bookmark")
    public ApiResponse findBookmark() {
        User user = getPrincipal();
        return ApiResponse.success("Bookmark", userService.findBookmark(user));
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


//    private boolean isAuthenticated() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication == null || AnonymousAuthenticationToken.class.
//                isAssignableFrom(authentication.getClass())) {
//            return false;
//        }
//        return authentication.isAuthenticated();
//    }
}