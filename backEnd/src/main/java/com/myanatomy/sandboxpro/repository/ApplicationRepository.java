package com.myanatomy.sandboxpro.repository;

import com.myanatomy.sandboxpro.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByOpportunityIdOrderByAppliedAtDesc(Long opportunityId);
    List<Application> findByApplicantIdOrderByAppliedAtDesc(Long applicantId);
}
