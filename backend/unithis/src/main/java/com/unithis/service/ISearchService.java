package com.unithis.service;

import java.util.List;

import com.unithis.model.Search;

public interface ISearchService {
	public List<Search> getAllSearch(int userId);
	public Search isSearched(Search search);
	public int search(Search search);
	public int deleteSearch(int id);
	public int updateSearch(int id);
}