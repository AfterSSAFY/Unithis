package com.unithis.service;

import java.util.List;

import com.unithis.model.ChatRoom;

public interface IChatRoomService {
	public int createChatRoom(ChatRoom newRoom);
	public List<ChatRoom> getJoinedRoomList(int user_id);
	public ChatRoom checkExistChatRoom(int user1_id, int user2_id);
}
