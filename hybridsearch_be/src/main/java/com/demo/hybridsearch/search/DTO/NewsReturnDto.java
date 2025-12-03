package com.demo.hybridsearch.search.DTO;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class NewsReturnDto {
    private String id;
    private Double score;
    private NewsIndexDto source;
    private Map<String, List<String>> highlight;
}
