package com.mainproject.backend.domain.reply.controller;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.service.BoardService;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.reply.dto.CommentReplyDto;
import com.mainproject.backend.domain.reply.entity.Reply;
import com.mainproject.backend.domain.reply.mapper.ReplyMapper;
import com.mainproject.backend.domain.reply.repository.ReplyRepository;
import com.mainproject.backend.domain.reply.service.ReplyService;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.repository.UserRepository;
import com.mainproject.backend.global.Response.api.ApiResponse;
import com.mainproject.backend.global.exception.CommentNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reply")
public class ReplyController {

    private final ReplyService replyService;
    private final ReplyRepository replyRepository;
    private final ReplyMapper replyMapper;
    private final UserRepository userRepository;
    private final BoardService boardService;


    //대댓글
    @PostMapping("/{board-seq}/{comment-seq}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse ReplyComment(@PathVariable("comment-seq") @Positive Long commentSeq,
                                    @PathVariable("board-seq") long boardSeq,
                                    @Valid @RequestBody CommentReplyDto.ReplyPost requestBody) {

        User user = getPrincipal();
        Comment currentComment = new Comment();
        currentComment.setCommentSeq(commentSeq);
        Reply createReply = new Reply();
        Board currentBoard = boardService.findVerifiedBoard(boardSeq);
        currentBoard.increaseCommentCount();
        replyService.createReply(createReply, currentComment, user, requestBody);


        return ApiResponse.success("Reply", replyMapper.replyToReplyResponse(createReply));
    }

    @PatchMapping("/{reply-seq}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse PatchReply(@PathVariable("reply-seq") @Positive long replySeq,
                                  @Valid @RequestBody CommentReplyDto.ReplyPatchDto requestBody) {


        User user = getPrincipal();
        Reply currentReply = replyRepository.findById(replySeq).orElseThrow(CommentNotFoundException::new);
        Reply EditReply = replyService.editReply(currentReply, user, requestBody);
        return ApiResponse.success("Reply", replyMapper.replyToReplyResponse(EditReply));
    }


    //대댓글 삭제
    @DeleteMapping("/{board-seq}/{reply-seq}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ApiResponse DeleteReply(@PathVariable("board-seq") long boardSeq,
                                   @PathVariable("reply-seq") long replySeq) {

        Reply currentReply = replyRepository.findById(replySeq).orElseThrow(CommentNotFoundException::new);
        Board currentBoard = boardService.findVerifiedBoard(boardSeq);
        currentBoard.decreaseCommentCount();
        replyService.deleteReply(currentReply.getReplySeq(), getPrincipal().getUserSeq());


        return ApiResponse.success("삭제되었습니다.", null);
    }

    //추천
    @PostMapping("/like/{reply-seq}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse likeReply(@PathVariable("reply-seq") @Positive Long replySeq) {
        User user = getPrincipal();
        Reply currentReply = new Reply();
        currentReply.setReplySeq(replySeq);
        //추천 중복 처리
        if(replyService.hasLikeReply(currentReply, user)){
            return ApiResponse.fail();
        }
        return ApiResponse.success("boardLike", replyService.updateLikeOfReply(replySeq, user));
    }


    //비추천
    @PostMapping("/dislike/{reply-seq}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse dislikeComment(@PathVariable("reply-seq") @Positive Long replySeq) {
        User user = getPrincipal();
        Reply currentReply = new Reply();
        currentReply.setReplySeq(replySeq);
        if(replyService.hasDislikeReply(currentReply, user)){
            return ApiResponse.fail();
        }
        return ApiResponse.success("boardDislike", replyService.updateDislikeOfReply(replySeq, user));
    }



    //인증
    private User getPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserId(authentication.getName());
        return user;
    }
}
