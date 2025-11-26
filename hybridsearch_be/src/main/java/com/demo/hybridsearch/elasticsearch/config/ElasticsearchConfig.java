package com.demo.hybridsearch.elasticsearch.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.transport.TransportUtils;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.net.ssl.SSLContext;
import java.io.File;
import java.io.IOException;


@Configuration
public class ElasticsearchConfig {

    @Value("${elasticsearch.host}")
    private String esHost;

    @Value("${elasticsearch.apiKey}")
    private String esApiKey;

    @Value("${elasticsearch.ca.path}")
    private String esCertPath;


    @Bean
    public ElasticsearchClient elasticsearchClient() throws IOException {
        File esCertFile = new ClassPathResource(esCertPath).getFile();
        SSLContext sslContext = TransportUtils.sslContextFromHttpCaCrt(esCertFile);

        return ElasticsearchClient.of(b -> b
                .host(esHost)
                .apiKey(esApiKey)
                .sslContext(sslContext)
        );
    }

}
