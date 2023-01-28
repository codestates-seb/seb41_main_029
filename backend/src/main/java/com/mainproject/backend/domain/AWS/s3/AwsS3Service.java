package com.mainproject.backend.domain.AWS.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import com.mainproject.backend.domain.users.entity.User;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AwsS3Service {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private static String bucket;





public String uploadImage(String bucket, String userId, String fileName, InputStream inputStream) throws IOException {


    User user = new User();
    String folderName = user.getUserId();
    String filePath = userId + "/" + fileName;
    if(fileName == null){
        return null;
    }

    ObjectMetadata objectMetadata = new ObjectMetadata();
    byte[] bytes = IOUtils.toByteArray(inputStream);
    objectMetadata.setContentLength(bytes.length);
    ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

    PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, filePath, byteArrayInputStream, objectMetadata);
    putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
    amazonS3.putObject(putObjectRequest);
    return amazonS3.getUrl(bucket, filePath).toString();
}

//    private String upload(String bucket, String userId, String fileName) {
//
//        User user = new User();
//        String folderName = user.getUserId();
//        String filePath = userId + "/" + fileName;
//
//        ObjectMetadata objectMetadata = new ObjectMetadata();
//        PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, filePath, inputStream, objectMetadata);
//        putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
//        amazonS3.putObject(putObjectRequest);
//        return amazonS3.getUrl(bucket, fileName).toString();
//    }

    private String randomFileName(File file, String dirName) {
        return dirName + "/" + UUID.randomUUID() + file.getName();
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return getS3(bucket, fileName);
    }

    private String getS3(String bucket, String fileName) {
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    private void removeFile(File file) {
        file.delete();
    }

    public Optional<File> convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(System.getProperty("user.dir") + "/" + multipartFile.getOriginalFilename());

        if (file.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(file)){
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(file);
        }
        return Optional.empty();
    }

    public void remove(AwsS3 awsS3) {
        if (!amazonS3.doesObjectExist(bucket, awsS3.getKey())) {
            throw new AmazonS3Exception("Object " +awsS3.getKey()+ " does not exist!");
        }
        amazonS3.deleteObject(bucket, awsS3.getKey());
    }


}

//@Service
//public class S3Uploader {
//    private AmazonS3 amazonS3;
//
////    @Value("${cloud.aws.credentials.accessKey}")
////    private String accessKey;
////
////    @Value("${cloud.aws.credentials.secretKey}")
////    private String secretKey;
////
////    @Value("${cloud.aws.s3.bucket}")
////    private String bucket;
////
////    @Value("${cloud.aws.region.static}")
////    private String region;
//
//    public S3Uploader(AmazonS3 amazonS3) {
//        this.amazonS3 = amazonS3;
//    }
//
//    public String uploadImage(String bucketName, String fileName, InputStream inputStream) {
//        ObjectMetadata objectMetadata = new ObjectMetadata();
//        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata);
//        putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
//        amazonS3.putObject(putObjectRequest);
//        return amazonS3.getUrl(bucketName, fileName).toString();
//    }
//}