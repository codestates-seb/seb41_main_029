package com.mainproject.backend.domain.gallery.entity;

import com.mainproject.backend.domain.users.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gallerySeq; // 게시판 ID

    @Column(nullable = false, length = 512)
    @NotNull
    @Size(max = 512)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false, length = 64)
    private String title;

    @Column(nullable = false, length = 64)
    private String content;

    @Column(nullable = false, length = 64)
    private String tag; // 태그

    @Column(nullable = false, length = 64)
    private int liked;

    public void increaseLikeCount() {
        this.liked += 1;
    }
}
