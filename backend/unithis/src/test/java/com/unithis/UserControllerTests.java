package com.unithis;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unithis.jwt.JwtTokenProvider;
import com.unithis.service.impl.UserService;
import com.unithis.model.User;
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean // postService에 가짜 Bean을 등록
	private UserService userService;
	
	@MockBean // postService에 가짜 Bean을 등록
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private ObjectMapper objectMapper;

    @Test
    public void shouldNotAllowAccessToUnauthenticatedUsers() throws Exception {
    	mockMvc.perform(MockMvcRequestBuilders.post("/api/login")).andExpect(status().isBadRequest());
    }


	@Test
	public void testUserJoinSuccess() throws Exception {

		MultiValueMap<String, String> info = new LinkedMultiValueMap<>();

		info.add("email", "testjoin1@test.com");
		info.add("password", "hongju1004");
		info.add("nickname", "hongjuqueen");
		info.add("phone", "0101112222");
		info.add("address", "덕명동 학하서로");

		String content = objectMapper.writeValueAsString(info);

		MvcResult testResult = mockMvc.perform(post("/api/join").params(info).content(content)
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print()).andReturn();
		String result = testResult.getResponse().getContentAsString();
		System.out.println("========================");
		System.out.println(result);
		System.out.println("========================");
	}

}
