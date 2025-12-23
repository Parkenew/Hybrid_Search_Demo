package com.demo.hybridsearch.embed.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmbeddingResultDto {
    private List<Float> vector;
}

