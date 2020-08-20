package com.unithis.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.unithis.model.ChatRoomResponse;
import com.unithis.model.ChatRoomResponseEntity;

@Mapper
public interface ChatRoomResponseMapper {
	public ChatRoomResponseEntity getChatRoomInfo(ChatRoomResponse chatroomRes);
}
