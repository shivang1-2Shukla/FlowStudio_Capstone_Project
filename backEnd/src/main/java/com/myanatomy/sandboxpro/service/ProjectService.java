package com.myanatomy.sandboxpro.service;

import com.myanatomy.sandboxpro.dto.request.ProjectRequest;
import com.myanatomy.sandboxpro.dto.response.ProjectResponse;
import com.myanatomy.sandboxpro.entity.Project;
import com.myanatomy.sandboxpro.entity.User;
import com.myanatomy.sandboxpro.exception.ResourceNotFoundException;
import com.myanatomy.sandboxpro.repository.ProjectRepository;
import com.myanatomy.sandboxpro.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public ProjectResponse createProject(Long userId, ProjectRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Project project = new Project();
        project.setUser(user);
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setHtmlCode(request.getHtmlCode());
        project.setCssCode(request.getCssCode());
        project.setJsCode(request.getJsCode());
        project.setLanguage(request.getLanguage());

        Project saved = projectRepository.save(project);
        return ProjectResponse.fromEntity(saved);
    }

    public List<ProjectResponse> getProjectsByUserId(Long userId) {
        return projectRepository.findByUserIdOrderByUpdatedAtDesc(userId)
                .stream()
                .map(ProjectResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public ProjectResponse getProjectById(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));
        return ProjectResponse.fromEntity(project);
    }

    public ProjectResponse updateProject(Long projectId, ProjectRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setHtmlCode(request.getHtmlCode());
        project.setCssCode(request.getCssCode());
        project.setJsCode(request.getJsCode());
        project.setLanguage(request.getLanguage());

        Project saved = projectRepository.save(project);
        return ProjectResponse.fromEntity(saved);
    }

    public void deleteProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));
        projectRepository.delete(project);
    }
}
