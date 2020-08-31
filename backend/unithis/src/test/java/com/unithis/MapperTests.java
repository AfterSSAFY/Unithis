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
		User newUser = User.builder()
				.id(params.getId())
				.password("newpwd")
				.nickname("newNickname")
				.address(params.getAddress())
				.phone(params.getPhone())
				.email(params.getEmail())
				.build();

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

}