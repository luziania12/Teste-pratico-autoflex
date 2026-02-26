import { NavLink } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            {/* Título principal da página */}
            <div className="page-title">
                <div>
                    {/* Cabeçalho do painel principal */}
                    <h1>Dashboard</h1>

                    {/* Descrição resumida do sistema */}
                    <p>
                        Register raw materials, manage products, create associations,
                        and check production availability.
                    </p>
                </div>
            </div>

            {/* Linha principal contendo os cards de navegação */}
            <div className="row">

                {/* Card de Matérias-Primas */}
                <div className="card col">
                    <h2>Raw Materials</h2>

                    {/* Pequena descrição do módulo */}
                    <p style={{ color: "#6b7280", fontSize: 13, marginTop: -6 }}>
                        Register and control stock.
                    </p>

                    {/* Botão que leva para a página de matérias-primas */}
                    <NavLink to="/raw-materials">
                        <button className="btn-green">Open</button>
                    </NavLink>
                </div>

                {/* Card de Produtos */}
                <div className="card col">
                    <h2>Products</h2>

                    <p style={{ color: "#6b7280", fontSize: 13, marginTop: -6 }}>
                        Register products (name + price).
                    </p>

                    {/* Botão que leva para a página de produtos */}
                    <NavLink to="/products">
                        <button className="btn-green">Open</button>
                    </NavLink>
                </div>

                {/* Card de Associação Produto x Matéria-Prima */}
                <div className="card col">
                    <h2>Association</h2>

                    <p style={{ color: "#6b7280", fontSize: 13, marginTop: -6 }}>
                        Link products to raw materials with required quantity.
                    </p>

                    {/* Rota correta para associação */}
                    <NavLink to="/product-materials">
                        <button className="btn-green">Open</button>
                    </NavLink>
                </div>

                {/* Card de Produção Disponível */}
                <div className="card col">
                    <h2>Production Available</h2>

                    <p style={{ color: "#6b7280", fontSize: 13, marginTop: -6 }}>
                        Shows the maximum quantity that can be produced.
                    </p>

                    {/* Rota correta para consulta de produção */}
                    <NavLink to="/production-available">
                        <button className="btn-green">View</button>
                    </NavLink>
                </div>
            </div>
        </>
    );
}