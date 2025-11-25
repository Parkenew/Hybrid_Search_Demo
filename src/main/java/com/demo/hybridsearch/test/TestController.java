package com.demo.hybridsearch.test;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final ElasticsearchClient client;

    public TestController(ElasticsearchClient client) {
        this.client = client;
    }

    //샘플 api
    @GetMapping("/es-info")
    public String info() throws Exception {
        var info = client.info();
        return info.clusterName() + " | " + info.version().number();
    }
}
