package com.demo.hybridsearch.search.Service;

import co.elastic.clients.elasticsearch.core.SearchTemplateResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.json.JsonData;
import com.demo.hybridsearch.elasticsearch.service.ElasticsearchService;
import com.demo.hybridsearch.search.DTO.*;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class SearchService {
    private final EmbeddingService embeddingService;
    private final ElasticsearchService elasticsearchService;

    public static String keywordTemplateId = "news_keyword_search";
    public static String vectorTemplateId = "news_vector_search";
    public static String index="naver_news_total";

    // 전체 검색
    public ResponseEntity<?> allSearch(SearchDto searchDto) {
        if (searchDto.getQuery().isEmpty()) {
            return ResponseEntity.badRequest().body("검색어를 입력해주세요.");
        } else {
            // 임베딩 서비스 호출
            //SearchDto embedded = embeddingService.getEmbeddingRequest(userQueryDto);

            // 키워드, 벡터검색 수행
            SearchResultDto keyword = keywordSearch(searchDto.getQuery());
            SearchResultDto vector = vectorSearch(searchDto.getVector());
            // SearchResultDto hybrid = hybridSearch(embedded.getQuery(), embedded.getVector());

            // 결과 조합
            List<SearchResultDto> list= new ArrayList<>();
            list.add(keyword);
            list.add(vector);
            // list.add(hybrid);

            return ResponseEntity.ok(list);
        }
    }

    //키워드 검색
    public SearchResultDto keywordSearch(String query) {
        SearchTemplateResponse<NewsIndexDto> response =
                elasticsearchService.getElasticData(keywordTemplateId, index,
                        Map.of("query", JsonData.of(query)));
        List<NewsReturnDto> resultList = parse(response);
        return new SearchResultDto("keyword", response.took(),resultList);
    }

    // 벡터 검색
    public SearchResultDto vectorSearch(List<Float> vector) {
        SearchTemplateResponse<NewsIndexDto> response =
                elasticsearchService.getElasticData(vectorTemplateId, index,
                        Map.of("vector", JsonData.of(vector.toString())));
        List<NewsReturnDto> resultList = parse(response);

        return new SearchResultDto("vector", response.took(),resultList);
    }

    // 공통 로직
    public List<NewsReturnDto> parse(SearchTemplateResponse<NewsIndexDto> response){
        List<Hit<NewsIndexDto>> hits= response.hits().hits();
        List<NewsReturnDto> finalResults = new ArrayList<>();
        for(Hit<NewsIndexDto> hit : hits){
            NewsReturnDto newsReturnDto = new NewsReturnDto();
            //ES 응답에서 가져오기
            newsReturnDto.setId(hit.id());
            newsReturnDto.setScore(hit.score());
            newsReturnDto.setSource(hit.source());
            newsReturnDto.setHighlight(hit.highlight());

            finalResults.add(newsReturnDto);

            log.info("id: {}",newsReturnDto.getId());
            log.info("score: {}",newsReturnDto.getScore());
            log.info("source: {}",newsReturnDto.getSource());
            log.info("highlight: {}",newsReturnDto.getHighlight());
        }
        return finalResults;
    }

}