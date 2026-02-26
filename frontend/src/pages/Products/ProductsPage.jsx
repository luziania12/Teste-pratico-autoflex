import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function ProductsPage() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: "", text: "" });

    async function load() {
        try {
            setLoading(true);
            setMsg({ type: "", text: "" });
            const res = await api.get("/products");
            setItems(res.data || []);
        } catch {
            setMsg({ type: "error", text: "Error loading products." });
        } finally {
            setLoading(false);
        }
    }

    async function create(e) {
        e.preventDefault();
        setMsg({ type: "", text: "" });

        if (!name.trim()) return setMsg({ type: "error", text: "Enter the name." });
        if (price === "" || Number(price) < 0) return setMsg({ type: "error", text: "Enter a valid price (>= 0)." });

        try {
            setLoading(true);
            await api.post("/products", { name: name.trim(), price: Number(price) });
            setName("");
            setPrice("");
            setMsg({ type: "ok", text: "Product registered." });
            await load();
        } catch {
            setMsg({ type: "error", text: "Error registering product." });
        } finally {
            setLoading(false);
        }
    }

    async function remove(id) {
        if (!window.confirm("Delete this product?")) return;
        try {
            setLoading(true);
            await api.delete(`/products/${id}`);
            setMsg({ type: "ok", text: "Product deleted." });
            await load();
        } catch {
            setMsg({ type: "error", text: "Error deleting product." });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    return (
        <>
            <div className="page-title">
                <div>
                    <h1>Products</h1>
                    <p>Product registration (name and price).</p>
                </div>
                <div className="actions">
                    <button onClick={load} disabled={loading}>Reload</button>
                </div>
            </div>

            {msg.text && <div className={`alert ${msg.type}`}>{msg.text}</div>}

            <div className="card">
                <h2>Register product</h2>
                <form onSubmit={create}>
                    <div className="row">
                        <div className="col">
                            <label>Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Notebook" />
                        </div>
                        <div className="col">
                            <label>Price</label>
                            <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex.: 3500" />
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
                                <th>Name</th>
                                <th style={{ width: 220 }}>Price</th>
                                <th style={{ width: 160, textAlign: "right" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.price}</td>
                                    <td className="td-actions">
                                        <button className="btn-danger" onClick={() => remove(p.id)} disabled={loading}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {!items.length && (
                                <tr><td colSpan="4">No items registered.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}