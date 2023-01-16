package com.mainproject.backend.domain.users.controller;

import com.mainproject.backend.domain.users.dto.UserDto;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.mapper.UserMapper;
import com.mainproject.backend.domain.users.service.UserService;
import com.mainproject.backend.global.Response.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserDto.Response> postMember(@Valid @RequestBody UserDto.post requestBody){
        User user = mapper.userPostToUser(requestBody);
        User createUser = userService.createUser(requestBody);

        return ApiResponse.success("user", mapper.userToUserResponse(createUser));
    }



    @GetMapping
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", user);
    }
}