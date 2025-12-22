package com.demo.hybridsearch.search.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchResultDto {

    /*ES 검색 결과 객체*/
    private String type;  // keyword, vector, hybrid
    private double took; // ES 응답 시간
    private List<NewsReturnDto> result; // ES template 결과 전체

}