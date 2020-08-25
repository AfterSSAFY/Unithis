package com.unithis.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class ChatRoom {
	int id;
	long user1Id;
	long user2Id;

	@Builder
	public ChatRoom(int id, long user1Id, long user2Id) {
		super();
		this.id = id;
		this.user1Id = user1Id;
		this.user2Id = user2Id;
	}

}
