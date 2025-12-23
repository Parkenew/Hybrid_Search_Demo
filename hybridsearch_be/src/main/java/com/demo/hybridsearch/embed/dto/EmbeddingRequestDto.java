package com.demo.hybridsearch.embed.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddingRequestDto {
    private String qa_id;
    private String question;
    private String answer;
    private String department;
}
