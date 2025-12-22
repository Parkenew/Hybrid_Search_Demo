package com.demo.hybridsearch.search.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SearchDto {
    // ES에 검색할때 사용하기 위한 DTO
    private String query;
    private List<Float> vector;
}
