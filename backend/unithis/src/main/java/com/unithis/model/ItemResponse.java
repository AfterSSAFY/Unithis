package com.unithis.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Setter
@Getter
public class ItemResponse {

	long id;
	long userId;
	String title;
	String contents;
	String category;
	String need;
	String status;
	String address;
	boolean hasNext;
	List<String> images = new ArrayList<>();
	User user;
	LocalDateTime date;
	
	@Builder
	public ItemResponse(long id, long userId, String title, String contents, String category, String need, String status,
			String address, boolean hasNext, List<String> images, User user, LocalDateTime date) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.contents = contents;
		this.category = category;
		this.need = need;
		this.status = status;
		this.address = address;
		this.hasNext = hasNext;
		this.images = images;
		this.user = user;
		this.date = date;
	}
	
}
