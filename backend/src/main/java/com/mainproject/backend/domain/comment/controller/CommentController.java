package com.mainproject.backend.domain.comment.controller;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.repositoty.BoardRepository;
import com.mainproject.backend.domain.comment.dto.CommentDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.mapper.CommentMapper;
import com.mainproject.backend.domain.comment.service.CommentService;
import com.mainproject.backend.domain.users.entity.User;
<<<<<<< HEAD
import com.mainproject.backend.domain.users.service.UserService;
=======
import com.mainproject.backend.domain.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4
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
<<<<<<< HEAD
    private final UserService userService;

    public CommentController(CommentService commentService, CommentMapper commentMapper, UserService userService) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
        this.userService = userService;
    }
=======
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;


>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4

    //답변 등록
    @PostMapping("/{board-seq}")
    public ResponseEntity postComment(@PathVariable("board-seq") @Positive long boardSeq,
                                      @Valid @RequestBody CommentDto.CommentPostDto commentPostDto){
        User user = getPrincipal();
        Board currentBoard = new Board();
        currentBoard.setBoardSeq(boardSeq);

<<<<<<< HEAD
        commentPostDto.setUserSeq(userService.getLoginUser().getUserSeq());      //로그인 유저 가져오기

        Comment comment = commentService.createComment(commentMapper.commentPostDtoToComment(commentPostDto));
=======
        Comment comment = commentService.createComment(commentMapper.commentPostDtoToComment(commentPostDto), user, currentBoard);
>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4

        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
    }

    //답변 수정
<<<<<<< HEAD
    @PatchMapping("/{comment-seq}")
    public ResponseEntity patchComment(@PathVariable("comment-seq") long commentSeq,
                                          @Valid @RequestBody CommentDto.CommentPatchDto commentPatchDto){

        commentPatchDto.setCommentSeq(commentSeq);
        commentPatchDto.setUserSeq(userService.getLoginUser().getUserSeq());
=======
    @PatchMapping("/{board-seq}/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("board-seq") Long boardSeq,
                                       @PathVariable("comment-seq") Long commentSeq,
                                       @Valid @RequestBody CommentDto.CommentPatchDto commentPatchDto){

        User user = getPrincipal();
        Board currentBoard = new Board();
        currentBoard.setBoardSeq(boardSeq);
>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4
        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        comment.setUser(new User());
        comment.getUser().setUserSeq(commentPatchDto.getUserSeq());

        Comment response = commentService.updateComment(comment);
        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(response), HttpStatus.OK);
    }

    //답변조회
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id")long commentId){

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //답변 삭제
    @DeleteMapping("/{comment-seq}")
    public ResponseEntity deleteComment(@PathVariable("comment-seq") long commentSeq){

        commentService.deleteComment(commentSeq);

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
