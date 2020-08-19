package com.unithis.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unithis.mapper.MessageMapper;
import com.unithis.model.Message;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MessageService implements IMessageService {
	private final MessageMapper messageMapper;

	@Override
	public int insertMessage(Message m) {
		// TODO Auto-generated method stub
		return messageMapper.insertMessage(m);
	}

	@Override
	public int updateReadTime(int id) {
		// TODO Auto-generated method stub
		return messageMapper.updateReadTime(id);
	}

	@Override
	public List<Message> findChatByRoomId(int roomID) {
		// TODO Auto-generated method stub
		return messageMapper.findChatByRoomId(roomID);
	}

}
