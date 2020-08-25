package com.unithis.service;

import java.util.List;

import com.unithis.model.Message;

public interface IMessageService {
	public int insertMessage(Message m);
	public int updateReadTime(long id);
	public List<Message> findChatByRoomId(long roomId, long idx);
}
