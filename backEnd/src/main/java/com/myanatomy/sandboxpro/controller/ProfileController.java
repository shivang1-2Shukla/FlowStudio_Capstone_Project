package com.myanatomy.sandboxpro.controller;

import com.myanatomy.sandboxpro.dto.request.UpdateProfileRequest;
import com.myanatomy.sandboxpro.dto.response.UserProfileResponse;
import com.myanatomy.sandboxpro.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin("*")
public class ProfileController {

    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public UserProfileResponse getUserProfile(@PathVariable Long userId) {
        return userService.getUserProfile(userId);
    }

    @PutMapping("/{userId}")
    public UserProfileResponse updateProfile(
            @PathVariable Long userId,
            @RequestBody UpdateProfileRequest request
    ) {
        return userService.updateUserProfile(userId, request);
    }
}
