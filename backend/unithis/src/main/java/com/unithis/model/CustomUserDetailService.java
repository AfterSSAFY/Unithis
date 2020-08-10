package com.unithis.model;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.unithis.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

	private final UserMapper userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User result = userRepository.findUserByEmail(email);
		if (result == null) {
			throw new UsernameNotFoundException("사용자를 찾을 수 없음");
		}
		return result;
	}
}