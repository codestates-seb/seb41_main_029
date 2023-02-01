package com.mainproject.backend.domain.gallery.repository;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.Bookmark;
import com.mainproject.backend.domain.gallery.entity.Gallery;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

//    Page<Gallery> findAllByGallerySeq(Pageable pageable, Gallery);
        List<Gallery> findAllByUser(User user);
}
