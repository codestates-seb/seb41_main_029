package com.mainproject.backend.domain.reply.controller;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.service.BoardService;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.reply.dto.CommentReplyDto;
import com.mainproject.backend.domain.reply.entity.Reply;
import com.mainproject.backend.domain.reply.mapper.ReplyMapper;
import com.mainproject.backend.domain.reply.service.ReplyService;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.repository.UserRepository;
import com.mainproject.backend.global.Response.api.ApiResponse;
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
//        Board currentBoard = new Board();
//        currentBoard.setBoardSeq(currentComment.getBoard().getBoardSeq());
        replyService.createReply(createReply, currentComment, user, requestBody);
//        currentBoard.increaseCommentCount();

        return ApiResponse.success("Reply", replyMapper.replyToReplyResponse(createReply));
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
