package com.unithis.controller;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class WebSocketEventListener {
//	 @Autowired
//	    private SimpMessageSendingOperations messagingTemplate;

	    @EventListener
	    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
	        log.info("Received a new web socket connection");
	    }

	    @EventListener
	    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
	        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

	        String username = (String) headerAccessor.getSessionAttributes().get("username");
	        if(username != null) {
	            log.info("User Disconnected : " + username);

//	            Message chatMessage = new Message();
//	            chatMessage.setType(MessageType.LEAVE);
//	            chatMessage.set(username);
//
//	            messagingTemplate.convertAndSend("/topic/public", chatMessage);
	        }
	    }
}
