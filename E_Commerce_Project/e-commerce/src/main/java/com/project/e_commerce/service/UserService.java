package com.project.e_commerce.service;

import com.project.e_commerce.dto.SignInDto;
import com.project.e_commerce.entity.User;

public interface UserService {

	String signup(SignInDto dto);

}
