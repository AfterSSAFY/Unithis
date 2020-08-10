package com.unithis.model;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Getter
public class Item {

	int id;
	int userId;
	String title;
	String contents;
	String category;
	String need;
	String status;
	LocalDateTime date;
	
	@Builder
	public Item(int id, int userId, String title, String contents, String category, String need, String status,
			LocalDateTime date) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.contents = contents;
		this.category = category;
		this.need = need;
		this.status = status;
		this.date = date;
	}
	
}
