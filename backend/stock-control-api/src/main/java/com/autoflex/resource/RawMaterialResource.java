package com.autoflex.resource;

import com.autoflex.entity.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @GET
    public List<RawMaterial> list() {
        return RawMaterial.listAll();
    }

    @GET
    @Path("/{id}")
    public RawMaterial findById(@PathParam("id") Long id) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            throw new NotFoundException("Raw material not found: id=" + id);
        }
        return entity;
    }

    @POST
    @Transactional
    public Response create(RawMaterial rawMaterial) {
        // Garante que não vai tentar inserir ID manualmente
        rawMaterial.id = null;

        // Se vier "quantity" no JSON, o Jackson vai preencher stockQuantity (por causa do @JsonProperty)
        // Se vier nulo, a validação (@NotNull) vai falhar e vai retornar erro de validação.
        rawMaterial.persist();

        return Response.status(Response.Status.CREATED)
                .entity(rawMaterial)
                .build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public RawMaterial update(@PathParam("id") Long id, RawMaterial rawMaterial) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            throw new NotFoundException("Raw material not found: id=" + id);
        }

        entity.name = rawMaterial.name;
        entity.stockQuantity = rawMaterial.stockQuantity;

        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = RawMaterial.deleteById(id);
        if (!deleted) {
            throw new NotFoundException("Raw material not found: id=" + id);
        }
        return Response.noContent().build();
    }
}