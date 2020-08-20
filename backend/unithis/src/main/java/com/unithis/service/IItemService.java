package com.unithis.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.unithis.model.ItemRequest;
import com.unithis.model.ItemResponse;
import com.unithis.model.ItemSearchRequest;

public interface IItemService {

	public ItemResponse getItemInfo(int id);
	public List<ItemResponse> getItemsByCategoryAndAddress(ItemSearchRequest item);
	public List<ItemResponse> getAllItem();
	public int createItem(ItemRequest item, MultipartFile[] images);
	public int updateItem(ItemRequest item);
	public int updateItemStatus(int id, String status);
	public int deleteItem(int id);
	public String[] getCategory();
}
