package com.mainproject.backend.domain.gallery.repository;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.gallery.entity.Gallery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

//    Page<Gallery> findAllByGallerySeq(Pageable pageable, Gallery);
}
