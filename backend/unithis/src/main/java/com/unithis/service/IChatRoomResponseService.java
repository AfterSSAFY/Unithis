package com.unithis.service;

import java.util.List;

import com.unithis.model.ChatRoomResponse;
import com.unithis.model.ChatRoomResponseEntity;

public interface IChatRoomResponseService {
	public ChatRoomResponseEntity getChatRoomInfo(ChatRoomResponse crr);
}
