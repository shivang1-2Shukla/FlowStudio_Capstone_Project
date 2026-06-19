package com.myanatomy.sandboxpro.service;

import com.myanatomy.sandboxpro.dto.request.LoginRequest;
import com.myanatomy.sandboxpro.dto.request.RegisterRequest;
import com.myanatomy.sandboxpro.dto.request.UpdateUserRequest;
import com.myanatomy.sandboxpro.dto.request.UpdateProfileRequest;
import com.myanatomy.sandboxpro.dto.response.AuthResponse;
import com.myanatomy.sandboxpro.dto.response.UserResponse;
import com.myanatomy.sandboxpro.dto.response.UserProfileResponse;
import com.myanatomy.sandboxpro.entity.User;
import com.myanatomy.sandboxpro.entity.UserProfile;
import com.myanatomy.sandboxpro.repository.UserRepository;
import com.myanatomy.sandboxpro.repository.UserProfileRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            UserProfileRepository userProfileRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        User savedUser = userRepository.save(user);

        UserProfile profile = new UserProfile();
        profile.setUser(savedUser);
        userProfileRepository.save(profile);

        return UserResponse.fromEntity(savedUser);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public AuthResponse login(LoginRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (user.isPresent() && passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            return new AuthResponse(null, UserResponse.fromEntity(user.get()));
        }

        return null;
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserResponse.fromEntity(user);
    }

    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(request.getName());
        existingUser.setRole(request.getRole());

        User savedUser = userRepository.save(existingUser);
        return UserResponse.fromEntity(savedUser);
    }

    public UserProfileResponse getUserProfile(Long userId) {
        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        return UserProfileResponse.fromEntity(profile);
    }

    public UserProfileResponse updateUserProfile(Long userId, UpdateProfileRequest request) {
        UserProfile existingProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        existingProfile.setBio(request.getBio());
        existingProfile.setSkills(request.getSkills());
        existingProfile.setLocation(request.getLocation());
        existingProfile.setCreativeField(request.getCreativeField());
        existingProfile.setAvailability(request.getAvailability());
        existingProfile.setProfilePicture(request.getProfilePicture());

        UserProfile savedProfile = userProfileRepository.save(existingProfile);
        return UserProfileResponse.fromEntity(savedProfile);
    }
}
