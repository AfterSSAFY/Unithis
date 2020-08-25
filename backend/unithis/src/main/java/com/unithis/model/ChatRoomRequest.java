package com.unithis.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class ChatRoomRequest {
	int id;
	long userId;

	@Builder
	public ChatRoomRequest(int id, long userId) {
		super();
		this.id = id;
		this.userId = userId;
	}

}
