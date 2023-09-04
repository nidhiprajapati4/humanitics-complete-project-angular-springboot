package com.example.humanitics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication

public class HumaniticsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HumaniticsApplication.class, args);
	}

}
