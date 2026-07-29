package com.myanatomy.sandboxpro.controller;

import com.myanatomy.sandboxpro.entity.PortfolioItem;
import com.myanatomy.sandboxpro.service.PortfolioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
@CrossOrigin("*")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @PostMapping("/user/{userId}")
    public PortfolioItem addPortfolioItem(
            @PathVariable Long userId,
            @RequestBody PortfolioItem item
    ) {
        return portfolioService.addPortfolioItem(userId, item);
    }

    @GetMapping("/user/{userId}")
    public List<PortfolioItem> getPortfolioByUser(@PathVariable Long userId) {
        return portfolioService.getPortfolioByUserId(userId);
    }

    @DeleteMapping("/{itemId}")
    public void deletePortfolioItem(@PathVariable Long itemId) {
        portfolioService.deletePortfolioItem(itemId);
    }
}
