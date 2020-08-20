package com.unithis.service;

import java.util.List;

import com.unithis.model.ChatRoom;
import com.unithis.model.ChatRoomRequest;

public interface IChatRoomService {
	public int createChatRoom(ChatRoom newRoom);
	public List<ChatRoom> getJoinedRoomList(int user_id);
	public ChatRoom checkExistChatRoom(int user1_id, int user2_id);
	public boolean updateReadTime(ChatRoomRequest chatroomReq);
}
