package com.mainproject.backend.domain.board.mapper;

import com.mainproject.backend.domain.board.dto.BoardDto;
import com.mainproject.backend.domain.board.dto.PageBoardResponseDto;
import com.mainproject.backend.domain.board.dto.BoardWithCommentDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.service.BoardService;
import com.mainproject.backend.domain.comment.dto.CommentResponseDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.mapper.UserMapper;
import com.mainproject.backend.domain.users.service.UserService;
import com.mainproject.backend.global.exception.BusinessLogicException;
import com.mainproject.backend.global.exception.ExceptionCode;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;



import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {

    //생성
    default Board boardPostDtoToBoard(BoardDto.Post postDto,
                                      UserService userService){

        Board board = new Board();

        board.setCategory(postDto.getCategory());
        board.setTitle(postDto.getTitle());
        board.setContent(postDto.getContent());

        User user = userService.getLoginUser();  //로그인 정보 넣기

        board.setUser(user);

        return board;
    }

    //수정
    default Board boardPatchDtoToBoard(BoardService boardService,
                                       BoardDto.Patch patchDto,
                                       UserService userService) {
        User user = userService.getLoginUser();
        //해당 유저가 쓴 질문글이 아니면 수정 삭제 불가
        if(user.getUserSeq() !=
                boardService.findBoardWriter(patchDto.getBoardSeq()).getUserSeq()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        }

        Board board = new Board();
        board.setBoardSeq(patchDto.getBoardSeq());
        board.setCategory(patchDto.getCategory());
        board.setTitle(patchDto.getTitle());
        board.setContent(patchDto.getContent());
        board.setUser(user);

        return board;
    }

    BoardDto.response boardToBoardResponseDto(Board board);

    default BoardDto.response boardToBoardResponseDto(UserMapper userMapper, Board board) {

        BoardDto.response response = new BoardDto.response();
        response.setBoardSeq(board.getBoardSeq());
        response.setCategory(board.getCategory().value);
        response.setTitle(board.getTitle());
        response.setContent(board.getContent());
        response.setVoteResult(board.getVoteResult());
        response.setViewCount(board.getViewCount());
        response.setCreatedAt(board.getCreatedAt());
        response.setModifiedAt(board.getModifiedAt());

        User user = board.getUser(); // 직문 작성자 속성 추가
        response.setUser(userMapper.userToUserResponse2(user));

        return response;
    }

    List<PageBoardResponseDto> boardsToBoardResponsesDto(List<Board> boards);

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
