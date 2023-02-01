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
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @JsonBackReference
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
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

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Reply.ReplyStatus replyExist = Reply.ReplyStatus.REPLY_EXIST;

    public enum ReplyStatus {
        REPLY_EXIST("존재하는 댓글"),
        REPLY_NOT_EXIST("존재하지 않는 댓글");
        @Getter
        private String status;
        ReplyStatus(String status) {
            this.status = status;
        }
    }

    public void editReply(CommentReplyDto.ReplyPatchDto req) {
        content = req.getContent();
    }
}
