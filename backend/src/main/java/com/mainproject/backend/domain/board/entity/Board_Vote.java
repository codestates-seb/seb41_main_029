package com.mainproject.backend.domain.board.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Board_Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardVoteId;

    private boolean voteUp;

    @ManyToOne
    private Board board;

//    @ManyToOne
//    private Member member;

    public Board_Vote(boolean voteUp, Board board) {
        this.voteUp = voteUp;
        this.board = board;
    }
}
