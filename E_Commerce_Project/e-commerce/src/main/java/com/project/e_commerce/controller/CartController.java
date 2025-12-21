package com.project.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.e_commerce.config.JwtUtil;
import com.project.e_commerce.dto.CartItemReqDto;
import com.project.e_commerce.dto.CartItemResDto;
import com.project.e_commerce.entity.CartItem;
import com.project.e_commerce.service.CartService;

@RestController
@RequestMapping("/e-commerce")
//@CrossOrigin(origins = "http://localhost:5173")
public class CartController {
	@Autowired
	CartService cartService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/addToCart")
	ResponseEntity<?> addProductToCart(@RequestBody CartItemReqDto dto,@RequestHeader("Authorization") String tokenHeader){
		String token = tokenHeader.substring(7);
	    String username = jwtUtil.extractUsername(token);
	    return ResponseEntity.ok(cartService.addProductToCart(dto, username));
	}
	
	@GetMapping("/cart")
	public ResponseEntity<?> getCart(@RequestHeader("Authorization") String tokenHeader) {
		String token = tokenHeader.substring(7); // remove "Bearer "
	    String username = jwtUtil.extractUsername(token);
	    return ResponseEntity.ok(cartService.getCartItems(username));
	}
	
	@PutMapping("/cartItem/{id}/quantity")
	public ResponseEntity<?> updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
		CartItem updated = cartService.updateQuantity(id, quantity);
		CartItemResDto dto = new CartItemResDto(
				updated.getId(),
		        updated.getProduct().getId(),
		        updated.getProduct().getProductName(),
		        updated.getProduct().getProductDescription(),
		        updated.getProduct().getProductPrice(),
		        updated.getProduct().getProductImage(),
		        updated.getQuantity()
		    );
		return ResponseEntity.ok(dto);
	}
	
	@DeleteMapping("deleteCartItem/{id}")
	ResponseEntity<?> deleteProductFromCart(@PathVariable Long id){
		cartService.deleteProductFromCart(id);
		return ResponseEntity.ok("Deleted !");
	}
	
}
