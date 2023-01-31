package com.mainproject.backend.domain.AWS.repository;

import com.mainproject.backend.domain.AWS.entity.Image;
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
public interface ImageRepository extends JpaRepository<Image, Long> {


}

