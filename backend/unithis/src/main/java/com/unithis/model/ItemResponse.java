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

	int id;
	int userId;
	String title;
	String contents;
	String category;
	String need;
	String status;
	List<String> images = new ArrayList<>();
	LocalDateTime date;
	
	@Builder
	public ItemResponse(int id, int userId, String title, String contents, String category, String need, String status, List<String> images,
			LocalDateTime date) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.contents = contents;
		this.category = category;
		this.need = need;
		this.status = status;
		this.images = images;
		this.date = date;
	}
	
}
