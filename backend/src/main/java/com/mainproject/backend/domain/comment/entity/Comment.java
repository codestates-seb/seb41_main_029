package com.mainproject.backend.domain.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.global.audit.Auditable;
import com.mainproject.backend.global.auth.auth;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentSeq;

    @Column(length = 65535,nullable = false)
    private String content;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_ID")
    private Board board;

//    @JsonBackReference
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "USER_ID")
//    private User user;


}
