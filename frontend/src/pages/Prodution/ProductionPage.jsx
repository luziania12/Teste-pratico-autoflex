import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function ProductionPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: "", text: "" });

    async function load() {
        try {
            setLoading(true);
            setMsg({ type: "", text: "" });
            const res = await api.get("/production-available");
            setItems(res.data || []);
        } catch {
            setMsg({ type: "error", text: "Error loading available production. Check the backend." });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    return (
        <>
            <div className="page-title">
                <div>
                    <h1>Available Production</h1>
                    <p>Shows the maximum quantity that can be produced based on associations and current inventory.</p>
                </div>
                <div className="actions">
                    <button onClick={load} className="btn-green" disabled={loading}>Reload</button>
                </div>
            </div>

            {msg.text && <div className={`alert ${msg.type}`}>{msg.text}</div>}

            <div className="card">
                <h2>List</h2>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: 140 }}>productId</th>
                                <th>productName</th>
                                <th style={{ width: 180 }}>maxQuantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((it, idx) => (
                                <tr key={it.productId ?? idx}>
                                    <td>{it.productId}</td>
                                    <td>{it.productName}</td>
                                    <td>{it.maxQuantity}</td>
                                </tr>
                            ))}
                            {!items.length && (
                                <tr><td colSpan="3">No data. Register products, raw materials, and partnerships.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}