package com.mainproject.backend.domain.board.mapper;

import com.mainproject.backend.domain.board.dto.BoardDto;
import com.mainproject.backend.domain.board.dto.BoardWithCommentDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.dto.CommentResponseDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;



import java.time.LocalDateTime;
import java.util.ArrayList;
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
                                .category(board.getCategory().value)
                                .title(board.getTitle())
                                .bookmarkCount(board.getBookmarked())
                                .BookmarkStatus(board.isBookmarkStatus())
                                .viewCount(board.getViewCount())
                                .likeCount(board.getLiked())
                                .createdAt(board.getCreatedAt())
                                .build())
                .collect(Collectors.toList());
    }

    default BoardWithCommentDto boardToBoardWithCommentResponseDto(Board board){
        List<Comment> comments = board.getCommentList();
        BoardWithCommentDto boardWithCommentResponseDto = new BoardWithCommentDto();

        boardWithCommentResponseDto.setBoardSeq(board.getBoardSeq());
        boardWithCommentResponseDto.setCategory(board.getCategory().getValue());
        boardWithCommentResponseDto.setTitle(board.getTitle());
        boardWithCommentResponseDto.setContent(board.getContent());
        boardWithCommentResponseDto.setViewCount(board.getViewCount());
        boardWithCommentResponseDto.setCreatedAt(board.getCreatedAt());
        boardWithCommentResponseDto.setModifiedAt(board.getModifiedAt());

        //답변
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
                        .boardSeq(comment.getBoard().getBoardSeq())
                        .content(comment.getContent())
                        .build())
                .collect(Collectors.toList());
    }
}
