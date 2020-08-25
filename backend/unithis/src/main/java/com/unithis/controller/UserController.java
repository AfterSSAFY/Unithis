package com.unithis.controller;

import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.unithis.jwt.JwtTokenProvider;
import com.unithis.model.User;
import com.unithis.service.IUserService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class UserController {

	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final IUserService userService;

	@PostMapping("/login")
	@ApiOperation("로그인")
	public ResponseEntity<String> login(@RequestBody Map<String, String> user) {
		log.info("POST : /api/login");

		User member = userService.findUserByEmail(user.get("email"));
		if (member == null) {
			log.info("없는 이메일");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ERROR : 로그인 실패");
		}

		if (!passwordEncoder.matches(user.get("password"), member.getPassword())) {
			log.info("다른 비밀번호");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ERROR : 로그인 실패");
		}
		String tokenValue = jwtTokenProvider.createToken(member);
		if (tokenValue != null) {
			return ResponseEntity.status(HttpStatus.OK).body(tokenValue);
		}
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(null);
	}

	@PostMapping("/join")
	@ApiOperation("회원가입")
	public ResponseEntity<String> join(@RequestBody Map<String, String> user) {
		log.info("POST : /api/join");
		User newUser = User.builder().email(user.get("email")).nickname(user.get("nickname")).phone(user.get("phone"))
				.address(user.get("address")).password(passwordEncoder.encode(user.get("password"))).build();
		boolean joinResult = false;
		try {
			joinResult = userService.createUser(newUser);
		} catch (DataIntegrityViolationException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ERROR : 가입 실패(정보오류)");
		}
		if (joinResult) {
			return ResponseEntity.status(HttpStatus.CREATED).body("SUCC : 가입 완료");
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ERROR : 가입 실패");
	}

	@PostMapping("/token")
	@ApiOperation("토큰 검증")
	public Object token(@RequestBody String access_token) {
		log.info("POST : /api/loginToken");

		String result = null;
		
		System.out.println("여기 : " + access_token);

		if (jwtTokenProvider.validateToken(access_token)) {
			result = jwtTokenProvider.getUserPk(access_token);
			log.info(result.toString());
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(result, HttpStatus.OK);
//			return new ResponseEntity<>("ERROR : 유효하지 않은 토큰", HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping("/user/{id}")
	@ApiOperation("아이디로 유저 정보 조회(해당 유저 아이디, 닉네임)")
	public ResponseEntity<User> findUserById(@PathVariable int id) {
		log.info("GET : /api/user/{id}");
		User resultFoundbyId = userService.getUserInfoById(id);

		if (resultFoundbyId != null) {
			return ResponseEntity.status(HttpStatus.OK).body(resultFoundbyId);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	}

	@PatchMapping("/user")
	@ApiOperation("유저 : 내 정보 수정")
	public ResponseEntity<String> updateUser(@RequestBody Map<String, String> userInfo) {
		log.info("PATCH : /api/users/{num} = " + userInfo.get("id"));
		User reqUpdateUserInfo = User.builder().id((long) Integer.parseInt(userInfo.get("id")))
				.nickname(userInfo.get("nickname")).password(passwordEncoder.encode(userInfo.get("password")))
				.phone(userInfo.get("phone")).address(userInfo.get("address")).build();

		if (!userService.updateUser(reqUpdateUserInfo)) {
			log.error("update failed");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR : 정보수정 불가");
		}

		User user = userService.findUserByEmail(reqUpdateUserInfo.getEmail());

		String tokenValue = jwtTokenProvider.createToken(user);
		if (tokenValue != null) {
			return ResponseEntity.status(HttpStatus.OK).body(tokenValue);
		}
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(null);
	}

	@DeleteMapping("/user/{id}")
	@ApiOperation("유저 : 회원정보 삭제 및 탈퇴")
	public ResponseEntity<String> deleteUser(@PathVariable("id") long id) {
		log.info("DELETE : /api/user/{num} = " + id);

		if (!userService.deleteUser(id)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR : 탈퇴 실패");
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("SUCC : 탈퇴 성공");
	}

	@GetMapping("/validation/email")
	@ApiOperation("중복 판단 : 이메일 중복체크")
	public ResponseEntity<String> duplicatedEmail(@RequestParam(required = true) String email) {
		log.info("이메일 중복 검사 : " + email);

		if (!userService.isValidEmail(email)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ERROR : 중복 이메일");
		}
		return ResponseEntity.status(HttpStatus.OK).body("SUCC : 허용 이메일");
	}
	
	@GetMapping("/validation/nickname")
	@ApiOperation("중복 판단 : 닉네임 중복체크")
	public ResponseEntity<String> duplicatedNickname(@RequestParam(required = true) String nickname) {
		log.info("닉네임 중복 검사 : " + nickname);
		
		if (!userService.isValidNickname(nickname)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ERROR : 중복 닉네임");
		}
		return ResponseEntity.status(HttpStatus.OK).body("SUCC : 허용 닉네임");
	}
	
	@PostMapping("/user/profile")
	@ApiOperation("유저 프로필 사진 변경")
	public ResponseEntity<String> updateProfile(@RequestParam int id, @RequestPart MultipartFile image) {
		log.info("UserController : updateProfile");
		
		if(userService.updateProfile(image, id) == 0) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ERROR : 프로필 사진 변경 실패");
		}
		return ResponseEntity.status(HttpStatus.OK).body("SUCC : 프로필 사진 변경 성공");
	}
	
	@DeleteMapping("/user/profile")
	@ApiOperation("유저 프로필 사진 삭제")
	public ResponseEntity<String> deleteProfile(@RequestParam int id) {
		log.info("UserController : deleteProfile");
		
		if(userService.deleteProfile(id) == 0) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ERROR : 프로필 사진 삭제 실패");
		}
		return ResponseEntity.status(HttpStatus.OK).body("SUCC : 프로필 사진 삭제 성공");
	}
	
}
