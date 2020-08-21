package com.unithis.service;

import org.springframework.stereotype.Service;

import com.unithis.mapper.ChatRoomResponseMapper;
import com.unithis.model.ChatRoomResponse;
import com.unithis.model.ChatRoomResponseEntity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatRoomResponseService implements IChatRoomResponseService {

	private final ChatRoomResponseMapper chatroomResMapper;

	@Override
	public ChatRoomResponseEntity getChatRoomInfo(ChatRoomResponse crr) {
		// TODO Auto-generated method stub
		return chatroomResMapper.getChatRoomInfo(crr);
	}

	
}
