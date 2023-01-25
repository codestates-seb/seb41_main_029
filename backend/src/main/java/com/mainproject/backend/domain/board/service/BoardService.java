package com.mainproject.backend.domain.board.service;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.Bookmark;
import com.mainproject.backend.domain.board.entity.DislikeBoard;
import com.mainproject.backend.domain.board.entity.LikeBoard;
import com.mainproject.backend.domain.board.option.Category;
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
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        findBoard.plusViewCount();
        if (!hasBookmarkBoard(findBoard, user)) {
            findBoard.setBookmarkStatus(false);
        }else findBoard.setBookmarkStatus(true);

        return findBoard;
    }

    //전체 게시물 조회
    public Page<Board> findAllBoard(int page, int size, String sortBy) {
        return boardRepository.findAllByBoardStatus(getPageRequest(page, size, sortBy), Board.BoardStatus.BOARD_EXIST);
    }

    //카테고리 별 게시물 조회
    public Page<Board> findAllCategoryBoard(Long categoryId, int page, int size, String sortBy) {
        Category boardCategory = categoryIdToboardCategory(categoryId);
        return boardRepository.findByCategoryAndBoardStatus(boardCategory, getPageRequest(page, size, sortBy), Board.BoardStatus.BOARD_EXIST)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }

    //정렬
    private PageRequest getPageRequest(int page, int size, String sortBy){
        if(sortBy.equals("최신순"))
            sortBy = "boardSeq";
        else if(sortBy.equals("조회순"))
            sortBy = "viewCount";
        else if(sortBy.equals("추천순"))
            sortBy = "liked";
        else if(sortBy.equals("북마크순"))
            sortBy = "bookmarked";

        return PageRequest.of(page, size, Sort.by(sortBy).descending());
    }

    // 카테고리 id -> 카테고리 enum으로 변환
    private Category categoryIdToboardCategory(Long categoryId){
        Category boardCategory = null;

        if(categoryId == 1) {
            boardCategory = Category.GENERAL;
        }else if(categoryId == 2) {
            boardCategory = Category.INFORMATION;
        }else if(categoryId == 3) {
            boardCategory = Category.QUESTION;
        }
        return boardCategory;
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

    //질문 작성자 아이디 찾는 메서드
    public long findWriteBoardSeq(long boardSeq) {
        Board board = findVerifiedBoard(boardSeq);
        return board.getUser().getUserSeq();
    }

    //북마크 추가
    @Transactional
    public String updateOfBookmarkBoard(Long boardSeq, User user) {
        Board board = findVerifiedBoard(boardSeq);
        if (!hasBookmarkBoard(board, user)) {
            board.increaseBookmarkCount();
            board.increaseBookmarkStatus();
            return createBookmarkBoard(board, user);
        }
        board.decreaseBookmarkCount();
        board.decreaseBookmarkStatus();
        return removeBookmarkBoard(board, user);
    }

    //추천
    @Transactional
    public String updateLikeOfBoard(Long boardSeq, User user) {
        Board board = findVerifiedBoard(boardSeq);
        if (!hasLikeBoard(board, user)) {
            board.increaseLikeCount();
            return createLikeBoard(board, user);
        }else return FAIL_LIKE_BOARD;
    }

    //비추천
    @Transactional
    public String updateDislikeOfBoard(Long boardSeq, User user) {
        Board board = findVerifiedBoard(boardSeq);
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
