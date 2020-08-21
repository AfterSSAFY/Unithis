package com.unithis.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class ChatRoomResponseEntity {

	String otherUserNickname;
	String recentMessage;
	int unreadMessage;

	@Builder
	public ChatRoomResponseEntity(String otherUserNickname, String recentMessage, int unreadMessage) {
		super();
		this.otherUserNickname = otherUserNickname;
		this.recentMessage = recentMessage;
		this.unreadMessage = unreadMessage;
	}

}
