package com.mainproject.backend.domain.gallery.dto;

import com.mainproject.backend.domain.gallery.entity.Gallery;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GallerySimpleDto {
    private Long gallerySeq;
    private String username;
    private int liked;
    private String content;
    private LocalDateTime createdAt;

    public GallerySimpleDto toDto(Gallery gallery) {
        return new GallerySimpleDto(
                gallery.getGallerySeq(),
                gallery.getUser().getUsername(),
                gallery.getLiked(),
                gallery.getContent(),
                gallery.getCreatedAt());
    }
}
