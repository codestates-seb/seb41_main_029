package com.mainproject.backend.domain.board.repositoty;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.Bookmark;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByBoardAndUser(Board board, User user);
    List<Bookmark> findAllByUser(User user);
}
