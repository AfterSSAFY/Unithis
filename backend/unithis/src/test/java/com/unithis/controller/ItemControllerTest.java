package com.unithis.controller;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unithis.model.ItemRequest;

public class ItemControllerTest {

	private ItemRequest item;
	
	@Autowired
	private MockMvc mockMvc;
	
	@GetMapping("/test")
	@ResponseBody
	public String testContrller() {
		return "test";
	}
	
	@Before
	public void init() {
		item = ItemRequest.builder()
				.id(1)
				.userId(1)
				.title("테스트")
				.contents("테스트입니다")
				.need("무엇을 원하는지").build();
	}
	
	@Test
	public void createItem() throws Exception {
		mockMvc.perform(post("/test")
				.contentType(MediaType.MULTIPART_FORM_DATA))
				.andDo(print())
				.andExpect(status().isOk());
	}
	
	@Test
	public void getItemId() {
		init();
		assertEquals(1, item.getId());
	}
	
}