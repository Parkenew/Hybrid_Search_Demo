package com.demo.hybridsearch.elasticsearch.service;


import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchTemplateRequest;
import co.elastic.clients.elasticsearch.core.SearchTemplateResponse;
import co.elastic.clients.json.JsonData;
import com.demo.hybridsearch.search.DTO.NewsIndexDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class ElasticsearchService {
    private final ElasticsearchClient elasticsearchClient;

    public SearchTemplateResponse<NewsIndexDto> getElasticData(String templateId, String index, Map<String, JsonData> params) {
        try {
            SearchTemplateRequest request = SearchTemplateRequest.of(r -> {
                r.id(templateId);
                r.index(index);
                params.forEach(r::params);
                return r;
            });

            SearchTemplateResponse<NewsIndexDto> response = elasticsearchClient.searchTemplate(request, NewsIndexDto.class);
            return response;

        } catch (Exception e) {
            log.error("ES template execution failed ({}): {}", templateId, e.getMessage());
            throw new RuntimeException("Elasticsearch search failed", e);
        }
    }
}
