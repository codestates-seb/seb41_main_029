package com.mainproject.backend.domain.users.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.users.dto.UserDto;
import com.mainproject.backend.global.audit.Auditable;
import com.mainproject.backend.global.auth.entity.ProviderType;
import com.mainproject.backend.global.auth.entity.RoleType;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "USER")
public class User extends Auditable {

    @JsonIgnore
    @Id
    @Column(name = "USER_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userSeq;

    @Column(name = "USER_ID", length = 64, unique = true)
    @NotNull
    @Size(max = 64)
    private String userId;

    @Column(name = "USERNAME", length = 32)
    @NotNull
    @Size(max = 32)
    private String username;

    @JsonIgnore
    @Column(name = "PASSWORD", length = 64)
    @NotNull
    @Size(max = 64)
    private String password;

    @Column(name = "EMAIL", length = 512)
    @NotNull
    @Size(max = 512)
    private String email;

    @Column(name = "PROFILE_IMAGE_URL", length = 512)
    @NotNull
    @Size(max = 512)
    private String profileImageUrl;

    @Column(name = "PROVIDER_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ProviderType providerType;

    @Column(name = "ROLE_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private RoleType roleType;

//    @Column(name = "CREATED_AT")
//    @NotNull
//    private LocalDateTime createdAt;
//
//    @Column(name = "MODIFIED_AT")
//    @NotNull
//    private LocalDateTime modifiedAt;


    public User(
            @NotNull @Size(max = 64) String userId,
            @NotNull @Size(max = 32) String username,
            @NotNull @Size(max = 64) String email,
            @NotNull @Size(max = 512) String profileImageUrl,
            @NotNull ProviderType providerType,
            @NotNull RoleType roleType
//            @NotNull LocalDateTime createdAt,
//            @NotNull LocalDateTime modifiedAt
    ) {
        this.userId = userId;
        this.username = username;
        this.password = "NO_PASS";
        this.email = email != null ? email : "NO_EMAIL";
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "https://ifh.cc/g/B2fA6Y.png";
        this.providerType = providerType;
        this.roleType = roleType;
//        this.createdAt = createdAt;
//        this.modifiedAt = modifiedAt;
    }

    public void editUser(UserDto.Patch req) {

        username = req.getUsername();
        password = req.getPassword();
        profileImageUrl = req.getProfileImageUrl();
    }

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Board> boards = new ArrayList<>();

    @JsonIgnore
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();


}
