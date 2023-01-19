package com.mainproject.backend.domain.board.service;

import com.mainproject.backend.domain.board.dto.BoardDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.Board_Vote;
import com.mainproject.backend.domain.board.repositoty.BoardRepository;
import com.mainproject.backend.domain.board.repositoty.BoardVoteRepository;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.service.UserService;
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

    private final UserService userService;
    //유저 서비스

    //게시글 등록
    public Board createBoard(Board board) {
        board.setVoteResult(0L);
        return boardRepository.save(board);
    }

    //게시글 수정
    public Board updateBoard(Board board) {

        Board findBoard = findVerifiedBoard(board.getBoardSeq());

        Optional.ofNullable(board.getCategory())
                .ifPresent(findBoard::setCategory);
        Optional.ofNullable(board.getTitle())
                .ifPresent(findBoard::setTitle);
        Optional.ofNullable(board.getContent())
                .ifPresent(findBoard::setContent);

        Board updatedBoard = boardRepository.save(findBoard);
        return updatedBoard;
    }

    //특정 게시글 보기 & 조회수
    public Board findBoardAndPlusViewCount(Long boardSeq) {
        Board findBoard = findVerifiedBoard(boardSeq);
        findBoard.plusViewCount();

        return findBoard;
    }

    public Page<Board> findAllBoard(int page, int size) {

        Page<Board> findAllBoards = boardRepository.findAllByBoardStatus(
                PageRequest.of(page -1, size, Sort.by("boardSeq").descending()),
                Board.BoardStatus.BOARD_EXIST);

        return findAllBoards;
    }

    //게시글 찾기
    public Board findVerifiedBoard(Long boardSeq) {
        Optional<Board> optionalBoard = boardRepository.findById(boardSeq);
        Board findBoard = optionalBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

        //해당 글이 없거나 삭제된 경우 ExceptionCode를 발생한다.
        if(findBoard.getBoardStatus() == Board.BoardStatus.BOARD_NOT_EXIST) {
            throw new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND);
        }
        return findBoard;
    }

    //제목 검색
    public Page<Board> findAllBySearch(String keyword, int page, int size) {
        return boardRepository.findAllByTitleContaining(keyword, PageRequest.of(page - 1, size,
                Sort.by("boardSeq").descending()));
    }

    //게시글 삭제
    public void deleteBoard(Long boardSeq, Long userSeq) {
        Board findBoard = findVerifiedBoard(boardSeq);

        long writerBoardSeq = findWriteBoardSeq(boardSeq);

        if(userSeq != writerBoardSeq) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        }
        findBoard.setBoardStatus(Board.BoardStatus.BOARD_NOT_EXIST);
        boardRepository.save(findBoard);  //db에 질문은 남기고 존재 유무로 삭제를 경정한다.
    }

    //질문 작성자 아읻 찾는 메서드
    public long findWriteBoardSeq(long boardSeq) {
        Board board = findVerifiedBoard(boardSeq);
        return board.getUser().getUserSeq();
    }

    //질문 작성자만 질문을 수정, 삭제할 수 있도록 질문 작성자를 찾음
    public User findBoardWriter(long boardSeq) {
        Board findBoard = findVerifiedBoard(boardSeq);
        return findBoard.getUser();
    }
}
