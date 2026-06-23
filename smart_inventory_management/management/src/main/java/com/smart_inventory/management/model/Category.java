package com.smart_inventory.management.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "categories")
//Electronics, Grocery, Fashion ...
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,nullable = false)
    private String name;
    @OneToMany(mappedBy = "category")
    private List<Product> products;
}
