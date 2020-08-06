package com.unithis.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.unithis.model.User;
import com.unithis.service.impl.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {
	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@PostMapping("/signin")
//	@ApiOperation("로그인")
	public User login(@RequestParam String email, @RequestParam String password) {
		logger.info("POST : /api/signin");
		User userInfo = User.builder().email(email).password(password).build();
		int loginChkResult = userService.checkLoginValidation(userInfo);
		if (loginChkResult > 0) {
			return userService.readUserInfoById(loginChkResult);
		}

		return null;
	}
}
