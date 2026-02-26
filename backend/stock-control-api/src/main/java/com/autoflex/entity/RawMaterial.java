package com.autoflex.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "raw_materials")
public class RawMaterial extends PanacheEntity {

    @NotBlank(message = "name is required")
    @Column(nullable = false)
    public String name;

    // O JSON vai mandar "quantity"
    // Mas no banco a coluna é "stock_quantity"
    @NotNull(message = "quantity is required")
    @JsonProperty("quantity")
    @Column(name = "stock_quantity", nullable = false)
    public Integer stockQuantity;
}