package com.unithis.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.unithis.model.Search;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class SearchDao {

	private String ns = "search.";
	
	private final SqlSession sqlSession;
	
	public List<Search> getAllSearch(long id) {
		return sqlSession.selectList(ns + "getAllSearch", id);
	}

	public Search isSearched(Search search) {
		return sqlSession.selectOne(ns + "isSearched", search);
	}

	public int search(Search search) {
		return sqlSession.insert(ns + "search", search);
	}
	
	public int deleteSearch(long id) {
		return sqlSession.delete(ns + "deleteSearch", id);
	}

	public int updateSearch(long id) {
		return sqlSession.update(ns + "updateSearch", id);
	}

}
