package com.mainproject.backend.domain.board.service;

import com.mainproject.backend.domain.board.dto.BoardDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.Board_Vote;
import com.mainproject.backend.domain.board.repositoty.BoardRepository;
import com.mainproject.backend.domain.board.repositoty.BoardVoteRepository;
import com.mainproject.backend.global.exception.BusinessLogicException;
import com.mainproject.backend.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardVoteRepository boardVoteRepository;
    //유저 서비스

    //게시글 등록
    public Board createBoard(Board board) {
        board.setVoteResult(0L);
        return boardRepository.save(board);
    }

    //게시글 수정
    public Board updateBoard(Board board) {
        Board findBoard = findVerifiedBoard(board.getBoardSeq());
        //로그인한 유저 정보가 등록한 유저정보와 같은지 확인 후 같지 않으면 에러 메세지 호출

        Optional.ofNullable(board.getCategory())
                .ifPresent(findBoard::setCategory);
        Optional.ofNullable(board.getTitle())
                .ifPresent(findBoard::setTitle);
        Optional.ofNullable(board.getContent())
                .ifPresent(findBoard::setContent);

        Board updateBoard = boardRepository.save(findBoard);

        return updateBoard;
    }

    //특정 게시글 보기 & 조회수
    public Board findBoardAndPlusViewCount(Long seq) {
        Board findBoard = findVerifiedBoard(seq);
        findBoard.plusViewCount();

        return findBoard;
    }

    public Page<Board> getBoard(int page, int size) {
        return boardRepository.findAll(PageRequest.of(page, size, Sort.by("boardSeq").descending()));
    }
    //검색 조건에 따른 게시글 리스트 조회 + 페이징

    //게시글 찾기
    public Board findVerifiedBoard(Long boardSeq) {
        Optional<Board> optionalBoard = boardRepository.findById(boardSeq);
        Board findBoard = optionalBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }

    //게시글 삭제
    public void deleteBoard(Long boardSeq) {
        Board findBoard = findVerifiedBoard(boardSeq);
        boardRepository.delete(findBoard);
    }
}
