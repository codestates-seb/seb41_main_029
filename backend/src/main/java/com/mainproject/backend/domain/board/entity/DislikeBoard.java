package com.mainproject.backend.domain.board.entity;

import com.mainproject.backend.domain.audit.Auditable;
import com.mainproject.backend.domain.users.entity.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class DislikeBoard extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dislikeSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq", nullable = false)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private boolean status; // true = 좋아요

    public DislikeBoard(Board board, User user) {
        this.board = board;
        this.user = user;
        this.status = true;
    }
}
