package com.unithis.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unithis.mapper.UserMapper;
import com.unithis.model.User;
import com.unithis.service.IUserService;
import com.unithis.service.ItemService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {

	private final UserMapper userMapper;

	@Override
	public List<User> getAllUsers() {
		return userMapper.getAllUsers();
	}

	@Override
	public boolean createUser(User user) {
		return userMapper.createUser(user) == 1 ? true : false;
	}

	@Override
	public User getUserInfoById(long id) {
		return userMapper.getUserInfoById(id);
	}

	@Override
	public boolean updateUser(User user) {
		return userMapper.updateUser(user) == 1 ? true : false;
	}

	@Override
	public boolean deleteUser(long id) {
		return userMapper.deleteUser(id) == 1 ? true : false;
	}

	@Override
	public User findUserByEmail(String email) {
		return userMapper.findUserByEmail(email);
	}

	@Override
	public boolean isValidEmail(String email) {
		// TODO Auto-generated method stub
		return userMapper.isValidEmail(email) == 1 ? true : false;
	}

}
