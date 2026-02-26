import { useEffect, useState } from "react";
import { api } from "../../services/api";


export default function ProductMaterialsPage() {
    const [products, setProducts] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);
    const [links, setLinks] = useState([]);

    const [productId, setProductId] = useState("");
    const [rawMaterialId, setRawMaterialId] = useState("");
    const [quantityNeeded, setQuantityNeeded] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadAll() {
        try {
            setLoading(true);
            setError("");

            const [p, rm, pm] = await Promise.all([
                api.get("/products"),
                api.get("/raw-materials"),
                api.get("/product-materials"),
            ]);

            setProducts(p.data || []);
            setRawMaterials(rm.data || []);
            setLinks(pm.data || []);
        } catch (err) {
            setError("Error loading data. Check the backend (8080).");
        } finally {
            setLoading(false);
        }
    }

    async function createLink(e) {
        e.preventDefault();
        setError("");

        const q = Number(quantityNeeded);
        if (!productId) return setError("Select a product.");
        if (!rawMaterialId) return setError("Select a raw material.");
        if (!Number.isFinite(q) || q <= 0) return setError("Invalid quantity needed.");

        try {
            await api.post("/product-materials", {
                product: { id: Number(productId) },
                rawMaterial: { id: Number(rawMaterialId) },
                quantityNeeded: q,
            });

            setQuantityNeeded("");
            await loadAll();
        } catch (err) {
            setError("Error creating association.");
        }
    }

    async function removeLink(id) {
        if (!window.confirm("Remove membership?")) return;
        setError("");
        try {
            await api.delete(`/product-materials/${id}`);
            await loadAll();
        } catch (err) {
            setError("Error removing association.");
        }
    }

    useEffect(() => {
        loadAll();
    }, []);

    return (
        <div className="row g-3">
            <div className="col-12 d-flex justify-content-between align-items-center">
                <h2 className="m-0">Product x Raw Material Association</h2>
                <button className="btn btn-outline-secondary" onClick={loadAll}>
                    Reload
                </button>
            </div>

            <div className="col-12">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="mb-3">Create association</h5>

                        {error && <div className="alert alert-danger py-2">{error}</div>}

                        <form className="row g-2" onSubmit={createLink}>
                            <div className="col-12 col-md-4">
                                <label className="form-label">Product</label>
                                <select
                                    className="form-select"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                >
                                    <option value="">Select...</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            #{p.id} • {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-12 col-md-4">
                                <label className="form-label">Raw material</label>
                                <select
                                    className="form-select"
                                    value={rawMaterialId}
                                    onChange={(e) => setRawMaterialId(e.target.value)}
                                >
                                    <option value="">Select...</option>
                                    {rawMaterials.map((rm) => (
                                        <option key={rm.id} value={rm.id}>
                                            #{rm.id} • {rm.name} (estoque: {rm.quantity})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-12 col-md-2">
                                <label className="form-label">Required quantity</label>
                                <input
                                    className="form-control"
                                    placeholder="Ex.: 5"
                                    value={quantityNeeded}
                                    onChange={(e) => setQuantityNeeded(e.target.value)}
                                />
                            </div>

                            <div className="col-12 col-md-2 d-flex align-items-end">
                                <button className="btn btn-primary w-100" type="submit">
                                    Save
                                </button>
                            </div>
                        </form>

                        {loading && <p className="text-muted mt-3 mb-0">Loading...</p>}
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="mb-3">Registered associations</h5>

                        <div className="table-responsive">
                            <table className="table table-sm align-middle">
                                <thead>
                                    <tr>
                                        <th style={{ width: 90 }}>ID</th>
                                        <th>Product</th>
                                        <th>Raw material</th>
                                        <th className="text-end">Required quantity</th>
                                        <th style={{ width: 110 }} />
                                    </tr>
                                </thead>
                                <tbody>
                                    {links.map((pm) => (
                                        <tr key={pm.id}>
                                            <td>{pm.id}</td>
                                            <td>
                                                #{pm.product?.id} • {pm.product?.name}
                                            </td>
                                            <td>
                                                #{pm.rawMaterial?.id} • {pm.rawMaterial?.name}
                                            </td>
                                            <td className="text-end">{pm.quantityNeeded}</td>
                                            <td className="text-end">
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => removeLink(pm.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {links.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-muted">
                                                No registered associations.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}