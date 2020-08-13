package com.unithis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.unithis.config.FileUploadConfig;

@SpringBootApplication
public class UnithisApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnithisApplication.class, args);
	}

}
 