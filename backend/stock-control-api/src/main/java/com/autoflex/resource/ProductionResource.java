package com.autoflex.resource;

import com.autoflex.dto.ProductionAvailabilityDTO;
import com.autoflex.entity.Product;
import com.autoflex.entity.ProductMaterial;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.*;
import java.util.stream.Collectors;

@Path("/production-available")
@Produces(MediaType.APPLICATION_JSON)
public class ProductionResource {

    @GET
    public List<ProductionAvailabilityDTO> listAvailable() {

        List<Product> products = Product.listAll();
        List<ProductMaterial> links = ProductMaterial.listAll();

        Map<Long, List<ProductMaterial>> byProductId = links.stream()
                .filter(pm -> pm.product != null && pm.product.id != null)
                .collect(Collectors.groupingBy(pm -> pm.product.id));

        List<ProductionAvailabilityDTO> result = new ArrayList<>();

        for (Product p : products) {
            List<ProductMaterial> materials = byProductId.getOrDefault(p.id, Collections.emptyList());

            if (materials.isEmpty()) {
                result.add(new ProductionAvailabilityDTO(p.id, p.name, 0));
                continue;
            }

            int max = Integer.MAX_VALUE;

            for (ProductMaterial pm : materials) {
                if (pm.rawMaterial == null || pm.rawMaterial.stockQuantity == null
                        || pm.quantityNeeded == null || pm.quantityNeeded <= 0) {
                    max = 0;
                    break;
                }

                int possible = pm.rawMaterial.stockQuantity / pm.quantityNeeded;
                max = Math.min(max, possible);
            }

            result.add(new ProductionAvailabilityDTO(p.id, p.name, max));
        }

        return result;
    }
}