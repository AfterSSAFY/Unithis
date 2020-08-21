package com.unithis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.unithis.model.Message;

@Mapper
public interface MessageMapper {
	public int insertMessage(Message m);
	public int updateReadTime(int id);
	public List<Message> findChatByRoomId(@Param("roomId") int roomId, @Param("idx") int idx);
}
