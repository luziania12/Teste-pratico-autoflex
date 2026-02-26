import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function ProductionAvailablePage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadData() {
        try {
            setLoading(true);
            setError("");
            const res = await api.get("/production-available");
            setItems(res.data || []);
        } catch (err) {
            setError("Error calculating available production.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="row g-3">
            <div className="col-12 d-flex justify-content-between align-items-center">
                <h2 className="m-0">Production available</h2>
                <button className="btn btn-outline-secondary" onClick={loadData}>
                    Recalculate
                </button>
            </div>

            <div className="col-12">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <p className="text-muted mb-3">
                            Lists the maximum quantity that can be produced with the current stock.
                        </p>

                        {error && <div className="alert alert-danger py-2">{error}</div>}
                        {loading && <p className="text-muted mb-0">Loading...</p>}

                        {!loading && !error && (
                            <div className="table-responsive">
                                <table className="table table-sm align-middle">
                                    <thead>
                                        <tr>
                                            <th style={{ width: 120 }}>Product ID</th>
                                            <th>Product</th>
                                            <th className="text-end">Maximum</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((it) => (
                                            <tr key={it.productId}>
                                                <td>{it.productId}</td>
                                                <td>{it.productName}</td>
                                                <td className="text-end">{it.maxQuantity}</td>
                                            </tr>
                                        ))}
                                        {items.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="text-muted">
                                                    No product available for production (check partnerships and stock).
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}