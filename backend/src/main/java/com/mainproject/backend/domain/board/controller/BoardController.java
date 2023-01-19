package com.mainproject.backend.domain.board.controller;

import com.mainproject.backend.domain.board.dto.BoardDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.mapper.BoardMapper;
import com.mainproject.backend.domain.board.service.BoardService;

import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.mapper.UserMapper;
import com.mainproject.backend.domain.users.service.UserService;
import com.mainproject.backend.global.Response.MultiResponseDto;
import com.mainproject.backend.global.Response.SingleResponseDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequestMapping("/boards")
@RequiredArgsConstructor
@RestController
@Validated
public class BoardController {

    private final BoardService boardService;

    private final BoardMapper boardMapper;

    private final UserService userService;

    private final UserMapper userMapper;

    //게시글 등록
    @PostMapping("/articles")
    public ResponseEntity boardPost(@Valid @RequestBody BoardDto.Post postDto) {

        Board board = boardService.createBoard(
                boardMapper.boardPostDtoToBoard(postDto, userService));

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardMapper.boardToBoardResponseDto(userMapper, board)),
                HttpStatus.CREATED);
    }


    //게시글 수정
    @PatchMapping("/{board-seq}")
    public ResponseEntity patchBoard(@PathVariable("board-seq") @Positive long boardSeq,
                                     @Valid @RequestBody BoardDto.Patch patchDto) {
        patchDto.setBoardSeq(boardSeq);
        Board board = boardMapper.boardPatchDtoToBoard(boardService, patchDto, userService);

        Board updateBoard = boardService.updateBoard(board);

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardMapper.boardToBoardResponseDto(userMapper, updateBoard)),
                HttpStatus.OK);
    }


    //게시글 가져오기
    @GetMapping("/{board-seq}")
    public ResponseEntity getBoard(@PathVariable("board-seq") Long boardSeq) {
        Board findBoard = boardService.findBoardAndPlusViewCount(boardSeq);

        return new ResponseEntity<>(boardMapper.boardToBoardWithCommentResponseDto(findBoard), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getBoards(@RequestParam("page") @Positive int page,
                                    @RequestParam("size") @Positive int size) {

        List<Board> board = boardService.findAllBoard(page, size).getContent();
        return new ResponseEntity<>(boardMapper.boardsToBoardResponsesDto(board), HttpStatus.OK);

    }

    //검색 게시물 조회
    @GetMapping("/search")
    public ResponseEntity findAllBySearch(@RequestParam("keyword") String keyword,
                                          @RequestParam("page") @Positive int page,
                                          @RequestParam("size") @Positive int size) {

        List<Board> boards = boardService.findAllBySearch(keyword, page, size).getContent();

        return new ResponseEntity<>(boardMapper.boardsToBoardResponsesDto(boards), HttpStatus.OK);
    }

    //게시글 삭제
    @DeleteMapping("/{board-seq}")
    public ResponseEntity deleteBoard(@PathVariable("board-seq") @Positive Long boardSeq){

        User user = userService.getLoginUser();
        boardService.deleteBoard(boardSeq, user.getUserSeq());

        return new ResponseEntity<>("게시글 삭제",HttpStatus.NO_CONTENT);
    }
}
