package com.mainproject.backend.domain.comment.controller;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.repositoty.BoardRepository;
import com.mainproject.backend.domain.comment.dto.CommentDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.mapper.CommentMapper;
import com.mainproject.backend.domain.comment.service.CommentService;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;



    //답변 등록
    @PostMapping("/{board-seq}")
    public ResponseEntity postComment(@PathVariable("board-seq") @Positive long boardSeq,
                                      @Valid @RequestBody CommentDto.CommentPostDto commentPostDto){
        User user = getPrincipal();
        Board currentBoard = new Board();
        currentBoard.setBoardSeq(boardSeq);

        Comment comment = commentService.createComment(commentMapper.commentPostDtoToComment(commentPostDto), user, currentBoard);

        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
    }

    //답변 수정
    @PatchMapping("/{board-seq}/{comment-seq}")
    public ResponseEntity patchComment(@PathVariable("board-seq") Long boardSeq,
                                       @PathVariable("comment-seq") Long commentSeq,
                                       @Valid @RequestBody CommentDto.CommentPatchDto commentPatchDto){

        User user = getPrincipal();
        Board currentBoard = new Board();
        currentBoard.setBoardSeq(boardSeq);
        Comment currentComment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        currentComment.setCommentSeq(commentSeq);
        currentComment.setBoard(currentBoard);
        currentComment.setUser(user);
        currentComment = commentService.updateComment(currentComment);

//        Comment comment = commentService.updateComment(commentMapper.commentPatchDtoToComment(commentPatchDto));
        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(currentComment), HttpStatus.OK);
    }

    //답변조회
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id")long commentId){

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //답변 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId){

        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    //인증
    private User getPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserId(authentication.getName());
        return user;

        //답변 좋아요
//    public ResponseEntity likeComment()
    }
}
