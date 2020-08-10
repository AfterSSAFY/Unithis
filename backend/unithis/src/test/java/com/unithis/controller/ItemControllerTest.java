package com.unithis.controller;

import static org.junit.Assert.fail;

import org.junit.jupiter.api.Test;

import com.unithis.model.Item;

public class ItemControllerTest {

	@Test
	public void createItem() throws Exception {
		Item item = new Item();
	}
	
	@Test
	public void getItemId() {
		Item item = Item.builder().id(1).build();
		if(item.getId() != 1) {
			fail("Error");
		}
	}
}
