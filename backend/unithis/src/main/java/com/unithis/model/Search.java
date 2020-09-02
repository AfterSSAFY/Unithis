package com.unithis.model;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Search {

	long id;
	long userId;
	String keyword;
	long idx;
	LocalDateTime date;
	
	@Builder
	public Search(long id, long userId, String keyword, long idx, LocalDateTime date) {
		this.id = id;
		this.userId = userId;
		this.keyword = keyword;
		this.idx = idx;
		this.date = date;
	}
}