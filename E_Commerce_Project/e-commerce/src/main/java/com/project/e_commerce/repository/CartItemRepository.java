package com.project.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.e_commerce.entity.Cart;
import com.project.e_commerce.entity.CartItem;
import com.project.e_commerce.entity.Product;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	CartItem findByCartAndProduct(Cart cart, Product product);

}
