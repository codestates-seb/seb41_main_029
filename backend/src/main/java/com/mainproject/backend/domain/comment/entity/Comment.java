package com.mainproject.backend.domain.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.reply.entity.Reply;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
public class Comment extends Auditable {


    public void increaseLikeCount() {
        this.liked += 1;
    }
    public void increaseDislikeCount() {
        this.disliked += 1;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentSeq;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Board board;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_seq")
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "comment",cascade = CascadeType.ALL)
    List<Reply> replies = new ArrayList<>();

    public void setReply(Reply reply){
        this.replies.add(reply);
        if (reply.getComment() != this){
            reply.setComment(this);
        }
    }
    @Column(nullable = false)
    private int liked; // 추천 수

    @Column(nullable = false)
    private int disliked; // 비추천 수

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Comment.CommentStatus commentExist = Comment.CommentStatus.COMMENT_EXIST;

    public enum CommentStatus {
        COMMENT_EXIST("존재하는 댓글"),
        COMMENT_NOT_EXIST("존재하지 않는 댓글");
        @Getter
        private String status;
        CommentStatus(String status) {
            this.status = status;
        }
    }
}
