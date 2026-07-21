package com.myanatomy.sandboxpro.dto.request;

public class UpdateProfileRequest {

    private String bio;
    private String skills;
    private String location;
    private String creativeField;
    private String availability;
    private String profilePicture;

    public UpdateProfileRequest() {
    }

    public UpdateProfileRequest(String bio, String skills, String location, String creativeField, String availability, String profilePicture) {
        this.bio = bio;
        this.skills = skills;
        this.location = location;
        this.creativeField = creativeField;
        this.availability = availability;
        this.profilePicture = profilePicture;
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
