package com.mainproject.backend.domain.comment.entity;

import com.mainproject.backend.global.auth.auth;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(length = 65535,nullable = false)
    private String content;


}
