import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    Stock Control
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="menu">
                    <div className="navbar-nav ms-auto gap-2">
                        <NavLink
                            className={({ isActive }) =>
                                "btn btn-sm " + (isActive ? "btn-light" : "btn-outline-light")
                            }
                            to="/raw-materials"
                        >
                            Raw materials
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                "btn btn-sm " + (isActive ? "btn-light" : "btn-outline-light")
                            }
                            to="/products"
                        >
                            Products
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}