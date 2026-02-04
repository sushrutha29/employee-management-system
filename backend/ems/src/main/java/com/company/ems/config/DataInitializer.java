package com.company.ems.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.company.ems.model.User;
import com.company.ems.repository.UserRepository;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedDefaultUser(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User user = new User();
                user.setEmail("admin@ems.com");
                user.setPassword("admin123");
                user.setRole("ADMIN");
                userRepository.save(user);
            }
        };
    }
}
