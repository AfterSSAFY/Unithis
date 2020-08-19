package com.unithis.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.unithis.model.ChatRoom;
import com.unithis.model.Message;
import com.unithis.service.IChatRoomService;
import com.unithis.service.IMessageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Slf4j
@RequiredArgsConstructor
@RestController
public class MessageController {
	private final IChatRoomService chatroomService;
	private final IMessageService messageService;
	private final SimpMessagingTemplate  template;
	
	
	@MessageMapping("/chat.sendMessage")
//	@SendTo("/topic/public")
	public void sendMessage(@Payload Message chatMessage) {
		System.out.println("전달 메세지 : " + chatMessage);
		messageService.insertMessage(chatMessage);
		template.convertAndSend("/topic/"+chatMessage.getChatroomId(), chatMessage);
//		return chatMessage;
	}

	@MessageMapping("/chat.addUser")
	@SendTo("/topic/public")
	public ResponseEntity<String> addUser(@Payload ChatRoom chatPreConnection,
			SimpMessageHeaderAccessor headerAccessor) {
		log.info("요청 정보 : " + chatPreConnection);
		try {
			// 먼저 해당 유저와 대화하던 방이 잇는지: 있으면 방 id, 없으면 -1
			ChatRoom hasExistChatRoom = chatroomService.checkExistChatRoom(chatPreConnection.getUser1Id(),
					chatPreConnection.getUser2Id());
			// 방 만들어
			if (hasExistChatRoom == null) {
				int newroomId = chatroomService.createChatRoom(chatPreConnection);
				if (newroomId == -1)
					throw new Exception("방 생성 실패");
				log.info("user_id :" + chatPreConnection.getUser1Id() + " 세션추가(새 채팅방)");
				headerAccessor.getSessionAttributes().put("user_id", chatPreConnection.getUser1Id());
				return ResponseEntity.status(HttpStatus.OK).body(newroomId + "");
			} else {
				System.out.println(hasExistChatRoom);
				System.out.println("=================");
				if (hasExistChatRoom.getId() != chatPreConnection.getId()) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR : 방 아이디가 잘못되었습니다.");
				}
				log.info("user_id :" + chatPreConnection.getUser1Id() + " 세션추가(기존채팅방)");
				headerAccessor.getSessionAttributes().put("user_id", chatPreConnection.getUser1Id());
				return ResponseEntity.status(HttpStatus.OK).body(chatPreConnection.getId() + "");
			}
		} catch (Exception e) {
			log.info("ERROR : " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR : " + e);
		}
	}
}
