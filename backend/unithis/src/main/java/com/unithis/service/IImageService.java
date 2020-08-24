package com.unithis.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.unithis.model.Image;

public interface IImageService {

	public int imageUpload(MultipartFile[] images, int id);
	public int imageUpload(MultipartFile image, int id);
	public List<Image> getImage(int id);
	
}