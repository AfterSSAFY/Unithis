package com.unithis.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unithis.dao.ItemDao;
import com.unithis.model.Item;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ItemService implements IItemService {

	private final ItemDao itemdao;
	
	public Item getItemInfo(int id) {
		return itemdao.getItemInfo(id);
	}

	public List<Item> getAllItem() {
		return itemdao.getAllItem();
	}

	public int createItem(Item item) {
		return itemdao.createItem(item);
	}
	
	public int updateItem(Item item) {
		return itemdao.updateItem(item);
	}
	
	public int updateItemStatus(int id) {
		if(itemdao.getItemInfo(id).getStatus().equals("판매중")) {
			return itemdao.updateItemStatusSoldOut(id);
		} else {
			return itemdao.updateItemStatusOnSales(id);
		}
	}

	public int deleteItem(int id) {
		return itemdao.deleteItem(id);
	}



	
}
