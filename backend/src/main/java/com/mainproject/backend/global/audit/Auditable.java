package com.mainproject.backend.global.audit;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass //단순히 속성만 받아서 사용
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable {

    @CreatedDate //생성시간
    @Column(name = "CREATED_AT", updatable = false)  //updatable = false 수정안됨
    private LocalDateTime createdAt;

    @LastModifiedDate //수정시간
    @Column(name = "MODIFIED_AT")
    private LocalDateTime modifiedAt;
}
