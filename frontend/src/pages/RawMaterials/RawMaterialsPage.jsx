import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function RawMaterialsPage() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: "", text: "" });

    async function load() {
        try {
            setLoading(true);
            setMsg({ type: "", text: "" });
            const res = await api.get("/raw-materials");
            setItems(res.data || []);
        } catch {
            setMsg({ type: "error", text: "Error loading raw materials. Check the backend (8080)." });
        } finally {
            setLoading(false);
        }
    }

    async function create(e) {
        e.preventDefault();
        setMsg({ type: "", text: "" });

        if (!name.trim()) return setMsg({ type: "error", text: "Enter the name." });
        if (quantity === "" || Number(quantity) < 0) return setMsg({ type: "error", text: "Enter a valid quantity (>= 0)." });

        try {
            setLoading(true);
            await api.post("/raw-materials", { name: name.trim(), quantity: Number(quantity) });
            setName("");
            setQuantity("");
            setMsg({ type: "ok", text: "Raw material registered." });
            await load();
        } catch {
            setMsg({ type: "error", text: "Error registering raw material. Check name and quantity." });
        } finally {
            setLoading(false);
        }
    }

    async function remove(id) {
        if (!window.confirm("Delete this raw material?")) return;
        try {
            setLoading(true);
            await api.delete(`/raw-materials/${id}`);
            setMsg({ type: "ok", text: "Raw material deleted." });
            await load();
        } catch {
            setMsg({ type: "error", text: "Error deleting raw material." });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    return (
        <>
            <div className="page-title">
                <div>
                    <h1>Raw materials</h1>
                    <p>Registration and inventory control.</p>
                </div>
                <div className="actions">
                    <button onClick={load} disabled={loading}>Recharge</button>
                </div>
            </div>

            {msg.text && <div className={`alert ${msg.type}`}>{msg.text}</div>}

            <div className="card">
                <h2>Register raw material</h2>
                <form onSubmit={create}>
                    <div className="row">
                        <div className="col">
                            <label>Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Plastic" />
                        </div>
                        <div className="col">
                            <label>Quantity in stock</label>
                            <input type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Ex.: 100" />
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
                <h2>Lista</h2>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: 90 }}>ID</th>
                                <th>Name</th>
                                <th style={{ width: 220 }}>Quantity (stock)</th>
                                <th style={{ width: 160, textAlign: "right" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((rm) => (
                                <tr key={rm.id}>
                                    <td>{rm.id}</td>
                                    <td>{rm.name}</td>
                                    <td>{rm.quantity}</td>
                                    <td className="td-actions">
                                        <button className="btn-danger" onClick={() => remove(rm.id)} disabled={loading}>Delete</button>
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