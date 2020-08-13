package com.unithis.service;

import java.util.List;

import com.unithis.model.Image;
import com.unithis.model.ItemRequest;

public interface IImageService {

	public int imageUpload(ItemRequest item);
	public List<Image> getImage(int id);
	
}