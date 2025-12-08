package com.demo.hybridsearch.search.Controller;


import com.demo.hybridsearch.search.DTO.SearchDto;
import com.demo.hybridsearch.search.DTO.UserQueryDto;
import com.demo.hybridsearch.search.Service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class SearchController {
    private final SearchService searchService;

    @PostMapping ("/api/search")
    public ResponseEntity<?> getQuery(@RequestBody SearchDto searchDto) {
        return searchService.allSearch(searchDto);
    }

}
