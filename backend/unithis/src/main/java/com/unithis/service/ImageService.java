package com.unithis.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.unithis.dao.ImageDao;
import com.unithis.mapper.UserMapper;
import com.unithis.model.Image;
import com.unithis.model.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ImageService implements IImageService {

//    public static final String SAVE_FOLDER = "/home/ubuntu/images/";
//    public static final String IMAGE_URL = "http://ip/images";
	public static final String SAVE_FOLDER = "C:/github/Unithis/backend/unithis/src/main/resources/static/images/";
	public static final String IMAGE_URL = "localhost:8080:/images";
	
	private final ImageDao imageDao;
	private final UserMapper userMapper;
	
    @Transactional
    public int imageUpload(MultipartFile[] images, int itemId) {
		for (int i = 0; i < images.length; i++) {
    		String imageName = images[i].getOriginalFilename();
    		String imageExtension = FilenameUtils.getExtension(imageName).toLowerCase();
    		File destinationImage;
    		String destinationImageName;
    		String imageUrl = SAVE_FOLDER;
    		
    		SimpleDateFormat timeFormat = new SimpleDateFormat("yyMMddHHmmss");
    		destinationImageName = timeFormat.format(new Date()) + "_" + (i+1) + "." + imageExtension;
    		destinationImage = new File(imageUrl + destinationImageName);
    		
    		log.info("Image uploaded : {}", destinationImageName);
    		try {
    			images[i].transferTo(destinationImage);
    			imageDao.createImage(Image.builder().itemId(itemId).fileName(destinationImageName).build());
    		} catch (RuntimeException | IOException e) {
    			log.error("파일 업로드에 실패했습니다.");
    			return 0;
    		}
		}

        return 1;
    }
    
    @Override
	public int imageUpload(MultipartFile image, long id) {
    	
    	String imageName = image.getOriginalFilename();
		String imageExtension = FilenameUtils.getExtension(imageName).toLowerCase();
		File destinationImage;
		String destinationImageName;
		String imageUrl = SAVE_FOLDER;
		
		SimpleDateFormat timeFormat = new SimpleDateFormat("yyMMddHHmmss");
		destinationImageName = timeFormat.format(new Date()) + "." + imageExtension;
		destinationImage = new File(imageUrl + destinationImageName);
		
		log.info("Image uploaded : {}", destinationImageName);
		try {
			image.transferTo(destinationImage);
			userMapper.updateProfile(User.builder().id(id).profile(destinationImageName).build());
		} catch (RuntimeException | IOException e) {
			log.error("파일 업로드에 실패했습니다.");
			return 0;
		}
		return 1;
	}
    
    public List<Image> getImage(int id) {
    	return imageDao.getImage(id);
    }

}
