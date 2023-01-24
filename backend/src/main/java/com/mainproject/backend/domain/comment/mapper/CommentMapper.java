package com.mainproject.backend.domain.comment.mapper;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.dto.CommentDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment commentPostDtoToComment(CommentDto.CommentPostDto commentPostDto){
        Comment comment = new Comment();

        comment.setContent(commentPostDto.getContent());

        return comment;

    }
    default  Comment commentPatchDtoToComment(CommentDto.CommentPatchDto commentPatchDto){
        Comment comment = new Comment();

        comment.setContent(commentPatchDto.getContent());

        return comment;
    }
    default  CommentDto.Response commentToCommentResponseDto(Comment comment){
        CommentDto.Response commentResponseDto = new CommentDto.Response();

        commentResponseDto.setCommentSeq(comment.getCommentSeq());
        commentResponseDto.setUserSeq(comment.getUser().getUserSeq());
        commentResponseDto.setBoard(comment.getBoard());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setLiked(comment.getLiked());
        commentResponseDto.setDisliked(comment.getDisliked());

        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setModifiedAt(comment.getModifiedAt());

        return commentResponseDto;
    }
}
