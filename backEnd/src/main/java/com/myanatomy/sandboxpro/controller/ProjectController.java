package com.myanatomy.sandboxpro.controller;

import com.myanatomy.sandboxpro.dto.request.ProjectRequest;
import com.myanatomy.sandboxpro.dto.response.ProjectResponse;
import com.myanatomy.sandboxpro.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/user/{userId}")
    public ProjectResponse createProject(
            @PathVariable Long userId,
            @Valid @RequestBody ProjectRequest request
    ) {
        return projectService.createProject(userId, request);
    }

    @GetMapping("/user/{userId}")
    public List<ProjectResponse> getProjectsByUser(@PathVariable Long userId) {
        return projectService.getProjectsByUserId(userId);
    }

    @GetMapping("/{projectId}")
    public ProjectResponse getProjectById(@PathVariable Long projectId) {
        return projectService.getProjectById(projectId);
    }

    @PutMapping("/{projectId}")
    public ProjectResponse updateProject(
            @PathVariable Long projectId,
            @Valid @RequestBody ProjectRequest request
    ) {
        return projectService.updateProject(projectId, request);
    }

    @DeleteMapping("/{projectId}")
    public void deleteProject(@PathVariable Long projectId) {
        projectService.deleteProject(projectId);
    }
}
