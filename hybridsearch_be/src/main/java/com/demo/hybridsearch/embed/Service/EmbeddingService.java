package com.demo.hybridsearch.embed.Service;

import com.demo.hybridsearch.embed.DTO.EmbeddingResultDto;
import com.demo.hybridsearch.search.DTO.SearchDto;
import com.demo.hybridsearch.search.DTO.UserQueryDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmbeddingService {

    private final RestTemplate restTemplate;

    // application.yml 에서 관리
    @Value("${embedding.host}")
    private String embeddingHost;

    // 사용자 검색 요청시 임베딩 서버에 임베딩 요청하는 서비스
    public SearchDto getEmbeddingRequest(UserQueryDto userQueryDto) {

        // http 요청
        Map<String, Object> body = new HashMap<>();
        body.put("text", userQueryDto.getQuery());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String,Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<EmbeddingResultDto> response =
                restTemplate.postForEntity(
                        embeddingHost,
                        entity,
                        EmbeddingResultDto.class
                );

        // search API를 위한 객체 생성
        SearchDto searchDto = new SearchDto();
        searchDto.setQuery(userQueryDto.getQuery());
        searchDto.setVector(response.getBody().getVector());
        log.info(searchDto.toString());
        return searchDto;
    }

}
