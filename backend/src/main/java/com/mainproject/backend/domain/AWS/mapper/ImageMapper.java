package com.mainproject.backend.domain.AWS.mapper;

import com.mainproject.backend.domain.AWS.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageMapper {

    default Image boardPostDtoToBoard(Image image) {
        return image;
    }
}