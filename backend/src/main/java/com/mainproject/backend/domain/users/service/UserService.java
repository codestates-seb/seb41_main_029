package com.mainproject.backend.domain.users.service;

import com.mainproject.backend.domain.AWS.s3.AwsS3Service;
import com.mainproject.backend.domain.board.dto.BoardSimpleDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.Bookmark;
import com.mainproject.backend.domain.board.repositoty.BoardRepository;
import com.mainproject.backend.domain.board.repositoty.BookmarkRepository;
import com.mainproject.backend.domain.comment.dto.CommentSimpleDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.repository.CommentRepository;
import com.mainproject.backend.domain.users.dto.UserDto;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.entity.UserRefreshToken;
import com.mainproject.backend.domain.users.repository.UserRefreshTokenRepository;
import com.mainproject.backend.domain.users.repository.UserRepository;
import com.mainproject.backend.global.auth.entity.ProviderType;
import com.mainproject.backend.global.auth.entity.RoleType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BookmarkRepository bookmarkRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final String NoEmail = "NO Email";
//    private final AwsS3Service awsS3Service;
//
//    @Value("${cloud.aws.s3.bucket}")
//    private String bucket;


    public User createUser(UserDto.post req) {
        User user = createSignupFormOfUser(req);
        userRepository.save(user);

        return userRepository.saveAndFlush(user);
    }

    @Transactional
    public User editMemberInfo(User user, UserDto.Patch req) {
        user.editUser(req);
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        return userRepository.save(user);
    }


//    @Transactional
//    public User editMemberInfo(User user, UserDto.Patch req, @Valid MultipartFile file) throws IOException {
//        user.editUser(req);
//        user.setPassword(passwordEncoder.encode(req.getPassword()));
//        String imageUrl = awsS3Service.uploadImage(bucket, user.getUserId(), file.getOriginalFilename(), file.getInputStream());
//        user.setProfileImageUrl(imageUrl);
//        return userRepository.save(user);
//    }

    @Transactional
    public void deleteMemberInfo(User user) {
        // jwt 토큰 만료 처리는 어떻게 할지 추후에 고민해보기
        userRepository.delete(user);
        UserRefreshToken userToken = userRefreshTokenRepository.findByUserId(user.getUserId());
        userRefreshTokenRepository.delete(userToken);
    }

    private User createSignupFormOfUser(UserDto.post req) {
        LocalDateTime now = LocalDateTime.now();
        User user = User.builder()
                .userId(req.getUserId())
                .username(req.getUsername())
                .email(NoEmail)
                .password(passwordEncoder.encode(req.getPassword()))
                .providerType(ProviderType.LOCAL)
                .profileImageUrl("https://ifh.cc/g/B2fA6Y.png")
                .roleType(RoleType.USER)
//                .createdAt(now)
//                .modifiedAt(now)
                .build();
        return user;
    }
    @Transactional(readOnly = true)
    public List<BoardSimpleDto> findWrite(User user){
        List<Board> write = boardRepository.findAllByUserAndBoardStatus(user, Board.BoardStatus.BOARD_EXIST);
        List<BoardSimpleDto> boardSimpleDtoList = write.stream()
                .map(board -> new BoardSimpleDto().toDto(board))
                .collect(Collectors.toList());
        return boardSimpleDtoList;
    }

    @Transactional(readOnly = true)
    public List<CommentSimpleDto> findComment(User user){
        List<Comment> write = commentRepository.findAllByUser(user);
        List<CommentSimpleDto> commentSimpleDtoList = write.stream()
                .map(comment -> new CommentSimpleDto().toDto(comment))
                .collect(Collectors.toList());
        return commentSimpleDtoList;
    }

    @Transactional(readOnly = true)
    public List<BoardSimpleDto> findBookmark(User user) {
        List<Bookmark> bookmarks = bookmarkRepository.findAllByUser(user);
        List<BoardSimpleDto> boardSimpleDtoList = bookmarks.stream()
                .map(bookmark -> new BoardSimpleDto().toDto(bookmark.getBoard()))
                .collect(Collectors.toList());
        return boardSimpleDtoList;
    }
}