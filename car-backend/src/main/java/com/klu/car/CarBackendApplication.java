package com.klu.car;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class CarBackendApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(CarBackendApplication.class, args);
		System.out.println("backend running");
	}

}
