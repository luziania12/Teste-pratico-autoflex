package com.autoflex.dto;

public class ProductionAvailabilityDTO {
    public Long productId;
    public String productName;
    public Integer maxQuantity;

    public ProductionAvailabilityDTO() {}

    public ProductionAvailabilityDTO(Long productId, String productName, Integer maxQuantity) {
        this.productId = productId;
        this.productName = productName;
        this.maxQuantity = maxQuantity;
    }
}