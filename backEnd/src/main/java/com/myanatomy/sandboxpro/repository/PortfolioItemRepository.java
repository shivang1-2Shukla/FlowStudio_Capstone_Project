package com.myanatomy.sandboxpro.repository;

import com.myanatomy.sandboxpro.entity.PortfolioItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioItemRepository extends JpaRepository<PortfolioItem, Long> {
    List<PortfolioItem> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<PortfolioItem> findByUserIdAndMediaTypeOrderByCreatedAtDesc(Long userId, PortfolioItem.MediaType mediaType);
}
