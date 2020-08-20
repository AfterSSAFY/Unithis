package com.unithis.model;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class ChatRoomResponse {
	int id;
	int currUserId;
	int otherUserId;
	ChatRoomResponseEntity entity;

	public void setEntity(ChatRoomResponseEntity entity) {
		this.entity = entity;
	}

	public ChatRoomResponse(int id, int currUserId, int otherUserId) {
		super();
		this.id = id;
		this.currUserId = currUserId;
		this.otherUserId = otherUserId;
	}

	public ChatRoomResponse(int id, int currUserId, int otherUserId, ChatRoomResponseEntity entity) {
		super();
		this.id = id;
		this.currUserId = currUserId;
		this.otherUserId = otherUserId;
		this.entity = entity;
	}

}
