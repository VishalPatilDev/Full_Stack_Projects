package com.project.e_commerce.dto;

import com.project.e_commerce.entity.Cart;
import com.project.e_commerce.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class CartItemReqDto {

		Long productId;
	    int quantity;

}
