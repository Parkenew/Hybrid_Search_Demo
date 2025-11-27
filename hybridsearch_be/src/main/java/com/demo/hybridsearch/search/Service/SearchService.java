package com.demo.hybridsearch.search.Service;

import com.demo.hybridsearch.search.DTO.UserQueryDto;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class SearchService {

    /*** 공통 로직 ***/
    public ResponseEntity<?> allSearch(UserQueryDto userQueryDto) {
        if (userQueryDto.getQuery().isEmpty()) {
            return ResponseEntity.badRequest().body("검색어를 입력해주세요.");
        } else {
            return null;

        }
    }

    /***키워드 검색***/
    public void keywordSearch(String query) {

    }

    /*** 벡터 검색 ****/
    public void vectorSearch(List<Float> vector) {

    }

    /*** 하이브리드 검색 ***/
    public void hybridSearch(String query, List<Float> vector) {
    }

}
