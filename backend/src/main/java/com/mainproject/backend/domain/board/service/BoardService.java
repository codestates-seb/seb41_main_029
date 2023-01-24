package com.mainproject.backend.domain.board.service;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.Bookmark;
import com.mainproject.backend.domain.board.entity.DislikeBoard;
import com.mainproject.backend.domain.board.entity.LikeBoard;
import com.mainproject.backend.domain.board.repositoty.BoardRepository;
import com.mainproject.backend.domain.board.repositoty.BookmarkRepository;
import com.mainproject.backend.domain.board.repositoty.DislikeBoardRepository;
import com.mainproject.backend.domain.board.repositoty.LikeBoardRepository;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.repository.UserRepository;
import com.mainproject.backend.global.exception.BoardNotFoundException;
import com.mainproject.backend.global.exception.BookmarkNotFoundException;
import com.mainproject.backend.global.exception.BusinessLogicException;
import com.mainproject.backend.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
/*
*
*
 */
@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {
    private final static String SUCCESS_LIKE_BOARD = "추천 처리 완료";
    private final static String FAIL_LIKE_BOARD = "이미 추천을 누르셨습니다.";
    private final static String SUCCESS_DISLIKE_BOARD = "비추천 처리 완료";
    private final static String FAIL_DISLIKE_BOARD = "이미 비추천을 누르셨습니다.";
    private final static String SUCCESS_BOOKMARK_BOARD = "즐겨찾기 처리 완료";
    private final static String SUCCESS_UNBOOKMARK_BOARD = "즐겨찾기 취소 완료";
    private final BoardRepository boardRepository;
    private final LikeBoardRepository likeBoardRepository;
    private final DislikeBoardRepository dislikeBoardRepository;
    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    //유저 서비스

    //게시글 등록
    public Board createBoard(Board board, User user) {
        board.setUser(user);
//        if (!hasBookmarkBoard(board, user)) {
////            board.increaseBookmarkCount();
//            board.setBookmarkStatus(false);
//        }else board.setBookmarkStatus(true);


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
    public Board findBoardAndPlusViewCount(Long boardSeq) {
        User user = getPrincipal();
        Board findBoard = findVerifiedBoard(boardSeq);
        if(hasBookmarkBoard(findBoard, user)){
            findBoard.setBookmarkStatus(true);
        }else findBoard.setBookmarkStatus(false);
        findBoard.plusViewCount();

        return findBoard;
    }

    public Page<Board> findAllBoard(int page, int size) {
        return boardRepository.findAll(PageRequest.of(page -1 , size, Sort.by("boardSeq").descending()));
    }

    //게시글 찾기
    public Board findVerifiedBoard(Long boardSeq) {
        Optional<Board> optionalBoard = boardRepository.findById(boardSeq);
        Board findBoard = optionalBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }

    //제목 검색
    public Page<Board> findAllBySearch(String keyword, int page, int size) {
        return boardRepository.findAllByTitleContaining(keyword, PageRequest.of(page - 1, size,
                Sort.by("boardSeq").descending()));
    }

    //게시글 삭제
    public void deleteBoard(Long boardSeq) {
        Board findBoard = findVerifiedBoard(boardSeq);
        boardRepository.delete(findBoard);
    }

    @Transactional
    public String updateOfBookmarkBoard(Long id, User user) {
        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);
        if (!hasBookmarkBoard(board, user)) {
            board.increaseBookmarkCount();
            board.increaseBookmarkStatus();
            return createBookmarkBoard(board, user);
        }
        board.decreaseBookmarkCount();
        board.decreaseBookmarkStatus();
        return removeBookmarkBoard(board, user);
    }

    @Transactional
    public String updateLikeOfBoard(Long boardSeq, User user) {
        Board board = boardRepository.findById(boardSeq).orElseThrow(BoardNotFoundException::new);
        if (!hasLikeBoard(board, user)) {
            board.increaseLikeCount();
            return createLikeBoard(board, user);
        }else return FAIL_LIKE_BOARD;
    }

    @Transactional
    public String updateDislikeOfBoard(Long boardSeq, User user) {
        Board board = boardRepository.findById(boardSeq).orElseThrow(BoardNotFoundException::new);
        if (!hasDislikeBoard(board, user)) {
            board.increaseDislikeCount();
            return createDislikeBoard(board, user);
        }else return FAIL_DISLIKE_BOARD;
    }



    //추천 기능
    public String createLikeBoard(Board board, User user) {
        LikeBoard likeBoard = new LikeBoard(board, user); // true 처리
        likeBoardRepository.save(likeBoard);
        return SUCCESS_LIKE_BOARD;
    }
    //비추천 기능
    public String createDislikeBoard(Board board, User user) {
        DislikeBoard dislikeBoard = new DislikeBoard(board, user); // true 처리
        dislikeBoardRepository.save(dislikeBoard);
        return SUCCESS_DISLIKE_BOARD;
    }

    public String createBookmarkBoard(Board board, User user) {
        Bookmark bookmark = new Bookmark(board, user); // true 처리
        bookmarkRepository.save(bookmark);
        return SUCCESS_BOOKMARK_BOARD;
    }

    public String removeBookmarkBoard(Board board, User user) {
        Bookmark bookmark = bookmarkRepository.findByBoardAndUser(board, user)
                .orElseThrow(BookmarkNotFoundException::new);
        bookmarkRepository.delete(bookmark);
        return SUCCESS_UNBOOKMARK_BOARD;
    }

    public boolean hasLikeBoard(Board board, User user){
        return likeBoardRepository.findByBoardAndUser(board, user).isPresent();
    }

    public boolean hasDislikeBoard(Board board, User user) {
        return dislikeBoardRepository.findByBoardAndUser(board, user).isPresent();
    }


    public boolean hasBookmarkBoard(Board board, User user) {
        return bookmarkRepository.findByBoardAndUser(board, user).isPresent();
    }
    private User getPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserId(authentication.getName());
        return user;
    }
}
