package com.demo.hybridsearch.rag.Service;

import com.demo.hybridsearch.rag.DTO.RagRequestDTO;
import com.demo.hybridsearch.search.DTO.NewsReturnDto;
import com.demo.hybridsearch.search.DTO.SearchDto;
import com.demo.hybridsearch.search.DTO.SearchResultDto;
import com.demo.hybridsearch.search.DTO.UserQueryDto;
import com.demo.hybridsearch.search.Service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class RagService {

    @Value("${llm.host}")
    private String llmHost;

    private final WebClient webClient = WebClient.builder().build();
    private final SearchService searchService;
    private static final Pattern CONTENT_PATTERN = Pattern.compile("\"content\"\\s*:\\s*\"(.*?)\"", Pattern.DOTALL);


    /************************************** 메인 함수 **************************************/
    // 기존 RAG 함수: Stream 형식으로 응답 반환
    public Flux<String> getLLMStream(RagRequestDTO dto) {
        Map<String, Object> requestBody = RAGPrompt(dto);

        return webClient.post()
                .uri(llmHost)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.TEXT_EVENT_STREAM)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToFlux(String.class)
                .flatMap(this::extractContent)     // delta.content만 추출
                .doOnNext(c -> log.info("📝 SEND PLAIN → {}", c))
                .map(c -> c);
    }

    // 리팩토링 중: 자연어로 질문 받았을때
    public void getNaturalLanguage (UserQueryDto userQueryDto) {
        Map<String, Object>  requestBody=queryToDSLPrompt(userQueryDto);
        List<SearchResultDto> List=searchService.allSearch(userQueryDto);
    }

    /************************************** 프롬프트 세팅 **************************************/
    // 사용자 요청을 queryDSL로 변환하는 프롬프트
    private Map<String,Object> queryToDSLPrompt(UserQueryDto userQueryDto) {
        String NL=userQueryDto.getQuery();
        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", "당신은 RAG를 수행하는 어시스턴트입니다."));
        messages.add(Map.of("role", "system", "content","ES에 검색할 수 있게 사용자의 요청을 분석해서 자연어를 ES에 던질 문장으로 바꿔"));
        messages.add(Map.of("role", "user", "content", NL));
        return setRequestBody(messages,false);
    }

    // RAG를 위한 ES 검색 결과 전달 및 프롬프트
    private Map<String, Object> RAGPrompt(RagRequestDTO dto) {
        String prompt = buildPrompt(dto);
        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", "당신은 RAG를 수행하는 어시스턴트입니다."));
        messages.add(Map.of("role", "system", "content",
                "사용자는 벡터 검색, 키워드 검색 결과와 검색어 그리고 요청사항을 제공합니다. " +
                        "당신은 사용자가 준 문서를 근거로 요청사항을 해결해야 합니다. " +
                        "키워드 검색과 벡터 검색의 차이도 분석하십시오. 표는 사용하지 마시오. 간략하게 대답하시오."));
        messages.add(Map.of("role", "user", "content", prompt));
       return setRequestBody(messages,true);
    }


    /************************************** RequestBody 세팅 **************************************/
    private Map<String,Object> setRequestBody(List<?> messages,boolean flag){
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "openai/gpt-oss-120b");
        requestBody.put("max_tokens", 10000);
        requestBody.put("temperature", 0.3);
        requestBody.put("include_reasoning", true);
        requestBody.put("reasoning", Map.of("effort", "low"));
        requestBody.put("stream", flag);
        requestBody.put("messages", messages);
        return requestBody;
    }

    // GPT Stream 응답에서 content 값 추출
    private Flux<String> extractContent(String chunk) {

        Matcher matcher = CONTENT_PATTERN.matcher(chunk);
        List<String> list = new ArrayList<>();

        while (matcher.find()) {
            String content = matcher.group(1);
            if (content != null && !content.isBlank()) {
                list.add(content);
            }
        }

        return Flux.fromIterable(list);
    }
    // ES 결과 => String 으로 변환
    private String buildPrompt(RagRequestDTO dto) {
        StringBuilder sb = new StringBuilder();

        sb.append("사용자가 처음 검색한 검색어는 ").append(dto.getQuery()).append("입니다.\n");
        sb.append("요청: ").append(dto.getOrder()).append("\n");
        sb.append("아래 문서를 참고하여 답변하시오.\n\n");

        for (SearchResultDto each : dto.getResults()) {

            sb.append("=== ").append(each.getType()).append(" 검색 결과 ===\n");

            if (each.getResult() == null || each.getResult().isEmpty()) {
                sb.append("결과 없음\n");
                continue;
            }

            for (int i = 0; i < 5; i++) {
                NewsReturnDto doc = each.getResult().get(i);

                sb.append(each.getType()).append("-").append(i + 1).append(": ")
                        .append("제목: ").append(doc.getSource().getTitle()).append("\n")
                        .append("본문: ").append(doc.getSource().getDescription()).append("\n\n");
            }
        }

        return sb.toString();
    }
}
