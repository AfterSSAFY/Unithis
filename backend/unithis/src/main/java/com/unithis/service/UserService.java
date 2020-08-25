package com.unithis.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.unithis.mapper.UserMapper;
import com.unithis.model.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {

	private final UserMapper userMapper;
	private final ImageService imageService;

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
		return userMapper.isValidEmail(email) > 0 ? false : true;
	}

	@Override
	public boolean isValidNickname(String nickname) {
		return userMapper.isValidNickname(nickname) > 0 ? false : true;
	}

	@Override
	public int updateProfile(MultipartFile image, long id) {
		return imageService.imageUpload(image, id);
	}

	@Override
	public int deleteProfile(long id) {
		return userMapper.deleteProfile(id);
	}

}
