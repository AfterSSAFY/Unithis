package com.unithis.service;

import java.util.List;

import com.unithis.model.ItemRequest;
import com.unithis.model.ItemResponse;
import com.unithis.model.ItemSearchRequest;

public interface IItemService {

	public ItemResponse getItemInfo(int id);
	public List<ItemResponse> getItemsByCategoryAndAddress(ItemSearchRequest item);
	public List<ItemResponse> getAllItem();
//	public int createItem(ItemRequest item);
	public int updateItem(ItemRequest item);
	public int updateItemStatus(int id, String status);
	public int deleteItem(int id);
	public String[] getCategory();
}
