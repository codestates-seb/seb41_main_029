package com.mainproject.backend.domain.board.repositoty;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.Bookmark;
import com.mainproject.backend.domain.board.option.Category;
import com.mainproject.backend.domain.users.entity.User;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findAllByUser(User user);


    //제목 검색 기능
    Page<Board> findAllByTitleContaining(String keyword, Pageable pageable);


    Page<Board> findAllByBoardStatus(Pageable pageable, Board.BoardStatus boardStatus);

    //카테고리 페이지
    Optional<Page<Board>> findByCategory(Category boardCategory, Pageable pageable);
}

