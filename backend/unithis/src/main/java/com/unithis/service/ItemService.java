package com.unithis.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.unithis.dao.ImageDao;
import com.unithis.dao.ItemDao;
import com.unithis.model.Image;
import com.unithis.model.ItemRequest;
import com.unithis.model.ItemResponse;
import com.unithis.model.ItemSearchRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ItemService implements IItemService {

	private final ItemDao itemDao;
	private final ImageDao imageDao;
	private final ImageService imageService;
	
	@Override
	public ItemResponse getItemInfo(long id) {
		ItemResponse result = itemDao.getItemInfo(id);
		List<Image> image = imageDao.getImage(id);
		
		for (int i = 0; i < image.size(); i++) {
			result.getImages().add(image.get(i).getFileName());
		}
		
		return result;
	}
	
	@Override
	public List<ItemResponse> getItemsByCategoryAndAddress(ItemSearchRequest item) {
		List<ItemResponse> result = itemDao.getItemsByCategoryAndAddress(item);
		
		if(result != null) {
			List<ItemResponse> next = itemDao.getItemsByCategoryAndAddress(
					ItemSearchRequest.builder()
					.category(item.getCategory())
					.address(item.getAddress())
					.idx(item.getIdx()+10).build()
					);
			if(!next.isEmpty()) {
				for (int i = 0; i < result.size(); i++) {
					result.get(i).setHasNext(true);
				}
			}
		}
		
		return result;
	}

	@Override
	public List<ItemResponse> getAllItem() {
		List<ItemResponse> result = itemDao.getAllItem();
		
		for (int i = 0; i < result.size(); i++) {
			List<Image> image = imageDao.getImage(result.get(i).getId());
			for (int j = 0; j < image.size(); j++) {
				result.get(i).getImages().add(image.get(j).getFileName());
			}
		}
		
		return result;
	}

	@Transactional
	@Override
	public int createItem(ItemRequest item, MultipartFile[] images) {
		int result = itemDao.createItem(item);
		
		if(result == 0)
			return 0;
		
		if(images.length != 0) {
			try {
				result += imageService.imageUpload(images, item.getId());
			} catch (Exception e) {
				log.error("파일 업로드에 실패했습니다.");
			}
		}
		
		return result;
	}
	
	@Transactional
	@Override
	public int updateItem(ItemRequest item, MultipartFile[] images) {
		int result = itemDao.updateItem(item);
		
		if(result == 0)
			return 0;
		
		if(images.length != 0) {
			try {
				result += imageService.imageUpload(images, item.getId());
			} catch (Exception e) {
				log.error("파일 업로드에 실패했습니다.");
			}
		}
		
		return result;
	}
	
	@Transactional
	@Override
	public int updateItemStatus(long id, String status) {
		if(status.equals("대기중"))
			return itemDao.updateItemStatusWaiting(id);
		if(status.equals("거래중"))
			return itemDao.updateItemStatusOnSales(id);
		
		return itemDao.updateItemStatusSoldOut(id);
	}

	@Transactional
	@Override
	public int deleteItem(long id) {
		return itemDao.deleteItem(id);
	}

	@Transactional
	@Override
	public int deleteItemImage(String filename) {
		return itemDao.deleteItemImage(filename);
	}
	
	@Override
	public String[] getCategory() {
		String[] result = {"디지털/가전", "가구/인테리어", "유아동/유아도서", "생활/가공식품",	"스포츠/레저",	"여성잡화", "여성의류", "남성패션/잡화",
				"게임/취미", "뷰티/미용", "반려동물용품", "도서/티켓/음반", "기타 물건"};
		
		return result;
	}

}
