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
	

	public List<Item> getAllItem() {
		return itemdao.getAllItem();
	}
	
}
