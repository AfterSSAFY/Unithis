package com.unithis.service;

import java.util.List;

import com.unithis.model.ItemResponse;
import com.unithis.model.Search;

public interface ISearchService {
	public List<Search> getAllSearch(long userId);
	public Search isSearched(Search search);
	public List<ItemResponse> search(Search search);
	public int deleteSearch(long id);
	public int updateSearch(long id);
}