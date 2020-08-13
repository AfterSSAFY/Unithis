package com.unithis.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.unithis.model.Image;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ImageDao {

	private String ns = "image.";
	
	private final SqlSession sqlSession;
	
	public int createImage(Image image) {
		return sqlSession.insert(ns + "createImage", image);
	}
	
	public List<Image> getImage(int id) {
		return sqlSession.selectList(ns + "getImage", id);
	}

}
