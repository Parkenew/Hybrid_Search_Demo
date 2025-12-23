package com.demo.hybridsearch.embed.Controller;

import com.demo.hybridsearch.search.DTO.SearchDto;
import com.demo.hybridsearch.search.DTO.UserQueryDto;
import com.demo.hybridsearch.embed.Service.EmbeddingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EmbeddingController {

    private final EmbeddingService embeddingService;

    @PostMapping("api/embed")
    public ResponseEntity<?> embed(@RequestBody UserQueryDto userQueryDto) {
        if (userQueryDto.getQuery().isEmpty()) {
            return ResponseEntity.badRequest().body("검색어를 입력해주세요.");
        } else {
            SearchDto searchDto= embeddingService.getEmbeddingRequest(userQueryDto);
            return ResponseEntity.ok().body(searchDto);
        }
    }

}
