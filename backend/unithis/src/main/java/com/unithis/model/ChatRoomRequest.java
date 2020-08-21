package com.unithis.model;

import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class ChatRoomRequest {
	int id;
	int userId;

	@Builder
	public ChatRoomRequest(int id, int userId) {
		super();
		this.id = id;
		this.userId = userId;
	}

}
