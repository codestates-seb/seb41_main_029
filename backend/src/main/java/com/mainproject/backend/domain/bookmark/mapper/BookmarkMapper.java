package com.mainproject.backend.domain.bookmark.mapper;

import com.mainproject.backend.domain.bookmark.dto.BookmarkDto;
import com.mainproject.backend.domain.bookmark.entity.Bookmark;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookmarkMapper {

    BookmarkDto.response bookmarkToResponseDto(Bookmark bookmark);
}
