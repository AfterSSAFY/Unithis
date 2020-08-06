package com.unithis.service;

import java.util.List;

import com.unithis.model.User;

public interface IUserService {
	public int checkLoginValidation(User user);
	public List<User> getAllUsers();
	public boolean createUser(User user);
	public User readUserInfoById(long id);
	public boolean updateUser(User user);
	public boolean deleteUser(long id);
}
