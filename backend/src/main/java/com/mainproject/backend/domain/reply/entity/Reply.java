package com.mainproject.backend.domain.reply.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.reply.dto.CommentReplyDto;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.global.audit.Auditable;
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
public class Reply extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replySeq;

//    @JsonBackReference
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "board_seq")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private Board board;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "comment_seq")
    private Comment comment;

    public void increaseLikeCount() {
        this.liked += 1;
    }
    public void increaseDislikeCount() {
        this.disliked += 1;
    }


    @Column(nullable = true)
    private int liked; // 추천 수

    @Column(nullable = true)
    private int disliked; // 비추천 수

    public void editReply(CommentReplyDto.ReplyPatchDto req) {
        content = req.getContent();
    }

//    @JsonBackReference
//    @ManyToOne
//    @JoinColumn(name = "board_seq")
//    private Board board;
}
