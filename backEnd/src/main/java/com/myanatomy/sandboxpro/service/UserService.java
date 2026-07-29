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
import com.myanatomy.sandboxpro.exception.BadRequestException;
import com.myanatomy.sandboxpro.exception.ResourceNotFoundException;
import com.myanatomy.sandboxpro.exception.UnauthorizedException;
import com.myanatomy.sandboxpro.repository.UserRepository;
import com.myanatomy.sandboxpro.repository.UserProfileRepository;
import com.myanatomy.sandboxpro.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public UserService(
            UserRepository userRepository,
            UserProfileRepository userProfileRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider
    ) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public UserResponse registerUser(RegisterRequest request) {
        String email = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";
        if (userRepository.findByEmail(email).isPresent()) {
            throw new BadRequestException("An account with email (" + email + ") already exists. Please sign in.");
        }

        User user = new User();
        user.setName(request.getName() != null ? request.getName().trim() : "User");
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword() != null ? request.getPassword() : "123456"));
        user.setRole(request.getRole() != null ? request.getRole() : Role.USER);

        User savedUser = userRepository.save(user);

        try {
            UserProfile profile = new UserProfile();
            profile.setUser(savedUser);
            if (request.getRole() != null) {
                profile.setCreativeField(request.getRole().name());
            }
            userProfileRepository.save(profile);
        } catch (Exception ex) {
            // Profile creation fallback
        }

        return UserResponse.fromEntity(savedUser);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        String token = tokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole().name());
        return new AuthResponse(token, UserResponse.fromEntity(user));
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserResponse.fromEntity(user);
    }

    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        existingUser.setName(request.getName());
        existingUser.setRole(request.getRole());

        User savedUser = userRepository.save(existingUser);
        return UserResponse.fromEntity(savedUser);
    }

    public UserProfileResponse getUserProfile(Long userId) {
        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found for userId: " + userId));
        return UserProfileResponse.fromEntity(profile);
    }

    public UserProfileResponse updateUserProfile(Long userId, UpdateProfileRequest request) {
        UserProfile existingProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found for userId: " + userId));

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