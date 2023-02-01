package com.mainproject.backend.domain.gallery.controller;

import com.mainproject.backend.domain.gallery.dto.GalleryDto;
import com.mainproject.backend.domain.gallery.entity.Gallery;
import com.mainproject.backend.domain.gallery.mapper.GalleryMapper;
import com.mainproject.backend.domain.gallery.service.GalleryService;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.repository.UserRepository;
import com.mainproject.backend.global.Response.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RequestMapping("/gallery")
@RequiredArgsConstructor
@RestController
@Validated
public class GalleryController {
    private final UserRepository userRepository;
    private final GalleryService galleryService;
    private final GalleryMapper galleryMapper;

    @PostMapping("/post")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse GalleryPost(@Valid @RequestBody GalleryDto.post postDto){
        User user = getPrincipal();

        Gallery gallery = galleryService.createGallery(galleryMapper.galleryToGalleryPostDto(postDto), user);

        return ApiResponse.success("갤러리 포스트 성공", galleryMapper.galleryToGalleryResponseDto(gallery));
    }

    @DeleteMapping("/delete/{gallery-seq}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ApiResponse GalleryDelete(@PathVariable("gallery-seq") @Positive Long gallerySeq){
        Gallery currentGallery = new Gallery();
        currentGallery.setGallerySeq(gallerySeq);

        galleryService.deleteGallery(currentGallery);

        return ApiResponse.success("갤러리 삭제 완료", HttpStatus.NO_CONTENT);
    }

    //추천
    @PostMapping("/like/{gallery-seq}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse likeGallery(@PathVariable("gallery-seq") @Positive Long gallerySeq) {
        User user = getPrincipal();
        //추천 중복 처리
        Gallery currentGallery = new Gallery();
        currentGallery.setGallerySeq(gallerySeq);
        if(galleryService.hasLikeGallery(currentGallery, user)){
            return ApiResponse.fail();
        }
        return ApiResponse.success("갤러리 추천", galleryService.updateLikeOfGallery(gallerySeq, user));
    }

    //인증
    private User getPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserId(authentication.getName());
        return user;
    }
}
