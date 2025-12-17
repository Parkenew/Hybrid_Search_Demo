package com.demo.hybridsearch.elasticsearch.Config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.transport.TransportUtils;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.net.ssl.SSLContext;
import java.io.IOException;
import java.io.InputStream;


@Configuration
public class ElasticsearchConfig {

    @Value("${elasticsearch.host}")
    private String esHost;

    @Value("${elasticsearch.apiKey}")
    private String esApiKey;

    @Bean
    public ElasticsearchClient elasticsearchClient() throws IOException {
        ClassPathResource resource = new ClassPathResource("certs/http_ca.crt");
        InputStream caInputStream = resource.getInputStream();
        SSLContext sslContext = TransportUtils.sslContextFromHttpCaCrt(caInputStream);

        return ElasticsearchClient.of(b -> b
                .host(esHost)
                .apiKey(esApiKey)
                .sslContext(sslContext)
        );
    }

}
