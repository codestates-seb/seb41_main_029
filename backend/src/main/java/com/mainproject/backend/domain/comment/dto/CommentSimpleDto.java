//package com.mainproject.backend.domain.comment.dto;
//
//import com.mainproject.backend.domain.board.entity.Board;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class CommentSimpleDto {
//    private Long boardSeq;
//    private Long CommentSeq;
//    private String username;
//    private String content;
//    private int liked;
//    private int disliked;
//
//    public CommentSimpleDto toDto(Board board) {
//        return new CommentSimpleDto(board.getBoardSeq(), board.getTitle(), board.getUser().getUsername(), board.getLiked(),
//                board.getBookmarked());
//    }
//}
