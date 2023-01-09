package com.mainproject.backend.domain.board.repositoty;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.Board_Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardVoteRepository extends JpaRepository<Board_Vote, Long> {

    Optional<Board_Vote> findByBoard(Board board);
    void deleteAllByBoard(Board board);
}
