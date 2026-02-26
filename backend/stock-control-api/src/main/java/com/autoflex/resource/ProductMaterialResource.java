package com.autoflex.resource;

import com.autoflex.entity.Product;
import com.autoflex.entity.ProductMaterial;
import com.autoflex.entity.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/product-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductMaterialResource {

    @GET
    public List<ProductMaterial> list() {
        return ProductMaterial.listAll();
    }

    @POST
    @Transactional
    public Response create(ProductMaterial payload) {

        if (payload == null) {
            throw new BadRequestException("Body is required");
        }
        if (payload.product == null || payload.product.id == null) {
            throw new BadRequestException("product.id is required");
        }
        if (payload.rawMaterial == null || payload.rawMaterial.id == null) {
            throw new BadRequestException("rawMaterial.id is required");
        }
        if (payload.quantityNeeded == null || payload.quantityNeeded <= 0) {
            throw new BadRequestException("quantityNeeded must be > 0");
        }

        Product product = Product.findById(payload.product.id);
        if (product == null) {
            throw new NotFoundException("Product not found: id=" + payload.product.id);
        }

        RawMaterial rawMaterial = RawMaterial.findById(payload.rawMaterial.id);
        if (rawMaterial == null) {
            throw new NotFoundException("Raw material not found: id=" + payload.rawMaterial.id);
        }

        // Monta a entidade com referências reais do banco
        ProductMaterial entity = new ProductMaterial();
        entity.product = product;
        entity.rawMaterial = rawMaterial;
        entity.quantityNeeded = payload.quantityNeeded;

        entity.persist();

        return Response.status(Response.Status.CREATED).entity(entity).build();
    }
}