package com.mainproject.backend.domain.users.service;

import com.mainproject.backend.domain.board.dto.BoardSimpleDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.board.entity.Bookmark;
import com.mainproject.backend.domain.board.repositoty.BoardRepository;
import com.mainproject.backend.domain.board.repositoty.BookmarkRepository;
import com.mainproject.backend.domain.comment.entity.Comment;
import com.mainproject.backend.domain.comment.repository.CommentRepository;
import com.mainproject.backend.domain.users.dto.UserDto;
import com.mainproject.backend.domain.users.entity.User;
import com.mainproject.backend.domain.users.repository.UserRepository;
import com.mainproject.backend.global.auth.entity.ProviderType;
import com.mainproject.backend.global.auth.entity.RoleType;
import com.mainproject.backend.global.exception.BusinessLogicException;
import com.mainproject.backend.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BookmarkRepository bookmarkRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final String NoEmail = "NO Email";

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }

    public User createUser(UserDto.post req) {
        User user = createSignupFormOfUser(req);
        userRepository.save(user);

        return userRepository.saveAndFlush(user);
    }

    public User updateUser(String userId) {
        return userRepository.findByUserId(userId);
    }

    @Transactional
    public User editMemberInfo(User user, UserDto.Patch req) {
//        LocalDateTime now = LocalDateTime.now();
//        user.setModifiedAt(now);
        user.editUser(req);
        return userRepository.save(user);
    }

    @Transactional
    public void deleteMemberInfo(User user) {
        // jwt 토큰 만료 처리는 어떻게 할지 추후에 고민해보기
        userRepository.delete(user);
    }

    private User createSignupFormOfUser(UserDto.post req) {
        LocalDateTime now = LocalDateTime.now();
        User user = User.builder()
                .userId(req.getUserId())
                .username(req.getUsername())
                .email(NoEmail)
                .password(passwordEncoder.encode(req.getPassword()))
                .providerType(ProviderType.LOCAL)
                .profileImageUrl("https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png")
                .roleType(RoleType.USER)
                .createdAt(now)
                .modifiedAt(now)
                .build();
        return user;
    }
    @Transactional(readOnly = true)
    public List<BoardSimpleDto> findWrite(User user){
        List<Board> write = boardRepository.findAllByUser(user);
        List<BoardSimpleDto> boardSimpleDtoList = write.stream()
                .map(board -> new BoardSimpleDto().toDto(board))
                .collect(Collectors.toList());
        return boardSimpleDtoList;
    }

//    @Transactional(readOnly = true)
//    public List<BoardSimpleDto> findComment(User user){
//        List<Comment> write = commentRepository.findAllByUser(user);
//        List<BoardSimpleDto> boardSimpleDtoList = write.stream()
//                .map(board -> new BoardSimpleDto().toDto(board))
//                .collect(Collectors.toList());
//        return boardSimpleDtoList;
//    }

    @Transactional(readOnly = true)
    public List<BoardSimpleDto> findBookmark(User user) {
        List<Bookmark> bookmarks = bookmarkRepository.findAllByUser(user);
        List<BoardSimpleDto> boardSimpleDtoList = bookmarks.stream()
                .map(bookmark -> new BoardSimpleDto().toDto(bookmark.getBoard()))
                .collect(Collectors.toList());
        return boardSimpleDtoList;
    }
}