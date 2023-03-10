package com.mainproject.backend.domain.comment.entity;

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
public class DislikeComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dislikeSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_seq", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Comment comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private boolean status; // true = 좋아요

    public DislikeComment(Comment comment, User user) {
        this.comment = comment;
        this.user = user;
        this.status = true;
    }
}
