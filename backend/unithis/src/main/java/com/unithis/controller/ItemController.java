package com.unithis.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.function.EntityResponse;

import com.unithis.model.ItemRequest;
import com.unithis.model.ItemResponse;
import com.unithis.model.ItemSearchRequest;
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
	public ItemResponse getItemInfo(@PathVariable int id) {
		log.info("ItemController : getItemInfo");
		
		return itemService.getItemInfo(id);
	}
	
	@PostMapping("/item/search")
	@ApiOperation("카테고리와 지정한 지역으로 물건들 정보 조회")
	public List<ItemResponse> getItemsByCategoryAndAddress(@RequestBody ItemSearchRequest item) {
		log.info("ItemController : getAllItemByCategory");

		return itemService.getItemsByCategoryAndAddress(item);
	}
	
	@GetMapping("/items")
	@ApiOperation("모든 물건 가져오기")
	public List<ItemResponse> getAllItem() {
		log.info("ItemController : getAllItem");

		return itemService.getAllItem();
	}
	
	@PostMapping("/item")
	@ApiOperation("물건 등록")
	public ResponseEntity<String> createItem(ItemRequest item, MultipartFile[] images) {
		log.info("ItemController : createItem");
		
		System.out.println(item.toString());
		
		System.out.println(images.length);
		
		if(images.length > 0) {
			for (int i = 0; i < images.length; i++) {
				System.out.println(images[i].getOriginalFilename());
			}
		}
		
		return ResponseEntity.status(HttpStatus.OK).body("성공");
//		return itemService.createItem(item);
	}
	
	@PatchMapping("/item")
	@ApiOperation("물건 정보 수정")
	public int updateItem(@RequestBody ItemRequest item) {
		log.info("ItemController : updateItem");
		
		return itemService.updateItem(item);
	}
	
	@PatchMapping("/item/{id}")
	@ApiOperation("물건 상태 변경")
	public int updateItemStatus(@PathVariable int id, @RequestParam String status) {
		log.info("ItemController : updateStatus");
		
		return itemService.updateItemStatus(id, status);
	} 
	
	@DeleteMapping("/item/{id}")
	@ApiOperation("물건 삭제")
	public int deleteItem(@PathVariable int id) {
		log.info("ItemController : deleteItem");
		
		return itemService.deleteItem(id);
	}
	
	@GetMapping("/category")
	@ApiOperation("카테고리 가져오기")
	public String[] getCategory() {
		log.info("ItemController : getCategory");
		
		return itemService.getCategory();
	}
}
