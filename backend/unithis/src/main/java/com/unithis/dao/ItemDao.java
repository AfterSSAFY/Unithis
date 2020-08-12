package com.unithis.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.unithis.model.ItemRequest;
import com.unithis.model.ItemResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ItemDao {

	private String ns = "item.";
	
	private final SqlSession sqlSession;
	
	public ItemResponse getItemInfo(int id) {
		return sqlSession.selectOne(ns + "getItemInfo", id);
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
	
	public int updateItemStatusWaiting(int id) {
		return sqlSession.update(ns + "updateItemStatusWaiting", id);
	}
	
	public int updateItemStatusSoldOut(int id) {
		return sqlSession.update(ns + "updateItemStatusSoldOut", id);
	}
	
	public int updateItemStatusOnSales(int id) {
		return sqlSession.update(ns + "updateItemStatusOnSales", id);
	}
	
	public int deleteItem(int id) {
		return sqlSession.delete(ns + "deleteItem", id);
	}


}
