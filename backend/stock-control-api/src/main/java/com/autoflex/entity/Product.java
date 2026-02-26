package com.autoflex.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product extends PanacheEntity {

    @NotBlank
    public String name;

    @NotNull
    @DecimalMin("0.0")
    @Column(precision = 12, scale = 2)
    public BigDecimal price;
}