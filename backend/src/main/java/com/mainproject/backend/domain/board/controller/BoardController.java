package com.mainproject.backend.domain.board.controller;

import com.mainproject.backend.domain.board.dto.BoardDto;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/boards")
@Validated
public class BoardController {

    //질문 등록
    @PostMapping
    public String postBoard(@RequestBody BoardDto.BoardPostDto boardDto){
        return "HI";
    }

}
