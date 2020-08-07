package com.unithis.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unithis.mapper.UserMapper;
import com.unithis.model.User;
import com.unithis.service.IUserService;

@Service
public class UserService implements IUserService {

	@Autowired
	private UserMapper userMapper;

	@Override
	public int checkLoginValidation(User user) {
		return userMapper.checkLoginValidation(user);
	}

	@Override
	public List<User> getAllUsers() {
		return userMapper.getAllUsers();
	}

	@Override
	public boolean createUser(User user) {
		return userMapper.createUser(user) == 1 ? true : false;
	}

	@Override
	public User readUserInfoById(long id) {
		return userMapper.readUserInfoById(id);
	}

	@Override
	public boolean updateUser(User user) {
		return userMapper.updateUser(user) == 1 ? true : false;
	}

	@Override
	public boolean deleteUser(long id) {
		return userMapper.deleteUser(id) == 1 ? true : false;
	}

}
