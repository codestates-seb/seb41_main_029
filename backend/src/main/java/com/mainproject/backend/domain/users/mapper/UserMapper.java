package com.mainproject.backend.domain.users.mapper;

import com.mainproject.backend.domain.users.dto.UserDto;
import com.mainproject.backend.domain.users.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Service;

@Service
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    User userPostToUser(UserDto.post requestBody);
    UserDto.Response userToUserResponse(User user);


}
