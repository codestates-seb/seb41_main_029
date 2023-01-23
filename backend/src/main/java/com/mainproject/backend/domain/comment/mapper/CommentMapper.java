package com.mainproject.backend.domain.comment.mapper;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.dto.CommentDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.users.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment commentPostDtoToComment(CommentDto.CommentPostDto commentPostDto){
        User user = new User();
        Comment comment = new Comment();
        Board board = new Board();
<<<<<<< HEAD

        user.setUserSeq(commentPostDto.getUserSeq());
        board.setBoardSeq(commentPostDto.getBoardSeq());
=======
>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4

        comment.setUser(user);
        comment.setBoard(board);
        comment.setContent(commentPostDto.getContent());

        return comment;

    }
    default  Comment commentPatchDtoToComment(CommentDto.CommentPatchDto commentPatchDto){
        Comment comment = new Comment();
        Board board = new Board();
        board.setBoardSeq(comment.getBoard().getBoardSeq());

        comment.setBoard(board);
        comment.setContent(commentPatchDto.getContent());

        return comment;
    }
    default  CommentDto.Response commentToCommentResponseDto(Comment comment){
        CommentDto.Response commentResponseDto = new CommentDto.Response();

        commentResponseDto.setCommentSeq(comment.getCommentSeq());
<<<<<<< HEAD
        commentResponseDto.setUser(comment.getUser());
=======
        commentResponseDto.setUserSeq(comment.getUser().getUserSeq());
>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4
        commentResponseDto.setBoard(comment.getBoard());
        commentResponseDto.setContent(comment.getContent());

        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setModifiedAt(comment.getModifiedAt());

        return commentResponseDto;
    }
}
