package com.unithis.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.unithis.model.ItemRequest;
import com.unithis.model.ItemResponse;
import com.unithis.model.ItemSearchRequest;
import com.unithis.model.Search;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ItemDao {

	private String ns = "item.";
	
	private final SqlSession sqlSession;
	
	public ItemResponse getItemInfo(long id) {
		return sqlSession.selectOne(ns + "getItemInfo", id);
	}
	
	public List<ItemResponse> getItemsByCategoryAndAddress(ItemSearchRequest item) {
		return sqlSession.selectList(ns + "getItemsByCategoryAndAddress", item);
	}
	
	public List<ItemResponse> getAllItem() {
		return sqlSession.selectList(ns + "getAllItem");
	}
	
	public int createItem(ItemRequest item) {
		return sqlSession.insert(ns + "createItem", item);
	}

	public int updateItem(ItemRequest item) {
		return sqlSession.update(ns + "updateItem", item);
	}
	
	public int updateItemStatusWaiting(long id) {
		return sqlSession.update(ns + "updateItemStatusWaiting", id);
	}
	
	public int updateItemStatusSoldOut(long id) {
		return sqlSession.update(ns + "updateItemStatusSoldOut", id);
	}
	
	public int updateItemStatusOnSales(long id) {
		return sqlSession.update(ns + "updateItemStatusOnSales", id);
	}
	
	public int deleteItem(long id) {
		return sqlSession.delete(ns + "deleteItem", id);
	}

	public int deleteItemImage(String filename) {
		return sqlSession.delete(ns + "deleteItemImage", filename);
	}
	
	public List<ItemResponse> getItemsByKeyword(Search search) {
		return sqlSession.selectList(ns + "getItemsByKeyword", search);
	}

}
