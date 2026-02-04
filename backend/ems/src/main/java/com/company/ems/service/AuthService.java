package com.company.ems.service;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.company.ems.dto.LoginRequest;
import com.company.ems.model.User;
import com.company.ems.repository.UserRepository;
import com.company.ems.security.JwtUtil;


@Service
public class AuthService {
    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public Map<String, String> login(LoginRequest request) {
        
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        String role = user.getRole() == null ? "USER" : user.getRole();
        String token = jwtUtil.generateToken(
            user.getEmail(),
            Map.of("role", role)
        );


        return Map.of(
            "token", token,
            "email", user.getEmail(),
            "role", role
        );
    }
}
