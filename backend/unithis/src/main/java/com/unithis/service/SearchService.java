package com.unithis.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unithis.dao.SearchDao;
import com.unithis.model.Search;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SearchService implements ISearchService {

	private final SearchDao searchDao;

	@Override
	public List<Search> getAllSearch(int userId) {
		return searchDao.getAllSearch(userId);
	}

	@Override
	public Search isSearched(Search search) {
		return searchDao.isSearched(search);
	}

	@Override
	public int search(Search search) {
		Search isSearched = searchDao.isSearched(search);
		
		if (isSearched == null) {
			return searchDao.search(search);
		}
		
		return searchDao.updateSearch(isSearched.getId());
	}

	@Override
	public int deleteSearch(int id) {
		return searchDao.deleteSearch(id);
	}

	@Override
	public int updateSearch(int id) {
		return searchDao.updateSearch(id);
	}

}
