package com.autoflex.resource;

import com.autoflex.entity.Product;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @GET
    public List<Product> list() {
        return Product.listAll();
    }

    @GET
    @Path("/{id}")
    public Product findById(@PathParam("id") Long id) {
        Product p = Product.findById(id);
        if (p == null) throw new NotFoundException();
        return p;
    }

    @POST
    @Transactional
    public Product create(Product product) {
        product.persist();
        return product;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Product update(@PathParam("id") Long id, Product product) {
        Product entity = Product.findById(id);
        if (entity == null) throw new NotFoundException();

        entity.name = product.name;
        entity.price = product.price;
        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        boolean deleted = Product.deleteById(id);
        if (!deleted) throw new NotFoundException();
    }
}