package com.mainproject.backend.domain.bookmark.controller;

import com.mainproject.backend.domain.bookmark.entity.Bookmark;
import com.mainproject.backend.domain.bookmark.mapper.BookmarkMapper;
import com.mainproject.backend.domain.bookmark.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    private final BookmarkMapper mapper;

    @PostMapping
    public ResponseEntity postBookmark(@RequestParam("boardSeq")@Positive Long boardSeq) {
        Bookmark postBookmark = bookmarkService.createBookmark(boardSeq);

        return new ResponseEntity<>(mapper.bookmarkToResponseDto(postBookmark), HttpStatus.CREATED);
    }

    @DeleteMapping("/{bookmark-seq}")
    public ResponseEntity deleteBookmark(@PathVariable("bookmark-id") @Positive Long bookmarkSeq) {
        bookmarkService.deleteBookmark(bookmarkSeq);

        return ResponseEntity.noContent().build();
    }
}
