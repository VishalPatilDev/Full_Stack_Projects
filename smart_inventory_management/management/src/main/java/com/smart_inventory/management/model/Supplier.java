package com.smart_inventory.management.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "suppliers")
//A company from whom we buy products.
//Dell Distributor
//Samsung Distributor
//HP Distributor
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "supplier_name",nullable = false)
    private String supplierName;

//    @Column(nullable = false)
    private String email;

    private String phone;

    @OneToMany(mappedBy = "supplier")
    private List<Product> products;


}
