package com.unithis.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class Message {
	private long id;
	private String content;
	private LocalDateTime sendTime;
	private LocalDateTime receiveTime;
	private int chatroomId;
	private int senderId;
	private int receiverId;

	@Builder
	public Message(int id, String content, LocalDateTime sendTime, LocalDateTime receiveTime, int chatroomId,
			int senderId, int receiverId) {
		super();
		this.id = id;
		this.content = content;
		this.sendTime = sendTime;
		this.receiveTime = receiveTime;
		this.chatroomId = chatroomId;
		this.senderId = senderId;
		this.receiverId = receiverId;
	}

}
