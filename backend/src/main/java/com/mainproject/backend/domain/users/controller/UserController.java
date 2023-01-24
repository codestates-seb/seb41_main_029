package com.mainproject.backend.domain.users.controller;

import com.mainproject.backend.domain.users.dto.UserDto;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.mapper.UserMapper;
import com.mainproject.backend.domain.users.repository.UserRepository;
import com.mainproject.backend.domain.users.service.UserService;
import com.mainproject.backend.global.Response.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * 유저 컨트롤러
 *
 * @author 박민우
 * 북마크 조회 기능 추가
 *
 */

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;

    //회원 가입
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserDto.Response> postMember(@Valid @RequestBody UserDto.post requestBody){
//        User user = mapper.userPostToUser(requestBody);
        User createUser = userService.createUser(requestBody);

        return ApiResponse.success("user", mapper.userToUserResponse(createUser));
    }



    //마이 페이지 조회
    @GetMapping("/mypage")
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        //User user = getPrincipal();
        User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", mapper.userToUserResponse(user));
    }

    //마이 페이지 수정
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/mypage")
    public ApiResponse<UserDto.Response> editMemberInfo(@RequestBody UserDto.Patch req) {
        User user = getPrincipal();
        User editUser = userService.editMemberInfo(user, req);
        editUser.setPassword(passwordEncoder.encode(req.getPassword()));
        return ApiResponse.success("user", mapper.userToUserResponse(editUser));
    }

    //회원 탈퇴
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping()
    public ApiResponse deleteMemberInfo() {
        User user = getPrincipal();
        userService.deleteMemberInfo(user);
        return ApiResponse.success("회원 탈퇴 성공",null);
    }

    //북마크 한 글 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/bookmark")
    public ApiResponse findBookmark() {
        User user = getPrincipal();
        return ApiResponse.success("bookmark",userService.findBookmark(user));
    }

    //작성자가 쓴 글 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/write")
    public ApiResponse findWrite() {
        User user = getPrincipal();
        return ApiResponse.success("bookmark",userService.findWrite(user));
    }

    //작성자가 쓴 글 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/comment")
    public ApiResponse findComment() {
        User user = getPrincipal();
        return ApiResponse.success("comment",userService.findComment(user));
    }
    //작성자가 쓴 댓글 조회
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