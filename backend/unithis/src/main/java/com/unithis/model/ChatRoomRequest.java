package com.unithis.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class ChatRoomRequest {
	long id;
	long userId;

	@Builder
	public ChatRoomRequest(long id, long userId) {
		super();
		this.id = id;
		this.userId = userId;
	}

}
