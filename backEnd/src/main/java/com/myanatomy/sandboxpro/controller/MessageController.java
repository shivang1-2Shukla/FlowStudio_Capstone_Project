package com.myanatomy.sandboxpro.controller;

import com.myanatomy.sandboxpro.entity.Message;
import com.myanatomy.sandboxpro.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin("*")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public Message sendMessage(
            @RequestParam Long senderId,
            @RequestParam Long recipientId,
            @RequestBody String content
    ) {
        return messageService.sendMessage(senderId, recipientId, content);
    }

    @GetMapping("/conversation")
    public List<Message> getConversation(
            @RequestParam Long user1,
            @RequestParam Long user2
    ) {
        return messageService.getConversation(user1, user2);
    }
}
