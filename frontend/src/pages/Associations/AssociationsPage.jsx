import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function AssociationsPage() {
    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [items, setItems] = useState([]);

    const [productId, setProductId] = useState("");
    const [rawMaterialId, setRawMaterialId] = useState("");
    const [quantityNeeded, setQuantityNeeded] = useState("");

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: "", text: "" });

    async function loadAll() {
        try {
            setLoading(true);
            setMsg({ type: "", text: "" });

            const [p, r, a] = await Promise.all([
                api.get("/products"),
                api.get("/raw-materials"),
                api.get("/product-materials"),
            ]);

            setProducts(p.data || []);
            setMaterials(r.data || []);
            setItems(a.data || []);
        } catch {
            setMsg({ type: "error", text: "Error loading data. Check the backend." });
        } finally {
            setLoading(false);
        }
    }

    async function create(e) {
        e.preventDefault();
        setMsg({ type: "", text: "" });

        if (!productId) return setMsg({ type: "error", text: "Select the product." });
        if (!rawMaterialId) return setMsg({ type: "error", text: "Select the raw material." });
        if (quantityNeeded === "" || Number(quantityNeeded) <= 0) return setMsg({ type: "error", text: "Informe quantityNeeded (> 0)." });

        try {
            setLoading(true);
            await api.post("/product-materials", {
                product: { id: Number(productId) },
                rawMaterial: { id: Number(rawMaterialId) },
                quantityNeeded: Number(quantityNeeded),
            });

            setProductId("");
            setRawMaterialId("");
            setQuantityNeeded("");
            setMsg({ type: "ok", text: "Association created." });
            await loadAll();
        } catch {
            setMsg({ type: "error", text: "Error creating association. Check IDs and quantityNeeded." });
        } finally {
            setLoading(false);
        }
    }

    async function remove(id) {
        if (!window.confirm("Remove this association?")) return;
        try {
            setLoading(true);
            await api.delete(`/product-materials/${id}`);
            setMsg({ type: "ok", text: "Association removed." });
            await loadAll();
        } catch {
            setMsg({ type: "error", text: "Error deleting." });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { loadAll(); }, []);

    return (
        <>
            <div className="page-title">
                <div>
                    <h1>Association</h1>
                    <p>It defines how much raw material is needed to produce 1 unit of the product.</p>
                </div>
                <div className="actions">
                    <button onClick={loadAll} disabled={loading}>Recharge</button>
                </div>
            </div>

            {msg.text && <div className={`alert ${msg.type}`}>{msg.text}</div>}

            <div className="card">
                <h2>Create an association</h2>
                <form onSubmit={create}>
                    <div className="row">
                        <div className="col">
                            <label>Product</label>
                            <select value={productId} onChange={(e) => setProductId(e.target.value)}>
                                <option value="">Select...</option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>#{p.id} - {p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col">
                            <label>Raw material</label>
                            <select value={rawMaterialId} onChange={(e) => setRawMaterialId(e.target.value)}>
                                <option value="">Select...</option>
                                {materials.map((m) => (
                                    <option key={m.id} value={m.id}>#{m.id} - {m.name} (stock: {m.quantity})</option>
                                ))}
                            </select>
                        </div>

                        <div className="col">
                            <label>quantityNeeded</label>
                            <input type="number" min="1" value={quantityNeeded} onChange={(e) => setQuantityNeeded(e.target.value)} placeholder="Ex.: 5" />
                        </div>

                        <div className="col" style={{ display: "flex", alignItems: "end" }}>
                            <div className="actions" style={{ width: "100%" }}>
                                <button className="btn-green" disabled={loading}>Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="card">
                <h2>List</h2>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: 90 }}>ID</th>
                                <th>Product</th>
                                <th>Raw material</th>
                                <th style={{ width: 180 }}>quantityNeeded</th>
                                <th style={{ width: 160, textAlign: "right" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>#{a.product?.id} - {a.product?.name}</td>
                                    <td>#{a.rawMaterial?.id} - {a.rawMaterial?.name}</td>
                                    <td>{a.quantityNeeded}</td>
                                    <td className="td-actions">
                                        <button className="btn-danger" onClick={() => remove(a.id)} disabled={loading}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {!items.length && (
                                <tr><td colSpan="5">No registered associations.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}