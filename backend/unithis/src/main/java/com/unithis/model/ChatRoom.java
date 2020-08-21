package com.unithis.model;

import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
@Table(name = "chatroom")
public class ChatRoom {
	int id;
	int user1Id;
	int user2Id;

	@Builder
	public ChatRoom(int id, int user1Id, int user2Id) {
		super();
		this.id = id;
		this.user1Id = user1Id;
		this.user2Id = user2Id;
	}

}
