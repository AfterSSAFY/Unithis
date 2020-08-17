package com.unithis.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class Search {

	int id;
	int userId;
	String keyword;
	LocalDateTime date;
	
}
