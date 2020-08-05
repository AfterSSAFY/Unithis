package com.unithis.dao;

import java.util.List;

import com.unithis.model.User;

public interface IUserDao {

	List<User> getAllUsers();
	int createUser(User user);
	int UserByNum(int id);
	int updateUser(User user);
	int deleteUser(int id);
	
}
