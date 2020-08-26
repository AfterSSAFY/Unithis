package com.unithis.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Getter
public class ItemSearchRequest {

	String category;
	String[] address;
	long idx;
	
	@Builder
	public ItemSearchRequest(String category, String[] address, long idx) {
		this.category = category;
		this.address = address;
		this.idx = idx;
	}
	
}
