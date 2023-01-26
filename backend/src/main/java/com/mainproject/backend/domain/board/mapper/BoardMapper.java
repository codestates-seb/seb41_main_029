package com.mainproject.backend.domain.board.mapper;

import com.mainproject.backend.domain.board.dto.BoardDto;
import com.mainproject.backend.domain.board.dto.BoardWithCommentDto;
import com.mainproject.backend.domain.board.dto.SimpleReplyDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.dto.CommentResponseDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.reply.entity.Reply;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {

    default Board boardPostDtoToBoard(BoardDto.Post postDto){
        Board board = new Board();
        board.setCategory(postDto.getCategory());
        board.setTitle(postDto.getTitle());
        board.setContent(postDto.getContent());


        return board;
    }

    default Board boardPatchDtoToBoard(BoardDto.Patch patchDto) {
        Board board = new Board();
        board.setBoardSeq(patchDto.getBoardSeq());
        board.setCategory(patchDto.getCategory());
        board.setTitle(patchDto.getTitle());
        board.setContent(patchDto.getContent());

        return board;
    }
    default BoardDto.response boardToBoardResponseDto(Board board) {
        BoardDto.response response = new BoardDto.response(board);

        return response;
    }

    default List<BoardDto.PageBoardResponse> boardsToBoardResponsesDto(List<Board> boards){
        return boards.stream()
                .map(board -> BoardDto.PageBoardResponse
                        .builder()
                        .boardSeq(board.getBoardSeq())
                        .userSeq(board.getUser().getUserSeq())
                                .username(board.getUser().getUsername())
                                .category(board.getCategory().category)
                                .title(board.getTitle())
                                .bookmarkCount(board.getBookmarked())
                                .viewCount(board.getViewCount())
                                .commented(board.getCommented())
                                .likeCount(board.getLiked())
                                .createdAt(board.getCreatedAt())
                                .build())
                .collect(Collectors.toList());
    }

    default BoardWithCommentDto boardToBoardWithCommentResponseDto(Board board){
       List<Comment> comments = board.getCommentList();
       BoardWithCommentDto boardWithCommentResponseDto = new BoardWithCommentDto();

       boardWithCommentResponseDto.setBoardSeq(board.getBoardSeq());
       boardWithCommentResponseDto.setUserSeq(board.getUser().getUserSeq());
       boardWithCommentResponseDto.setUsername(board.getUser().getUsername());
       boardWithCommentResponseDto.setProfileImageUrl(board.getUser().getProfileImageUrl());
       boardWithCommentResponseDto.setCategory(board.getCategory().category);
       boardWithCommentResponseDto.setTitle(board.getTitle());
       boardWithCommentResponseDto.setUserId(board.getUser().getUserId());
       boardWithCommentResponseDto.setUsername(board.getUser().getUsername());
       boardWithCommentResponseDto.setProfileImageUrl(board.getUser().getProfileImageUrl());
       boardWithCommentResponseDto.setBookmarkStatus(board.isBookmarkStatus());
       boardWithCommentResponseDto.setContent(board.getContent());
       boardWithCommentResponseDto.setViewCount(board.getViewCount());
       boardWithCommentResponseDto.setBookmarkCount(board.getBookmarked());
       boardWithCommentResponseDto.setLikeCount(board.getLiked());
       boardWithCommentResponseDto.setCommented(board.getCommented());
       boardWithCommentResponseDto.setDislikeCount(board.getDisliked());
       boardWithCommentResponseDto.setCreatedAt(board.getCreatedAt());
       boardWithCommentResponseDto.setModifiedAt(board.getModifiedAt());

       //커맨트
        boardWithCommentResponseDto.setComments(commentToBoardWithCommentResponseDtos(comments));

        return boardWithCommentResponseDto;
    }

    //comment 리스트화
    default List<CommentResponseDto> commentToBoardWithCommentResponseDtos(List<Comment> comments){

        return comments
                .stream()
                .map(comment -> CommentResponseDto
                        .builder()
                        .commentSeq(comment.getCommentSeq())
                        .userSeq(comment.getUser().getUserSeq())
                        .boardSeq(comment.getBoard().getBoardSeq())
                        .username(comment.getUser().getUsername())
                        .liked(comment.getLiked())
                        .disliked(comment.getDisliked())
                        .userId(comment.getUser().getUserId())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .reply(replyToCommentWithCommentResponseDto(comment.getReplies()))
                        .build())
                .collect(Collectors.toList());
    }

    default List<SimpleReplyDto> replyToCommentWithCommentResponseDto(List<Reply> replies){
        return replies
                .stream()
                .map(reply -> SimpleReplyDto
                        .builder()
                        .commentSeq(reply.getComment().getCommentSeq())
                        .replySeq(reply.getReplySeq())
                        .userSeq(reply.getUser().getUserSeq())
                        .username(reply.getUser().getUsername())
                        .liked(reply.getLiked())
                        .disliked(reply.getDisliked())
                        .userId(reply.getUser().getUserId())
                        .content(reply.getContent())
                        .createdAt(reply.getCreatedAt())
                        .modifiedAt(reply.getModifiedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
