package com.unithis.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unithis.dao.ImageDao;
import com.unithis.dao.ItemDao;
import com.unithis.dao.SearchDao;
import com.unithis.mapper.UserMapper;
import com.unithis.model.Image;
import com.unithis.model.ItemResponse;
import com.unithis.model.ItemSearchRequest;
import com.unithis.model.Search;
import com.unithis.model.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SearchService implements ISearchService {

	private final SearchDao searchDao;
	private final ItemDao itemDao;
	private final ImageDao imageDao;
	private final UserMapper userMapper;

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
	public List<ItemResponse> search(Search search) {
		Search isSearched = searchDao.isSearched(search);
		
		if (isSearched == null) {
			searchDao.search(search);
		} else {
			searchDao.updateSearch(isSearched.getId());
		}
		
		List<ItemResponse> result = itemDao.getItemsByKeyword(search);
		
		if(result != null) {
			List<Image>[] image = new ArrayList[result.size()];
			for (int i = 0; i < result.size(); i++) {
				image[i] = imageDao.getImage(result.get(i).getId());
			}
			for (int i = 0; i < result.size(); i++) {
				for (int j = 0; j < image[i].size(); j++) {
					result.get(i).getImages().add(image[i].get(j).getFileName());
				}
			}
		}

		return result;
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
