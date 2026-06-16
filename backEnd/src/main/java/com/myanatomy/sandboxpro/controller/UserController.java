package com.myanatomy.sandboxpro.controller;

import com.myanatomy.sandboxpro.dto.LoginRequest;
import com.myanatomy.sandboxpro.model.User;
import com.myanatomy.sandboxpro.service.UserService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService){
        this.userService = userService;
    }


    @PostMapping("/register")
    public User register(@Valid @RequestBody User user){
        return userService.registerUser(user);
    }

    @GetMapping("/test")
    public String test() {
        return "Version 1";
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest loginRequest) {

        return userService.login(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user
    ) {
        return userService.updateUser(id, user);
    }

}