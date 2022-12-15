package com.ronilsonalves.bancodesangue.config;

import okhttp3.OkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JsonLoaderClientConfig {
    @Bean
    public OkHttpClient client() {
        return new OkHttpClient();
    }
}
