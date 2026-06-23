package com.smart_inventory.management.model;

import jakarta.persistence.*;

@Entity
@Table(name = "purchase_order_items")
//PO-101
//Laptop 10
//Mouse 20
//Keyboard 15
public class PurchaseOrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "puchase_order_id",nullable = false)
    private PurchaseOrder purchaseOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;

    private Integer quantity;

    private Double price;
}
