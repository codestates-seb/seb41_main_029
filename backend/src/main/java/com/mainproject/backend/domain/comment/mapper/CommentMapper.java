package com.mainproject.backend.domain.comment.mapper;

import com.mainproject.backend.domain.comment.dto.CommentDto;
import com.mainproject.backend.domain.comment.dto.CommentResponseDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.CommentPostDto commentPostDto);
    Comment commentPatchDtoToComment(CommentDto.CommentPatchDto commentPatchDto);
    CommentResponseDto commentToCommentResponseDto(Comment comment);
}
