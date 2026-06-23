package com.smart_inventory.management.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "sales_order")
//Customer purchases products.
public class SalesOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate orderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by",nullable = false)
    private User createdBy;

    @OneToMany(mappedBy = "salesOrder",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<SalesOrderItem> salesOrderItems;
}
