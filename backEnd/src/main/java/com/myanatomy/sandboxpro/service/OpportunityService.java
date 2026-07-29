package com.myanatomy.sandboxpro.service;

import com.myanatomy.sandboxpro.entity.Application;
import com.myanatomy.sandboxpro.entity.Opportunity;
import com.myanatomy.sandboxpro.entity.User;
import com.myanatomy.sandboxpro.exception.ResourceNotFoundException;
import com.myanatomy.sandboxpro.repository.ApplicationRepository;
import com.myanatomy.sandboxpro.repository.OpportunityRepository;
import com.myanatomy.sandboxpro.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OpportunityService {

    private final OpportunityRepository opportunityRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public OpportunityService(
            OpportunityRepository opportunityRepository,
            ApplicationRepository applicationRepository,
            UserRepository userRepository
    ) {
        this.opportunityRepository = opportunityRepository;
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    public Opportunity createOpportunity(Long creatorId, Opportunity opportunity) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + creatorId));

        opportunity.setCreator(creator);
        return opportunityRepository.save(opportunity);
    }

    public List<Opportunity> getAllOpportunities() {
        return opportunityRepository.findAllByOrderByCreatedAtDesc();
    }

    public Application applyForOpportunity(Long applicantId, Long opportunityId, Application application) {
        User applicant = userRepository.findById(applicantId)
                .orElseThrow(() -> new ResourceNotFoundException("Applicant not found with id: " + applicantId));

        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + opportunityId));

        application.setApplicant(applicant);
        application.setOpportunity(opportunity);
        application.setStatus(Application.ApplicationStatus.APPLIED);

        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsForOpportunity(Long opportunityId) {
        return applicationRepository.findByOpportunityIdOrderByAppliedAtDesc(opportunityId);
    }

    public Application updateApplicationStatus(Long applicationId, Application.ApplicationStatus status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));

        application.setStatus(status);
        return applicationRepository.save(application);
    }
}
