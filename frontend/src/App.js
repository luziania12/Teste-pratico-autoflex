import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/home/HomePage";
import RawMaterialsPage from "./pages/RawMaterials/RawMaterialsPage";
import ProductsPage from "./pages/Products/ProductsPage";
import AssociationsPage from "./pages/Associations/AssociationsPage";
import ProductionPage from "./pages/Prodution/ProductionPage";




function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="logo" />
          <div className="brand-text">
            <strong>Autoflex</strong>
            <span>Stock Control</span>
          </div>
        </div>

        <div className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Panel</NavLink>
          <NavLink to="/raw-materials" className={({ isActive }) => (isActive ? "active" : "")}>Raw materials</NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Produtos</NavLink>
          <NavLink to="/associations" className={({ isActive }) => (isActive ? "active" : "")}>Association</NavLink>
          <NavLink to="/production" className={({ isActive }) => (isActive ? "active" : "")}>Production</NavLink>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/raw-materials" element={<RawMaterialsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/associations" element={<AssociationsPage />} />
          <Route path="/production" element={<ProductionPage />} />
        </Routes>

        <div className="footer">Practical test • Quarkus + React</div>
      </div>
    </BrowserRouter>
  );
}