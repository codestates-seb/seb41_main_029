package com.mainproject.backend.domain.board.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mainproject.backend.domain.board.option.Category;
//import com.mainproject.backend.domain.bookmark.entity.Bookmark;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.global.audit.Auditable;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Board extends Auditable { //시간 추가

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardSeq; // 게시판 ID

    public void increaseLikeCount() {
        this.liked += 1;
    }
    public void increaseDislikeCount() {
        this.disliked += 1;
    }

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category; // 카테고리

    @Column(nullable = false)
    private String title;  // 게시판 제목

    @Lob
    @Column(nullable = false)
    private String content; // 게시판 내용

    private Integer viewCount = 0;  // 조회 수


    @Column(nullable = true)
    private int liked; // 추천 수

    @Column(nullable = true)
    private int disliked; // 비추천 수


    @Column(nullable = true)
    private int bookmarked; // 즐겨찾기 수

    public void increaseBookmarkCount() {
        this.bookmarked += 1;
    }

    public void decreaseBookmarkCount() {
        this.bookmarked -= 1;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;



    // 멤버 연관매핑
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member")
//    private Member member;

//    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
//    private List<Bookmark> bookmarks = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
    List<Comment> commentList = new ArrayList<>();

    public void plusViewCount() {
        this.viewCount += 1;
    }

    public void setComment(Comment comment){
        this.commentList.add(comment);
        if (comment.getBoard() != this){
            comment.setBoard(this);

        }
    }
}
