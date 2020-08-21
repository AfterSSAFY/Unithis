package com.unithis.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.unithis.model.Message;
import com.unithis.service.IMessageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Slf4j
@RequiredArgsConstructor
@RestController
public class MessageController {
	private final IMessageService messageService;
	private final SimpMessagingTemplate template;

	@MessageMapping("/message")
//	@SendTo("/sub/{{user_id}}")
	public void sendMessage(@Payload Message chatMessage) {
		log.info("전달 메세지 : " + chatMessage);
		messageService.insertMessage(chatMessage);
		template.convertAndSend("/sub/" + chatMessage.getReceiverId(), chatMessage);
		template.convertAndSend("/sub/" + chatMessage.getSenderId(), chatMessage);
	}
}
