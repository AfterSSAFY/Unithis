package com.unithis.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unithis.model.Search;
import com.unithis.service.ISearchService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class SearchController {

	private final ISearchService searchService;
	
	@PostMapping("/search")
	@ApiOperation(value = "키워드 검색")
	public int search(@RequestBody Search search) {
		log.info("SearchController : search");
		
		return searchService.search(search);
	}

	@GetMapping("/search/{num}")
	@ApiOperation(value = "최근 검색")
	public List<Search> getAllSearch(@PathVariable(required = true) int id) {
		log.info("SearchController : getAllSearch");

		return searchService.getAllSearch(id);
	}

	@DeleteMapping("/search/{num}")
	@ApiOperation(value = "검색 삭제")
	public int deleteSearch(@PathVariable(required = true) int num) {
		log.info("SearchController : deleteSearch");

		return searchService.deleteSearch(num);
	}
	
}
