package com.unithis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.unithis.model.User;

@Mapper
public interface UserMapper {
	public int checkLoginValidation(User user);
	public List<User> getAllUsers();
	public int createUser(User user);
	public User readUserInfoById(long id);
	public int updateUser(User user);
	public int deleteUser(long id);
	
}
