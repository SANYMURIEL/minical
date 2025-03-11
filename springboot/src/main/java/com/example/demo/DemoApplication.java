package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@RestController
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Autorise toutes les URLs
                        .allowedOrigins("http://localhost:8081") // Autorise cette origine
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Autorise ces méthodes
                        .allowedHeaders("*"); // Autorise tous les en-têtes
            }
        };
    }

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}

	@PostMapping("/calculator")
	public String calculate(@RequestBody CalculationRequest request) {
		double num1 = request.getNum1();
		double num2 = request.getNum2();
		String operation = request.getOperation();

		double result = 0;

		switch (operation) {
			case "+":
				result = num1 + num2;
				break;
			case "-":
				result = num1 - num2;
				break;
			case "*":
				result = num1 * num2;
				break;
			case "/":
				if (num2 == 0) {
					return "Division par zéro impossible";
				} else {
					result = num1 / num2;
				}
				break;
			default:
				return "Opération non reconnue";
		}

		return String.valueOf(result);
	}
}

class CalculationRequest {
	private double num1;
	private double num2;
	private String operation;

	public double getNum1() {
		return num1;
	}

	public void setNum1(double num1) {
		this.num1 = num1;
	}

	public double getNum2() {
		return num2;
	}

	public void setNum2(double num2) {
		this.num2 = num2;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}
}