package com.myanatomy.sandboxpro.dto.request;

import com.myanatomy.sandboxpro.entity.Role;
import jakarta.validation.constraints.NotBlank;

public class UpdateUserRequest {

    @NotBlank(message = "Name is required")
    private String name;

    private Role role;

    public UpdateUserRequest() {
    }

    public UpdateUserRequest(String name, Role role) {
        this.name = name;
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
