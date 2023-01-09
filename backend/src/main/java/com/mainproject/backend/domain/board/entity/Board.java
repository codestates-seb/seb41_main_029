package com.mainproject.backend.domain.board.entity;

import com.mainproject.backend.domain.board.option.Category;
import com.mainproject.backend.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Board extends Auditable { //시간 추가

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId; // 게시판 ID


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category; // 카테고리

    @Column(nullable = false)
    private String title;  // 게시판 제목

    @Lob
    @Column(nullable = false)
    private String content; // 게시판 내용

    private Integer viewCount = 0;  // 조회 수

    @Column
    private Long voteResult = 0L;  // 추천 수

    // 멤버 연관매핑
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member")
//    private Member member;

    public void plusViewCount() {
        this.viewCount += 1;
    }
}
