package com.unithis.service;

import java.util.List;

import com.unithis.model.ChatRoom;
import com.unithis.model.ChatRoomRequest;

public interface IChatRoomService {
	public int createChatRoom(ChatRoom newRoom);
	public List<ChatRoom> getJoinedRoomList(int user_id);
	public ChatRoom checkExistChatRoom(long user1_id, long user2_id);
	public boolean updateReadTime(ChatRoomRequest chatroomReq);
}
