package com.unithis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.unithis.model.User;

@Mapper
public interface UserMapper {
	public List<User> getAllUsers();
	public int createUser(User user);
	public User getUserInfoById(long id);
	public int updateUser(User user);
	public int deleteUser(long id);
	public User findUserByEmail(String email);
	public int isValidEmail(String email);
	public int isValidNickname(String nickname);
	public int updateProfile(User build);
	public int deleteProfile(int id);	
}
