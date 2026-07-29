package com.myanatomy.sandboxpro.service;

import com.myanatomy.sandboxpro.entity.PortfolioItem;
import com.myanatomy.sandboxpro.entity.User;
import com.myanatomy.sandboxpro.exception.ResourceNotFoundException;
import com.myanatomy.sandboxpro.repository.PortfolioItemRepository;
import com.myanatomy.sandboxpro.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    private final PortfolioItemRepository portfolioItemRepository;
    private final UserRepository userRepository;

    public PortfolioService(PortfolioItemRepository portfolioItemRepository, UserRepository userRepository) {
        this.portfolioItemRepository = portfolioItemRepository;
        this.userRepository = userRepository;
    }

    public PortfolioItem addPortfolioItem(Long userId, PortfolioItem item) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        item.setUser(user);
        return portfolioItemRepository.save(item);
    }

    public List<PortfolioItem> getPortfolioByUserId(Long userId) {
        return portfolioItemRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void deletePortfolioItem(Long itemId) {
        PortfolioItem item = portfolioItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio item not found with id: " + itemId));
        portfolioItemRepository.delete(item);
    }
}
