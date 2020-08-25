package com.unithis.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unithis.dao.SearchDao;
import com.unithis.model.Search;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SearchService implements ISearchService {

	private final SearchDao searchDao;

	@Override
	public List<Search> getAllSearch(long userId) {
		return searchDao.getAllSearch(userId);
	}

	@Override
	public Search isSearched(Search search) {
		return searchDao.isSearched(search);
	}

	@Transactional
	@Override
	public int search(Search search) {
		Search isSearched = searchDao.isSearched(search);
		
		if (isSearched == null) {
			return searchDao.search(search);
		}
		
		return searchDao.updateSearch(isSearched.getId());
	}

	@Transactional
	@Override
	public int deleteSearch(long id) {
		return searchDao.deleteSearch(id);
	}

	@Transactional
	@Override
	public int updateSearch(long id) {
		return searchDao.updateSearch(id);
	}

}
