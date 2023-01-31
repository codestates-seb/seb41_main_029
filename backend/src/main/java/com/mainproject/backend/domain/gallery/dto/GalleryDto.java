package com.mainproject.backend.domain.gallery.dto;

import com.mainproject.backend.domain.gallery.entity.Gallery;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class GalleryDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class post{

        @NotBlank
        private String title;
        @NotBlank
        private String imageUrl;
        @NotBlank
        private String tag;
        @NotBlank
        private String content;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class response{


        private Long gallerySeq;
        private String title;
        private String username;
        private String content;
        private String imageUrl;
        private String tag;
        private int liked;
        private int point;

        public response(Gallery gallery){
            this.gallerySeq = gallery.getGallerySeq();
            this.title = gallery.getTitle();
            this.username = gallery.getUser().getUsername();
            this.content = gallery.getContent();
            this.imageUrl = gallery.getImageUrl();
            this.tag = gallery.getTag();
            this.liked = gallery.getLiked();
            this.point = gallery.getUser().getPoint();

        }
    }
}
