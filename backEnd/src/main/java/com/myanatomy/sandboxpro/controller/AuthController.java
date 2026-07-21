package com.myanatomy.sandboxpro.controller;

import com.myanatomy.sandboxpro.dto.request.LoginRequest;
import com.myanatomy.sandboxpro.dto.request.RegisterRequest;
import com.myanatomy.sandboxpro.dto.response.AuthResponse;
import com.myanatomy.sandboxpro.dto.response.UserResponse;
import com.myanatomy.sandboxpro.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(@Valid @RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
