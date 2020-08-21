package com.unithis.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unithis.mapper.ChatRoomMapper;
import com.unithis.model.ChatRoom;
import com.unithis.model.ChatRoomRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatRoomService implements IChatRoomService {

	private final ChatRoomMapper chatroomMapper;

	@Override
	public int createChatRoom(ChatRoom newRoom) {
		int idx = chatroomMapper.createChatRoom(newRoom);
		return idx == 1 ? newRoom.getId() : -1;
	}

	@Override
	public List<ChatRoom> getJoinedRoomList(int user_id) {
		return chatroomMapper.getJoinedRoomList(user_id);
	}

	@Override
	public ChatRoom checkExistChatRoom(int user1, int user2) {
		return chatroomMapper.checkExistChatRoom(user1, user2);
	}

	@Override
	public boolean updateReadTime(ChatRoomRequest chatroomReq) {
		// TODO Auto-generated method stub
		return chatroomMapper.updateReadTime(chatroomReq) > 0 ? true : false;
	}

}
