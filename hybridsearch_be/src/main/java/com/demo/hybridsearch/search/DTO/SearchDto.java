package com.demo.hybridsearch.search.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SearchDto {
    private String query;
    private List<Float> vector;
}
