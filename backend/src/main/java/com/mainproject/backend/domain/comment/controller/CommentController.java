package com.mainproject.backend.domain.comment.controller;

import com.mainproject.backend.domain.comment.dto.CommentDto;
import com.mainproject.backend.domain.comment.dto.CommentResponseDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.mapper.CommentMapper;
import com.mainproject.backend.domain.comment.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping("comments")
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    //답변 등록
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.CommentPostDto commentPostDto){

        Comment comment = commentService.createComment(commentMapper.commentPostDtoToComment(commentPostDto));

        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
    }

    //답변 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") Long commentId,
                                          @Valid @RequestBody CommentDto.CommentPatchDto commentPatchDto){

        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        comment = commentService.updateComment(comment);

//        Comment comment = commentService.updateComment(commentMapper.commentPatchDtoToComment(commentPatchDto));
        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(comment), HttpStatus.OK);
    }

    //답변조회
//    @GetMapping("/{comment-id}")
//    public ResponseEntity getComment(@PathVariable("comment-id")long commentId){
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    //답변 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId){

        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //답변 좋아요
//    public ResponseEntity likeComment()
}
