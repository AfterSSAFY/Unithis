package com.unithis.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Getter
public class Image {

	long itemId;
	String fileName;
	
	@Builder
	public Image(long itemId, String fileName) {
		this.itemId = itemId;
		this.fileName = fileName;
	}
	
}
