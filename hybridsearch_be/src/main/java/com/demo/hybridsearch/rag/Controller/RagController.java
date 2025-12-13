package com.demo.hybridsearch.rag.Controller;

import com.demo.hybridsearch.rag.DTO.RagRequestDTO;
import com.demo.hybridsearch.rag.Service.RagService;
import com.demo.hybridsearch.search.DTO.SearchDto;
import com.demo.hybridsearch.search.DTO.SearchResultDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RagController {

    private final RagService ragService;

    @PostMapping(
            value = "/api/rag",
            produces = MediaType.TEXT_EVENT_STREAM_VALUE
    )
    public Flux<String> ragStream(@RequestBody RagRequestDTO dto) {
        return ragService.getLLMStream(dto);
    }


}
