package com.ronilsonalves.bancodesangue.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Banco de Sangue API")
                        .description("Back-end API for Banco de Sangue services")
                        .version("1")
                        .contact(new Contact().name("Ronilson Alves").email("falecom@ronilsonalves.com").url("https://github.com/ronilsonalves/blood-donation"))
                        .license(new License().name("Apache 2.0").url("https://springdoc.org")));
    }

    @Bean
    public GroupedOpenApi donorsAPI() {
        return GroupedOpenApi.builder()
                .group("Donors")
                .displayName("Donors API")
                .pathsToMatch("/candidatos/**")
                .build();
    }
}
