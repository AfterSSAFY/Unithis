package com.unithis.controller;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.jupiter.api.Test;

import com.unithis.model.ItemRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ItemControllerTest {

	private ItemRequest item;
	
	@Before
	public void init() {
		item = ItemRequest.builder()
				.id(1)
				.userId(1)
				.title("테스트")
				.contents("테스트입니다")
				.need("무엇을 원하는지").build();
	}
	
	@Test
	public void getItemId() {
		init();
		assertEquals(1, item.getId());
	}
	
}