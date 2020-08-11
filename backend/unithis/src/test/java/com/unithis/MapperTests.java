package com.unithis;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.unithis.mapper.UserMapper;
import com.unithis.model.User;

@SpringBootTest
class MapperTests {

	@Autowired
	private UserMapper userMapper;

	@Test
	public void testOfInsert() {
		User params = User.builder().email("insertID@test.com").nickname("insertion with id").password("test1234")
				.phone("101930230").address("Sejongsi ").build();

		int result = userMapper.createUser(params);
		System.out.println("결과는 " + result + "입니다.");
	}

	@Test
	public void testOfSelectDetail() {
		User board = userMapper.getUserInfoById((long) 8);
		try {
			String boardJson = new ObjectMapper().writeValueAsString(board);

			System.out.println("=========================");
			System.out.println(boardJson);
			System.out.println("=========================");

		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}

	@Test
	public void testOfUpdate() {
		User params = userMapper.getUserInfoById((long) 8);
		params.setNickname("updatedNickname");
		params.setPassword("newpwd");

		int result = userMapper.updateUser(params);
		if (result == 1) {
			User board = userMapper.getUserInfoById((long) 8);
			try {
				String boardJson = new ObjectMapper().writeValueAsString(board);

				System.out.println("=========================");
				System.out.println(boardJson);
				System.out.println("=========================");

			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
		}
	}

	@Test
	public void testOfDelete() {
		int result = userMapper.deleteUser((long)8 );
		if (result == 1) {
			User board = userMapper.getUserInfoById((long) 8);
			try {
				String boardJson = new ObjectMapper().writeValueAsString(board);

				System.out.println("=========================");
				System.out.println(boardJson);
				System.out.println("=========================");

			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
		}
	}

	@Test
	public void testSelectList() {
		List<User> userList = userMapper.getAllUsers();
		if (CollectionUtils.isEmpty(userList) == false) {
			for (User u : userList) {
				System.out.println("=========================");
				System.out.println(u.getEmail());
				System.out.println(u.getNickname());
				System.out.println("=========================");
			}
		}
	}
}