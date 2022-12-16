package com.ronilsonalves.bancodesangue;

import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignAutoConfiguration;

@SpringBootApplication
@EnableFeignClients
//@ImportAutoConfiguration(classes = FeignAutoConfiguration.class)
@ImportAutoConfiguration({FeignAutoConfiguration.class})
public class BloodDonationApplication {

	public static void main(String[] args) {
		org.springframework.boot.SpringApplication.run(BloodDonationApplication.class, args);
	}

}
