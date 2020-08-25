package com.unithis.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Getter
public class ItemRequest {

	long id;
	long userId;
	String title;
	String contents;
	String category;
	String need;
	String address;
	
	@Builder
	public ItemRequest(long id, long userId, String title, String contents, String category, String need, String address) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.contents = contents;
		this.category = category;
		this.need = need;
		this.address = address;
	}
	
}
