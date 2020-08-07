package com.unithis.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.unithis.model.Item;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ItemDao {

	private String ns = "item.";
	
	private final SqlSession sqlSession;
	
	public List<Item> getAllItem() {
		return sqlSession.selectList(ns + "getAllItem");
	}
}
