package com.unithis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.unithis.model.ChatRoom;
import com.unithis.model.ChatRoomRequest;

@Mapper
public interface ChatRoomMapper {
	public int createChatRoom(ChatRoom newRoom);
	public List<ChatRoom> getJoinedRoomList(int userId);
	public ChatRoom checkExistChatRoom(@Param("user1") int user1, @Param("user2") int user2);
	public int updateReadTime(ChatRoomRequest chatroomReq);
}
