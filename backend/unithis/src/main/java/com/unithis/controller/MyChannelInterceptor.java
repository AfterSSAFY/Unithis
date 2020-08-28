package com.unithis.controller;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MyChannelInterceptor extends ChannelInterceptorAdapter {
	@Override
		public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
//        System.out.println(message);
        return message;
		}
}
