package com.unithis.model;

import javax.persistence.Column;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Getter
public class Image {

	int itemId;
	String fileName;
	
	@Builder
	public Image(int itemId, String fileName) {
		this.itemId = itemId;
		this.fileName = fileName;
	}
	
}
