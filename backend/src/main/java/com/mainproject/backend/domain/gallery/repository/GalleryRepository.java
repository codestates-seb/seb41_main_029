package com.mainproject.backend.domain.gallery.repository;

import com.mainproject.backend.domain.gallery.entity.Gallery;
import com.mainproject.backend.domain.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> /*JpaSpecificationExecutor<Gallery> */{

        List<Gallery> findAllByUser(User user);

}
