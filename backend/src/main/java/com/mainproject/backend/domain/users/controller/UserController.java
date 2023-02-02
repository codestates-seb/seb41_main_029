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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final UserMapper mapper;

    //회원 가입
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserDto.Response> postMember(@Valid @RequestBody UserDto.post requestBody){
        User createUser = userService.createUser(requestBody);
        return ApiResponse.success("user", mapper.userToUserResponse(createUser));
    }

    // 게스트 로그인
    @PostMapping("/guest")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserDto.Response> postGuest(@Valid @RequestBody UserDto.post requestBody){
        User createUser = userService.createGuestUser(requestBody);
        return ApiResponse.success("guest", mapper.userToUserResponse(createUser));
    }



    //마이 페이지 조회
    @GetMapping("/mypage")
    public ApiResponse getUser() {
        User user = getPrincipal();
        return ApiResponse.success("user", mapper.userToUserResponse(user));
    }
    //마이 페이지 수정
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/mypage")
    public ApiResponse<UserDto.Response> editMemberInfo(@RequestBody UserDto.Patch req) {
        User user = getPrincipal();
        User editUser = userService.editMemberInfo(user, req);
        return ApiResponse.success("user", mapper.userToUserResponse(editUser));
    }

//    //마이 페이지 수정
//    @ResponseStatus(HttpStatus.OK)
//    @PatchMapping("/mypage")
//    public ApiResponse<UserDto.Response> editMemberInfo(@RequestParam("files") MultipartFile files, UserDto.Patch req) throws IOException {
//        User user = getPrincipal();
//        User editUser = userService.editMemberInfo(user, req, files);
//        return ApiResponse.success("user", mapper.userToUserResponse(editUser));
//    }

    //회원 탈퇴
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping()
    public ApiResponse deleteMemberInfo() {
        User user = getPrincipal();
        userService.deleteMemberInfo(user);
        return ApiResponse.success("회원 탈퇴 성공 여부","성공");
    }

    //북마크 한 글 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/bookmark")
    public ApiResponse findBookmark() {
        User user = getPrincipal();
        return ApiResponse.success("bookmark", userService.findBookmark(user));
    }

    //작성자가 쓴 글 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/write")
    public ApiResponse findWrite() {
        User user = getPrincipal();
        return ApiResponse.success("write", userService.findWrite(user));
    }

    //작성자가 쓴 댓글 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/comment")
    public ApiResponse findComment() {
        User user = getPrincipal();
        return ApiResponse.success("comment",userService.findComment(user));
    }

    //작성자가 쓴 갤러리 조회findGallery
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/gallery")
    public ApiResponse findGallery() {
        User user = getPrincipal();
        return ApiResponse.success("comment",userService.findGallery(user));
    }

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