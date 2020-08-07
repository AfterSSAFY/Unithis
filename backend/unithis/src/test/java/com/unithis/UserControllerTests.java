package com.unithis;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unithis.controller.UserController;
import com.unithis.service.impl.UserService;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = UserController.class)
public class UserControllerTests {

	@Autowired
	private MockMvc mockMvc;

	  @MockBean // postService에 가짜 Bean을 등록
	    private UserService userService;
	  
	@Autowired
	private ObjectMapper objectMapper;

	@Test
	public void testUserLoginRequestSucess() throws Exception {

		MultiValueMap<String, String> info = new LinkedMultiValueMap<>();

		info.add("email", "testemail@test.com");
		info.add("password", "newpwd");

		String content = objectMapper.writeValueAsString(info);
		
//		mockMvc.perform(post("/api/signin")
//				.contentType(MediaType.APPLICATION_FORM_URLENCODED)
//                .params(info)
//                )
//		.andDo(print())
//		.andExpect(status().isOk())
//		.andReturn()
//		.getResponse()
//		.getContentAsString();
		
		MvcResult testResult = mockMvc.perform(post("/api/signin")
				.params(info)
				.content(content)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
		.andDo(print())
		.andReturn();
		String result = testResult.getResponse().getContentAsString();
		System.out.println("========================");
		System.out.println(result);
		System.out.println("========================");
	}
	
	@Test
	public void testUserLoginRequestFail() throws Exception {
		
		MultiValueMap<String, String> info = new LinkedMultiValueMap<>();
		
		info.add("email", "testm");
		info.add("password", "newpw12d");
		
		String content = objectMapper.writeValueAsString(info);
		
		MvcResult testResult = mockMvc.perform(post("/api/signin")
				.params(info)
				.content(content)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
		.andDo(print())
		.andReturn();
		String result = testResult.getResponse().getContentAsString();
		System.out.println("========================");
		System.out.println(result);
		System.out.println("========================");
	}
}
