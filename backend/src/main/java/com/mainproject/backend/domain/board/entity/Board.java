package com.mainproject.backend.domain.board.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mainproject.backend.domain.board.option.Category;
//import com.mainproject.backend.domain.bookmark.entity.Bookmark;
import com.mainproject.backend.domain.bookmark.entity.Bookmark;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.global.audit.Auditable;
import lombok.*;

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


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category; // 카테고리

    @Column(nullable = false)
    private String title;  // 게시판 제목

    @Lob
    @Column(nullable = false)
    private String content; // 게시판 내용

    private Integer viewCount = 0;  // 조회 수

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private BoardStatus boardStatus = BoardStatus.BOARD_EXIST;

    @Column
    private Long voteResult = 0L;  // 추천 수

    // 멤버 연관매핑
    @ManyToOne(targetEntity = User.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_seq")
    private User user;

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
    public enum BoardStatus {
        BOARD_EXIST("존재하는 게시물"),
        BOARD_NOT_EXIST("존재하지 않는 게시물");
        @Getter
        private String status;
        BoardStatus(String status) {
            this.status = status;
        }
    }
}
