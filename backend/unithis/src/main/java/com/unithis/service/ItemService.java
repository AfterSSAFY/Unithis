package com.unithis.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unithis.dao.ImageDao;
import com.unithis.dao.ItemDao;
import com.unithis.model.Image;
import com.unithis.model.ItemRequest;
import com.unithis.model.ItemResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ItemService implements IItemService {

	private final ItemDao itemDao;
	private final ImageDao imageDao;
	private final ImageService imageService;
	
	public ItemResponse getItemInfo(int id) {
		ItemResponse item = itemDao.getItemInfo(id);
		List<Image> image = imageDao.getImage(id);
		for (int i = 0; i < image.size(); i++) {
			item.getImages().add(image.get(i).getFileName());
		}
		
		return item;
	}

	public List<ItemResponse> getAllItem() {
		List<ItemResponse> items = itemDao.getAllItem();
		for (int i = 0; i < items.size(); i++) {
			List<Image> image = imageDao.getImage(items.get(i).getId());
			for (int j = 0; j < image.size(); j++) {
				items.get(i).getImages().add(image.get(j).getFileName());
			}
		}
		
		return items;
	}

	@Transactional
	public int createItem(ItemRequest item) {
		
		itemDao.createItem(item);
		
		if(item.getImages() != null) {
			try {
				return imageService.imageUpload(item);
			} catch (Exception e) {
				log.error("파일 업로드에 실패했습니다.");
			}
		}
		return 0;
	}
	
	@Transactional
	public int updateItem(ItemRequest item) {
		return itemDao.updateItem(item);
	}
	
	@Transactional
	public int updateItemStatus(int id, String status) {
		if(status.equals("대기중"))
			return itemDao.updateItemStatusWaiting(id);
		if(status.equals("거래중"))
			return itemDao.updateItemStatusSoldOut(id);
		
		return itemDao.updateItemStatusOnSales(id);
	}

	@Transactional
	public int deleteItem(int id) {
		return itemDao.deleteItem(id);
	}

	public String[] getCategory() {
		String[] result = {"디지털/가전", "가구/인테리어", "유아동/유아도서", "생활/가공식품",	"스포츠/레저",	"여성잡화", "여성의류", "남성패션/잡화",
				"게임/취미", "뷰티/미용", "반려동물용품", "도서/티켓/음반", "기타 물건"};
		
		return result;
	}

}
