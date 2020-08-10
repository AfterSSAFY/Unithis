package com.unithis.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class Item {

	long id;
	long userId;
	String title;
	String contents;
	String category;
	String need;
	String status;
	LocalDateTime date;
}
