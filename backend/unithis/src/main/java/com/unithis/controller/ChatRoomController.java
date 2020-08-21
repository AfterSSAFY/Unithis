package com.unithis.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unithis.model.ChatRoom;
import com.unithis.model.ChatRoomRequest;
import com.unithis.model.ChatRoomResponse;
import com.unithis.model.Message;
import com.unithis.service.IChatRoomResponseService;
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
	private final IChatRoomResponseService chatroomResService;
	final int PAGE = 10;

	// 모든 채팅방 목록 반환
	@GetMapping("/rooms/{id}")
	@ApiOperation("해당 유저의 모든 채팅방 목록 조회 및 정보전달")
	public ResponseEntity<ChatRoomResponse[]> room(@PathVariable int id) {
		List<ChatRoom> joinedChatRoomList = chatroomService.getJoinedRoomList(id);
		ChatRoomResponse[] chatroomResList = new ChatRoomResponse[joinedChatRoomList.size()];
		log.info(joinedChatRoomList.toString());
		// 유저가 속한 채팅방 정보를 가지고 상대유저닉네임, 최근대화내용, 안읽은 메세지 수 리턴
		for (int i = 0; i < joinedChatRoomList.size(); i++) {
			ChatRoom cr = joinedChatRoomList.get(i);
			if (cr.getUser1Id() == id) {
				chatroomResList[i] = ChatRoomResponse.builder().id(cr.getId()).currUserId(id)
						.otherUserId(cr.getUser2Id()).build();
				chatroomResList[i].setEntity(chatroomResService.getChatRoomInfo(chatroomResList[i]));
				System.out.println(chatroomResList[i]);
			} else if (cr.getUser2Id() == id) {
				chatroomResList[i] = ChatRoomResponse.builder().id(cr.getId()).currUserId(id)
						.otherUserId(cr.getUser1Id()).build();
				chatroomResList[i].setEntity(chatroomResService.getChatRoomInfo(chatroomResList[i]));
				System.out.println(chatroomResList[i]);
			} else {
				log.error("logic error");
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
			}
		}
		return ResponseEntity.status(HttpStatus.OK).body(chatroomResList);
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
			// 이미 있는 경우 기존의 채팅방 아이디 전달
			return ResponseEntity.status(HttpStatus.OK).body(hasExistChatRoom.getId() + "");

		}
	}

	// 특정 채팅방 의 메세지 최근 15개
	// TODO : 페이지네이션
	@GetMapping("/room/message/{id}")
	@ApiOperation("채팅방의 메세지 15개 보기")
	public ResponseEntity<List<Message>> roomInfo(@PathVariable int id,
			@RequestParam(value = "page", defaultValue = "0") int page) {
		int idx = page == 0 ? 0: page * PAGE + 1;
		List<Message> msgList = messageService.findChatByRoomId(id, idx);
		for (Message m : msgList)
			System.out.println(m);
		return ResponseEntity.status(HttpStatus.OK).body(msgList);
	}

	@PatchMapping("/message")
	@ApiOperation("채팅방 읽음처리")
	public ResponseEntity<String> updateItem(@RequestBody ChatRoomRequest chatroomReq) {
		boolean resultUpdating = chatroomService.updateReadTime(chatroomReq);
		if (resultUpdating) {
			return ResponseEntity.status(HttpStatus.OK).body("SUCC");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
		}

	}
}