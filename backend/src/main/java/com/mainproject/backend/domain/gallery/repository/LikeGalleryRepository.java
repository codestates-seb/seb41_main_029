package com.mainproject.backend.domain.gallery.repository;

import com.mainproject.backend.domain.gallery.entity.Gallery;
import com.mainproject.backend.domain.gallery.entity.LikeGallery;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeGalleryRepository extends JpaRepository<LikeGallery, Long> {

    Optional<LikeGallery> findByGalleryAndUser(Gallery gallery, User user);
}
