package com.mainproject.backend.domain.bookmark.service;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.service.BoardService;
import com.mainproject.backend.domain.bookmark.entity.Bookmark;
import com.mainproject.backend.domain.bookmark.repository.BookmarkRepository;
import com.mainproject.backend.global.exception.BusinessLogicException;
import com.mainproject.backend.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

//    private final UserService userService;

    private final BoardService boardService;

    public Bookmark createBookmark(Long boardSeq) {
        Board board = boardService.findBoardAndPlusViewCount(boardSeq);
        Bookmark bookmark = new Bookmark();
        Bookmark saveBookmark = bookmarkRepository.save(bookmark);

        return saveBookmark;
    }

    public void deleteBookmark(Long bookmarkSeq) {
        Bookmark bookmark = bookmarkRepository.findById(bookmarkSeq)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND));
        Board board = bookmark.getBoard();

        bookmarkRepository.deleteById(bookmarkSeq);
    }
}
