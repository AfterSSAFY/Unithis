package com.unithis.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("/item/{id}")
	@ApiOperation("물건 상세정보 조회")
	public Item getItemInfo(@PathVariable int id) {
		log.info("ItemController : getItemInfo");
		
		return itemService.getItemInfo(id);
	}
	
	@GetMapping("/items")
	@ApiOperation("모든 물건 가져오기")
	public List<Item> getAllItem() {
		log.info("ItemController : getAllItem");

		List<Item> list = itemService.getAllItem();
		
		System.out.println(list.toString());
		
		return list;
	}
	
	@PostMapping("/item")
	@ApiOperation("물건 등록")
	public int createItem(@RequestBody Item item) {
		log.info("ItemController : createItem");
		
		return itemService.createItem(item);
	}
	
	@PatchMapping("/item")
	@ApiOperation("물건 정보 수정")
	public int updateItem(@RequestBody Item item) {
		log.info("ItemController : updateItem");
		
		return itemService.updateItem(item);
	}
	
	@PatchMapping("/item/{id}")
	@ApiOperation("물건 상태 변경 / 판매중 -> 판매완료, 판매완료 -> 판매중")
	public int updateItemStatus(@PathVariable int id) {
		log.info("ItemController : updateStatus");
		
		return itemService.updateItemStatus(id);
	} 
	
	@DeleteMapping("/item/{id}")
	@ApiOperation("물건 삭제")
	public int deleteItem(@PathVariable int id) {
		log.info("ItemController : deleteItem");
		
		return itemService.deleteItem(id);
	} 
	
}
