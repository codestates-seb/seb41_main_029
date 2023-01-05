package com.mainproject.backend.domain.comment.controller;

import com.mainproject.backend.domain.comment.dto.CommentDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
public class CommentController {

    //답변 등록
    @PostMapping
    public ResponseEntity postComment(@RequestBody CommentDto.commentPostDto commentPostDto){
        return new ResponseEntity<>(commentPostDto, HttpStatus.CREATED);
    }

    //답변 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") long commentId,
                                           @RequestBody CommentDto.commentPatchDto commentPatchDto){
        return new ResponseEntity<>(commentPatchDto, HttpStatus.OK);
    }

    //답변 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId){
        return null;
    }

}
