package com.mainproject.backend.domain.bookmark.dto;

import com.mainproject.backend.domain.bookmark.entity.Bookmark;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class BookmarkDto {

    @Getter
    @NoArgsConstructor
    public static class response {
        private Long bookmarkSeq;

//        private Long userSeq;

        private Long boardSeq;

        public response(Bookmark bookmark){
            this.bookmarkSeq = bookmark.getBookmarkSeq();
            this.boardSeq = bookmark.getBoard().getBoardSeq();
//            this.userSeq = bookmark.getUser().getUserSeq()
        }
    }

}
