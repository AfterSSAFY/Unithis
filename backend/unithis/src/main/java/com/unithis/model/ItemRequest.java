package com.unithis.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Getter
public class ItemRequest {

	int id;
	int userId;
	String title;
	String contents;
	String category;
	String need;
	String address;
	
	@Builder
	public ItemRequest(int id, int userId, String title, String contents, String category, String need, String address) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.contents = contents;
		this.category = category;
		this.need = need;
		this.address = address;
	}
	
}
