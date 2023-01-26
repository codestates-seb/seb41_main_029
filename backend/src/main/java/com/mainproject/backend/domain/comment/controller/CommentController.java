package com.mainproject.backend.domain.comment.controller;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.dto.CommentDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.mapper.CommentMapper;
import com.mainproject.backend.domain.comment.service.CommentService;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.repository.UserRepository;
import com.mainproject.backend.global.Response.api.ApiResponse;
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



    //답변 등록
    @PostMapping("/{board-seq}")
    public ResponseEntity postComment(@PathVariable("board-seq") @Positive long boardSeq,
                                      @Valid @RequestBody CommentDto.CommentPostDto commentPostDto){
        User user = getPrincipal();
        Board currentBoard = new Board();
        currentBoard.setBoardSeq(boardSeq);
        user.increaseManyPoint(); // 포인트로직 +5


        Comment comment = commentService.createComment(commentMapper.commentPostDtoToComment(commentPostDto), user, currentBoard);

        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(comment), HttpStatus.CREATED);
    }

    //답변 수정
    @PatchMapping("/{board-seq}/{comment-seq}")
    public ResponseEntity patchComment(@PathVariable("board-seq") long boardSeq,
                                       @PathVariable("comment-seq") long commentSeq,
                                       @Valid @RequestBody CommentDto.CommentPatchDto commentPatchDto){

        Board currentBoard = new Board();
        currentBoard.setBoardSeq(boardSeq);
        Comment currentComment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        currentComment.setCommentSeq(commentSeq);
        currentComment.setBoard(currentBoard);
        currentComment = commentService.updateComment(currentComment);

        return new ResponseEntity<>(commentMapper.commentToCommentResponseDto(currentComment), HttpStatus.OK);
    }


    //답변 삭제
    @DeleteMapping("/{board-seq}/{comment-seq}")
    public ResponseEntity deleteComment(@PathVariable("board-seq") long boardSeq,
                                        @PathVariable("comment-seq") long commentSeq){

        Board currentBoard = new Board();
        currentBoard.setBoardSeq(boardSeq);
        commentService.deleteComment(commentSeq);
        currentBoard.decreaseCommentCount();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //추천
    @PostMapping("/like/{comment-seq}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse likeComment(@PathVariable("comment-seq") @Positive Long commentSeq) {
        User user = getPrincipal();
        Comment currentComment = new Comment();
        currentComment.setCommentSeq(commentSeq);
        //추천 중복 처리
        if(commentService.hasLikeComment(currentComment, user)){
            return ApiResponse.fail();
        }
//        User WriterUser = userRepository.findUserByUserId(currentComment.getUser());
//        WriterUser.increasePoint();
        return ApiResponse.success("boardLike", commentService.updateLikeOfComment(commentSeq, user));
    }


    //비추천
    @PostMapping("/dislike/{comment-seq}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse dislikeComment(@PathVariable("comment-seq") @Positive Long commentSeq) {
        User user = getPrincipal();
        Comment currentComment = new Comment();
        currentComment.setCommentSeq(commentSeq);
        if(commentService.hasDislikeComment(currentComment, user)){
            return ApiResponse.fail();
        }

        return ApiResponse.success("boardDislike", commentService.updateDislikeOfComment(commentSeq, user));
    }

    //인증
    private User getPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserId(authentication.getName());
        return user;
    }
}
