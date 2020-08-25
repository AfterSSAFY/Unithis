package com.unithis.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class Search {

	long id;
	long userId;
	String keyword;
	LocalDateTime date;
	
}
