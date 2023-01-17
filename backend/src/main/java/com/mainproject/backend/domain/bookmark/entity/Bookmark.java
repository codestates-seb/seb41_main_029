package com.mainproject.backend.domain.bookmark.entity;

import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Negative;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Bookmark extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkSeq;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_seq")
//    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq")
    private Board board;
}
