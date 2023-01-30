package com.mainproject.backend.domain.reply.entity;

import com.mainproject.backend.domain.audit.Auditable;
import com.mainproject.backend.domain.comment.entity.Comment;
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
public class LikeReply extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reply_seq", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Reply reply;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private boolean status; // true = 좋아요, false = 좋아요 취소

    public LikeReply(Reply reply, User user) {
        this.reply = reply;
        this.user = user;
        this.status = true;
    }
}
