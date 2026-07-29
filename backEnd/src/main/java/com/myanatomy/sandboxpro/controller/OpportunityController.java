package com.myanatomy.sandboxpro.controller;

import com.myanatomy.sandboxpro.entity.Application;
import com.myanatomy.sandboxpro.entity.Opportunity;
import com.myanatomy.sandboxpro.service.OpportunityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
@CrossOrigin("*")
public class OpportunityController {

    private final OpportunityService opportunityService;

    public OpportunityController(OpportunityService opportunityService) {
        this.opportunityService = opportunityService;
    }

    @PostMapping("/creator/{creatorId}")
    public Opportunity createOpportunity(
            @PathVariable Long creatorId,
            @RequestBody Opportunity opportunity
    ) {
        return opportunityService.createOpportunity(creatorId, opportunity);
    }

    @GetMapping
    public List<Opportunity> getAllOpportunities() {
        return opportunityService.getAllOpportunities();
    }

    @PostMapping("/{opportunityId}/apply/user/{applicantId}")
    public Application applyForOpportunity(
            @PathVariable Long opportunityId,
            @PathVariable Long applicantId,
            @RequestBody Application application
    ) {
        return opportunityService.applyForOpportunity(applicantId, opportunityId, application);
    }

    @GetMapping("/{opportunityId}/applications")
    public List<Application> getApplicationsForOpportunity(@PathVariable Long opportunityId) {
        return opportunityService.getApplicationsForOpportunity(opportunityId);
    }

    @PutMapping("/applications/{applicationId}/status")
    public Application updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam Application.ApplicationStatus status
    ) {
        return opportunityService.updateApplicationStatus(applicationId, status);
    }
}
