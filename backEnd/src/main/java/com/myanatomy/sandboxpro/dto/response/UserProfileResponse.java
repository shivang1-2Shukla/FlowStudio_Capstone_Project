package com.myanatomy.sandboxpro.dto.response;

import com.myanatomy.sandboxpro.entity.UserProfile;

public class UserProfileResponse {

    private Long id;
    private Long userId;
    private String bio;
    private String skills;
    private String location;
    private String creativeField;
    private String availability;
    private String profilePicture;

    public UserProfileResponse() {
    }

    public UserProfileResponse(Long id, Long userId, String bio, String skills, String location, String creativeField, String availability, String profilePicture) {
        this.id = id;
        this.userId = userId;
        this.bio = bio;
        this.skills = skills;
        this.location = location;
        this.creativeField = creativeField;
        this.availability = availability;
        this.profilePicture = profilePicture;
    }

    public static UserProfileResponse fromEntity(UserProfile profile) {
        if (profile == null) {
            return null;
        }
        Long uId = null;
        if (profile.getUser() != null) {
            uId = profile.getUser().getId();
        }
        return new UserProfileResponse(
                profile.getId(),
                uId,
                profile.getBio(),
                profile.getSkills(),
                profile.getLocation(),
                profile.getCreativeField(),
                profile.getAvailability(),
                profile.getProfilePicture()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCreativeField() {
        return creativeField;
    }

    public void setCreativeField(String creativeField) {
        this.creativeField = creativeField;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
