package com.unithis.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	public ItemResponse getItemInfo(@PathVariable long id) {
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
	
	@PostMapping(path = "/item", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@ApiOperation("물건 등록")
	public int createItem(@RequestParam long userId, @RequestParam String title, 
			@RequestParam String contents, @RequestParam String category,
			@RequestParam String need, @RequestParam String address, @RequestPart MultipartFile[] images) {
		log.info("ItemController : createItem");
		
		ItemRequest item = ItemRequest.builder().userId(userId).title(title)
												.contents(contents).category(category)
												.need(need).address(address).build();
		
		System.out.println(item.toString());
		
		if(images.length > 0) {
			for (int i = 0; i < images.length; i++) {
				System.out.println(images[i].getOriginalFilename());
			}
		}
		
		return itemService.createItem(item, images);
	}
	
	@PatchMapping("/item")
	@ApiOperation("물건 정보 수정")
	public int updateItem(@RequestBody ItemRequest item) {
		log.info("ItemController : updateItem");
		
		return itemService.updateItem(item);
	}
	
	@PatchMapping("/item/{id}")
	@ApiOperation("물건 상태 변경")
	public int updateItemStatus(@PathVariable long id, @RequestParam String status) {
		log.info("ItemController : updateStatus");
		
		return itemService.updateItemStatus(id, status);
	} 
	
	@DeleteMapping("/item/{id}")
	@ApiOperation("물건 삭제")
	public int deleteItem(@PathVariable long id) {
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
