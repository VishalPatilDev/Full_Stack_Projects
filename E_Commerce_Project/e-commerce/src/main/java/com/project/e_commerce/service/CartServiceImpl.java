package com.project.e_commerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.e_commerce.dto.CartItemReqDto;
import com.project.e_commerce.dto.CartItemResDto;
import com.project.e_commerce.entity.Cart;
import com.project.e_commerce.entity.CartItem;
import com.project.e_commerce.entity.Product;
import com.project.e_commerce.entity.User;
import com.project.e_commerce.repository.CartItemRepository;
import com.project.e_commerce.repository.CartRepository;
import com.project.e_commerce.repository.ProductRepository;
import com.project.e_commerce.repository.UserRepository;

@Service
public class CartServiceImpl implements CartService {
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
    private CartRepository cartRepository;
	
	@Autowired
	private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

	@Override
	public CartItem addProductToCart(CartItemReqDto dto,String username) {
		// fetch product by ID
        Product product = productRepository.findById(dto.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));
        
        // Fetch user
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

     // Fetch or create cart for this user
        Cart cart = cartRepository.findByUserUsername(username)
                .orElseGet(() -> {
                    // 2️⃣ If cart doesn't exist, create it
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
        
        CartItem existingItem = cartItemRepository.findByCartAndProduct(cart, product);
        if (existingItem != null) {
            // product exists in cart -> update quantity
            existingItem.setQuantity(existingItem.getQuantity() + dto.getQuantity());
            return cartItemRepository.save(existingItem);
        }

     // product not in cart -> create new item
        CartItem newItem = CartItem.builder()
                .product(product)
                .quantity(dto.getQuantity())
                .cart(cart)
                .build();

        return cartItemRepository.save(newItem);
	}

	@Override
	public List<CartItemResDto> getCartItems(String username) {
		
		Cart cart = cartRepository.findByUserUsername(username)
	            .orElseGet(() -> {
	                // Create an empty cart for new users
	                User user = userRepository.findByUsername(username)
	                        .orElseThrow(() -> new RuntimeException("User not found"));
	                Cart newCart = new Cart();
	                newCart.setUser(user);
	                return cartRepository.save(newCart);
	            });

	    return cart.getItems().stream().map(item -> new CartItemResDto(
	    		item.getId(),
	        item.getProduct().getId(),
	        item.getProduct().getProductName(),
	        item.getProduct().getProductDescription(),
	        item.getProduct().getProductPrice(),
	        item.getProduct().getProductImage(),
	        item.getQuantity()
	    )).toList();
	}

	@Override
	public CartItem updateQuantity(Long id, int quantity) {
		CartItem c=  cartItemRepository.findById(id).orElse(null);
		c.setQuantity(quantity);
		return cartItemRepository.save(c);
	}

	@Override
	public void deleteProductFromCart(Long id) {
		 cartItemRepository.deleteById(id);
	}

}
