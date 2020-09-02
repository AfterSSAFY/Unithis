package com.unithis.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.unithis.model.ItemRequest;
import com.unithis.model.ItemResponse;
import com.unithis.model.ItemSearchRequest;

public interface IItemService {

	public ItemResponse getItemInfo(long id);
	public List<ItemResponse> getItemsByCategoryAndAddress(ItemSearchRequest item);
	public List<ItemResponse> getAllItem(long idx);
	public int createItem(ItemRequest item, MultipartFile[] images);
	public int updateItem(ItemRequest item, MultipartFile[] images);
	public int updateItemStatus(long id, String status);
	public int deleteItem(long id);
	public int deleteItemImage(String filename);
	public String[] getCategory();
}
