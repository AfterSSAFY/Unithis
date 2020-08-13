package com.unithis.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unithis.dao.ImageDao;
import com.unithis.model.Image;
import com.unithis.model.ItemRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ImageService {

//    public static final String SAVE_FOLDER = "/home/ubuntu/images/";
//    public static final String IMAGE_URL = "http://ip/images";
	public static final String SAVE_FOLDER = "C:/github/Unithis/backend/unithis/src/main/resources/static/images/";
	public static final String IMAGE_URL = "localhost:8080:/images";
	private final ImageDao imageDao;

    @Transactional
    public int imageUpload(ItemRequest item) throws Exception {
        
    	for (int i = 0; i < item.getImages().length; i++) {
    		String imageName = item.getImages()[i].getOriginalFilename();
    		String imageExtension = FilenameUtils.getExtension(imageName).toLowerCase();
    		File destinationImage;
    		String destinationImageName;
    		String imageUrl = SAVE_FOLDER;
    		
    		SimpleDateFormat timeFormat = new SimpleDateFormat("yyMMddHHmmss");
    		destinationImageName = timeFormat.format(new Date()) + "_" + (i+1) + "." + imageExtension;
    		destinationImage = new File(imageUrl + destinationImageName);
    		
    		log.info("Image uploaded : {}", destinationImageName);
    		try {
    			item.getImages()[i].transferTo(destinationImage);
    			imageDao.createImage(Image.builder().itemId(item.getId()).fileName(destinationImageName).build());
    		} catch (RuntimeException e) {
    			log.error("파일 업로드에 실패했습니다.");
    		}
		}

        return item.getImages().length;
    }
    
    public List<Image> getImage(int id) {
    	return imageDao.getImage(id);
    }

}
