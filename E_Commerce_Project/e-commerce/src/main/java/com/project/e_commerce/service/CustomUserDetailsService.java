package com.project.e_commerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.e_commerce.entity.User;
import com.project.e_commerce.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User u = userRepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("User Not Found !"));
		
		return org.springframework.security.core.userdetails.User.withUsername(u.getUsername())
				.password(u.getPassword())
				.roles(u.getRole())
				.build();
	}

}
