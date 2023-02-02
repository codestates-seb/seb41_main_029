package com.mainproject.backend.domain.board.repositoty;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.option.Category;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findAllByUserAndBoardStatus(User user, Board.BoardStatus boardStatus);


    //제목 검색 기능
    Page<Board> findAllByTitleContainingAndBoardStatus(String keyword, Pageable pageable, Board.BoardStatus boardStatus);


    Page<Board> findAllByBoardStatus(Pageable pageable, Board.BoardStatus boardStatus);

    //카테고리 페이지
    Optional<Page<Board>> findByCategoryAndBoardStatus(Category boardCategory, Pageable pageable, Board.BoardStatus boardStatus);

    List<Board> findByCategoryAndBoardStatus(Category boardCategory, Board.BoardStatus boardStatus);
}

