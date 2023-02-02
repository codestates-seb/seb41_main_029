package com.mainproject.backend.domain.board.repositoty;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.DislikeBoard;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DislikeBoardRepository extends JpaRepository<DislikeBoard, Long> {

    Optional<DislikeBoard> findByBoardAndUser(Board board, User user);
}
