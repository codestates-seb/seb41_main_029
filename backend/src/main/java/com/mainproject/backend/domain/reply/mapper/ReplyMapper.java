package com.mainproject.backend.domain.reply.mapper;

import com.mainproject.backend.domain.reply.dto.CommentReplyDto;
import com.mainproject.backend.domain.reply.entity.Reply;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReplyMapper {




    default CommentReplyDto.ReplyResponse replyToReplyResponse(Reply reply){
        CommentReplyDto.ReplyResponse replyResponse = new CommentReplyDto.ReplyResponse();

        replyResponse.setReplySeq(reply.getReplySeq());
        replyResponse.setUsername(reply.getUser().getUsername());
        replyResponse.setUserSeq(reply.getUser().getUserSeq());
        replyResponse.setCommentSeq(reply.getComment().getCommentSeq());
        replyResponse.setContent(reply.getContent());
        replyResponse.setCreatedAt(reply.getCreatedAt());
        replyResponse.setModifiedAt(reply.getModifiedAt());

        return replyResponse;
    }
}
