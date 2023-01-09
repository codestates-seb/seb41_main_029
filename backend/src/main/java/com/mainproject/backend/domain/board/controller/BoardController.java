package com.mainproject.backend.domain.board.controller;

import com.mainproject.backend.domain.board.dto.BoardDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.mapper.BoardMapper;
import com.mainproject.backend.domain.board.service.BoardService;
import com.mainproject.backend.global.ResponseDTO.MultiResponseDto;
import com.mainproject.backend.global.ResponseDTO.SingleResponseDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    //게시글 등록
    @PostMapping("/articles")
    public ResponseEntity boardPost(@Valid @RequestBody BoardDto.Post postDto) {

        Board board =
                boardService.createBoard(boardMapper.boardPostDtoToBoard(postDto));

        return new ResponseEntity<>(boardMapper.boardToBoardResponseDto(board), HttpStatus.CREATED);
    }
    //게시글 수정
    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@PathVariable("board-id") Long boardId,
                                     @Valid @RequestBody BoardDto.Patch patchDto) {
        patchDto.setBoardId(boardId);
        Board board = boardService.updateBoard(boardMapper.boardPatchDtoToBoard(patchDto));
        return new ResponseEntity<>(boardMapper.boardToBoardResponseDto(board), HttpStatus.OK);
    }
    //게시글 가져오기
    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") Long boardId) {
        Board findBoard = boardService.findBoardAndPlusViewCount(boardId);

        return new ResponseEntity<>(boardMapper.boardToBoardResponseDto(findBoard), HttpStatus.OK);
    }
//    //추천수
//    @PatchMapping("/votes/{board-id}")
//    public ResponseEntity voteBoard(@PathVariable("board-id") Long boardId,
//                                    @RequestParam boolean voteUp) {
//        Board board = boardService.voteBoard(boardId, voteUp);
//
//        return new ResponseEntity<>(boardMapper.boardToBoardResponseDto(board),
//        HttpStatus.OK);
//    }
//    @GetMapping
//    public ResponseEntity getBoards(@RequestParam("page") @Positive int page,
//                                    @RequestParam("size") @Positive int size) {
//        Page<Board> board = boardService.getBoard(page -1, size);
//
//        List<Board> content = board.getContent();
//        return new ResponseEntity(new MultiResponseDto<>(boardMapper.boardsToBoardResponsesDto(content), board),
//                HttpStatus.OK);
//
//    }
//    @GetMapping("/list/boards")
//    public ResponseEntity<List<BoardDto.response>> findBoardNoPage(){
//        return ResponseEntity.ok(boardService.getBoard());
//    }

    //게시글 삭제
    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive Long boardId){
        boardService.deleteBoard(boardId);

        return new ResponseEntity<>("게시글 삭제",HttpStatus.NO_CONTENT);
    }
}
