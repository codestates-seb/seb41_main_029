package com.mainproject.backend.domain.gallery.mapper;

import com.mainproject.backend.domain.board.dto.BoardDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.gallery.dto.GalleryDto;
import com.mainproject.backend.domain.gallery.entity.Gallery;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import javax.validation.constraints.NotBlank;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GalleryMapper {

    default Gallery galleryToGalleryPostDto(GalleryDto.post postDto){
        Gallery gallery = new Gallery();
        gallery.setTitle(postDto.getTitle());
        gallery.setContent(postDto.getTitle());
        gallery.setTag(postDto.getTag());
        gallery.setImageUrl(postDto.getImageUrl());


        return gallery;
    }
    default GalleryDto.response galleryToGalleryResponseDto(Gallery gallery) {
        GalleryDto.response response = new GalleryDto.response(gallery);

        return response;
    }
}
