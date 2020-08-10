package com.unithis.service;

import java.util.List;

import com.unithis.model.Item;

public interface IItemService {

	public Item getItemInfo(int id);
	public List<Item> getAllItem();
	public int createItem(Item item);
	public int updateItem(Item item);
	public int updateItemStatus(int id);
	public int deleteItem(int id);
	
}
