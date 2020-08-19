package com.unithis.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.unithis.model.ChatRoom;
import com.unithis.model.Message;
import com.unithis.service.IChatRoomService;
import com.unithis.service.IMessageService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@RestController
public class ChatRoomController {

	private final IChatRoomService chatroomService;
	private final IMessageService messageService;

	// 모든 채팅방 목록 반환
	@GetMapping("/rooms/{user_id}")
	@ApiOperation("해당 유저의 모든 채팅방 목록 조회")
	public ResponseEntity<List<ChatRoom>> room(@PathVariable int user_id) {
		List<ChatRoom> joinedChatRoomList = chatroomService.getJoinedRoomList(user_id);
		System.out.println(joinedChatRoomList);
		if (joinedChatRoomList == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(joinedChatRoomList);
	}

	// 채팅방 생성 : 생성을 따로하는건지..
	@PostMapping("/room")
	@ApiOperation("채팅방 생성 : 방만 개설함")
	public ResponseEntity<String> createRoom(@RequestBody ChatRoom newRoom) {
		// TODO : 채팅방 검사 1회 수행 후 생성
		ChatRoom hasExistChatRoom = chatroomService.checkExistChatRoom(newRoom.getUser1Id(), newRoom.getUser2Id());
		// 기존에 있는 대화방이 없으면
		if (hasExistChatRoom == null) {
			int resultNewChatroom = chatroomService.createChatRoom(newRoom);
			if (resultNewChatroom == -1) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR : 방 생성 실패");
			}
			return ResponseEntity.status(HttpStatus.OK).body(resultNewChatroom + "");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR : 방 생성 실패(이미 존재함)");

		}
	}

	// 특정 채팅방 의 메세지 최근 15개
	// TODO : 페이지네이션
	@GetMapping("/room/{roomId}")
	@ApiOperation("채팅방의 메세지 15개 보기")
	public ResponseEntity<List<Message>> roomInfo(@PathVariable int roomId) {
		List<Message> msgList = messageService.findChatByRoomId(roomId);
		for (Message m : msgList)
			System.out.println(m);
		return ResponseEntity.status(HttpStatus.OK).body(msgList);
	}
}