package com.mainproject.backend.domain.gallery.service;

import com.mainproject.backend.domain.gallery.entity.Gallery;
import com.mainproject.backend.domain.gallery.entity.LikeGallery;
import com.mainproject.backend.domain.gallery.repository.GalleryRepository;
import com.mainproject.backend.domain.gallery.repository.LikeGalleryRepository;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GalleryService {
    private final GalleryRepository galleryRepository;
    private final LikeGalleryRepository likeGalleryRepository;
    private final UserRepository userRepository;
    private final static String SUCCESS_LIKE_GALLERY = "추천 처리 완료";
    private final static String FAIL_LIKE_GALLERY = "이미 추천을 누르셨습니다.";

    //갤러리 등록
    public Gallery createGallery(Gallery gallery, User user){
        gallery.setUser(user);
        user.increaseManyManyPoint();

        return galleryRepository.save(gallery);
    }
    @Transactional
    public void deleteGallery(Gallery gallery) {
        galleryRepository.delete(gallery);
    }

    //추천 기능
    public String createLikeGallery(Gallery gallery, User user) {
        LikeGallery likeBoard = new LikeGallery(gallery, user); // true 처리
        likeGalleryRepository.save(likeBoard);
        return SUCCESS_LIKE_GALLERY;
    }

    //추천
    @Transactional
    public String updateLikeOfGallery(Long gallerySeq, User user) {
        Gallery gallery = galleryRepository.findById(gallerySeq).orElseThrow();
        gallery.setGallerySeq(gallerySeq);
        if (!hasLikeGallery(gallery, user)) {
            //포인트로직
            gallery.increaseLikeCount();
            gallery.setUser(gallery.getUser());
            gallery.getUser().increaseManyPoint();

            return createLikeGallery(gallery, user);
        }else return FAIL_LIKE_GALLERY;
    }

    public boolean hasLikeGallery(Gallery gallery, User user){
        return likeGalleryRepository.findByGalleryAndUser(gallery, user).isPresent();
    }

    private User getPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserId(authentication.getName());
        return user;
    }
}
