package com.mainproject.backend.domain.AWS.s3;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AwsS3 {
    private String key;
    private String path;

    public AwsS3() {

    }

    @Builder
    public AwsS3(String key, String path) {
        this.key = key;
        this.path = path;
    }
}