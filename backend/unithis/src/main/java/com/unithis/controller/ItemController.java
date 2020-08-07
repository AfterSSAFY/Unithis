package com.unithis.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unithis.model.Item;
import com.unithis.service.ItemService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class ItemController {

	private final ItemService itemService;
	
	@GetMapping("/all_item")
	@ApiOperation("모든 물건 가져오기")
	public List<Item> getAllItem() {
		log.info("ItemController : getAllItem");

		List<Item> list = itemService.getAllItem();
		
		System.out.println(list.toString());
		
		return list;
	}
}
