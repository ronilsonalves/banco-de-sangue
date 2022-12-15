package com.ronilsonalves.bancodesangue.api.client;

import com.ronilsonalves.bancodesangue.config.JsonLoaderClientConfig;
import com.ronilsonalves.bancodesangue.data.model.JsonLoaderResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(value = "${app.feign.client.config.name}", url = "${app.feign.client.config.url}", configuration = JsonLoaderClientConfig.class)
public interface JsonLoaderClient {
    @RequestMapping(method = RequestMethod.GET)
    List<JsonLoaderResponse> loadJsonData();

}
