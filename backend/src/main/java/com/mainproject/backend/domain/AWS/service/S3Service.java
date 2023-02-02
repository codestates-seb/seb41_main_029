package com.mainproject.backend.domain.AWS.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.mainproject.backend.domain.AWS.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class S3Service {
    private AmazonS3 s3client;
    private ImageRepository imageRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    Duration duration = Duration.ofHours(6);
    Instant expiration = Instant.now().plus(duration);

    @Autowired
    public S3Service(AmazonS3 s3client, ImageRepository imageRepository) {
        this.s3client = s3client;
        this.imageRepository = imageRepository;
    }
    public List<String> uploadFiles(List<MultipartFile> files) {
        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                // Generate a unique file name using UUID
                String fileName = UUID.randomUUID().toString();
                // Create a metadata object with content-type set to the file's type
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentLength(file.getSize());
                metadata.setContentType(file.getContentType());
                // Upload the file to S3
                s3client.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), metadata));
                // Retrieve the key name of the uploaded object
                S3ObjectSummary s3ObjectSummary = s3client.listObjects(bucket,fileName).getObjectSummaries().get(0);
                String fileKey = s3ObjectSummary.getKey();
                // Generate a URL for the image
                URL url = s3client.generatePresignedUrl(bucket, fileKey, Date.from(expiration));
                String fileUrl = url.toString();
                fileUrls.add(fileUrl);
                //save to db
//                Image image = new Image();
//                image.setUrl(fileKey);
//                image.setUser(user);
//                imageRepository.save(image);
            } catch (IOException e) {
                throw new IllegalStateException(e);
            }
        }
        return fileUrls;
    }
}

//    public List<String> uploadFiles(List<MultipartFile> files, User user) {
//        List<String> fileUrls = new ArrayList<>();
//        for (MultipartFile file : files) {
//            try {
//                // Get the file name
//                String userId = user.getUserId();
//                String fileName = file.getOriginalFilename();
//                String filePath = userId + "/" + fileName;
////                String filePath = randomFileName(file, userId);
//                // Create a metadata object with content-type set to the file's type
//                ObjectMetadata metadata = new ObjectMetadata();
//                metadata.setContentLength(file.getSize());
//                metadata.setContentType(file.getContentType());
//                // Upload the file to S3
//                s3client.putObject(new PutObjectRequest(bucket, filePath, file.getInputStream(), metadata));
//                // Retrieve the key name of the uploaded object
//                S3ObjectSummary s3ObjectSummary = s3client.listObjects(bucket,filePath).getObjectSummaries().get(0);
//                String fileKey = s3ObjectSummary.getKey();
//                // Generate a URL for the image
//                URL url = s3client.getUrl(bucket, fileKey);
//                String fileUrl = url.toString();
//                fileUrls.add(fileUrl);
//                //save to db
//                Image image = new Image();
//                image.setUrl(fileUrl);
//                image.setUser(user);
//                imageRepository.save(image);
//            } catch (IOException e) {
//                throw new IllegalStateException(e);
//            }
//        }
//        return fileUrls;
//    }
//    private String randomFileName(MultipartFile file, String dirName) {
//        return dirName + "/" + UUID.randomUUID() + file.getName();
//    }
//}