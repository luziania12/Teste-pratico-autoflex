import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../App.css";

export default function AppLayout() {
    const location = useLocation();

    const isActive = (path) =>
        location.pathname === path || location.pathname.startsWith(path + "/");

    return (
        <div className="app-shell">
            <header className="topbar">
                <div className="topbar-inner">
                    <div className="brand">
                        <div className="brand-logo">A</div>
                        <div className="brand-text">
                            <div className="brand-title">Autoflex</div>
                            <div className="brand-subtitle">Stock Control</div>
                        </div>
                    </div>

                    <nav className="nav">
                        <NavLink className={`nav-link ${isActive("/raw-materials") ? "active" : ""}`} to="/raw-materials">
                            Raw materials
                        </NavLink>
                        <NavLink className={`nav-link ${isActive("/products") ? "active" : ""}`} to="/products">
                            Products
                        </NavLink>
                        <NavLink className={`nav-link ${isActive("/product-materials") ? "active" : ""}`} to="/product-materials">
                          Association
                        </NavLink>
                        <NavLink className={`nav-link ${isActive("/production-available") ? "active" : ""}`} to="/production-available">
                          Production
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className="content">
                <Outlet />
            </main>

            <footer className="footer">
                <span>Stock Control • Quarkus + React</span>
            </footer>
        </div>
    );
}