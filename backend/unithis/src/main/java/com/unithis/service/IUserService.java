package com.unithis.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.unithis.model.User;

public interface IUserService {
	public List<User> getAllUsers();
	public boolean createUser(User user);
	public User getUserInfoById(long id);
	public boolean updateUser(User user);
	public boolean deleteUser(long id);
	public User findUserByEmail(String email);
	public boolean isValidEmail(String email);
	public boolean isValidNickname(String nickname);
	public int updateProfile(MultipartFile image, int id);
	public int deleteProfile(int id);
}
