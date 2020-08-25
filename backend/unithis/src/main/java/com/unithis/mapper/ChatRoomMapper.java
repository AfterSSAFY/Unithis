package com.unithis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.unithis.model.ChatRoom;
import com.unithis.model.ChatRoomRequest;

@Mapper
public interface ChatRoomMapper {
	public long createChatRoom(ChatRoom newRoom);
	public List<ChatRoom> getJoinedRoomList(long userId);
	public ChatRoom checkExistChatRoom(@Param("user1") long user1, @Param("user2") long user2);
	public int updateReadTime(ChatRoomRequest chatroomReq);
}
