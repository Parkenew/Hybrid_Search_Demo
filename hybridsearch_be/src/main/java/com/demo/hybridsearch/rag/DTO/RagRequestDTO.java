package com.demo.hybridsearch.rag.DTO;

import com.demo.hybridsearch.search.DTO.SearchResultDto;
import lombok.Data;

import java.util.List;

@Data
public class RagRequestDTO {
    private String query;
    private String order;
    private List<SearchResultDto> results;
}
