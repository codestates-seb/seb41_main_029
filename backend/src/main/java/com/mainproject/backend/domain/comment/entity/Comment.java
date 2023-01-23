package com.mainproject.backend.domain.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.global.audit.Auditable;
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

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq")
    private Board board;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;
}