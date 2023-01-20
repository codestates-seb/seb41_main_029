package com.mainproject.backend.domain.comment.controller;

import com.mainproject.backend.domain.comment.dto.CommentDto;
import com.mainproject.backend.domain.comment.dto.CommentResponseDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.mapper.CommentMapper;
import com.mainproject.backend.domain.comment.service.CommentService;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.service.UserService;
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
    private final UserService userService;

    public CommentController(CommentService commentService, CommentMapper commentMapper, UserService userService) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
        this.userService = userService;
    }

    //답변 등록
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.CommentPostDto commentPostDto){

        commentPostDto.setUserSeq(userService.getLoginUser().getUserSeq());      //로그인 유저 가져오기

        Comment comment = commentService.createComment(commentMapper.commentPostDtoToComment(commentPostDto));

        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
    }

    //답변 수정
    @PatchMapping("/{comment-seq}")
    public ResponseEntity patchComment(@PathVariable("comment-seq") long commentSeq,
                                          @Valid @RequestBody CommentDto.CommentPatchDto commentPatchDto){

        commentPatchDto.setCommentSeq(commentSeq);
        commentPatchDto.setUserSeq(userService.getLoginUser().getUserSeq());
        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        comment.setUser(new User());
        comment.getUser().setUserSeq(commentPatchDto.getUserSeq());

        Comment response = commentService.updateComment(comment);
        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(response), HttpStatus.OK);
    }

    //답변조회
//    @GetMapping("/{comment-id}")
//    public ResponseEntity getComment(@PathVariable("comment-id")long commentId){
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    //답변 삭제
    @DeleteMapping("/{comment-seq}")
    public ResponseEntity deleteComment(@PathVariable("comment-seq") long commentSeq){

        commentService.deleteComment(commentSeq);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //답변 좋아요
//    public ResponseEntity likeComment()
}
