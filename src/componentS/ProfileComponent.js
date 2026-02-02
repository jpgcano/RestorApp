// src/componentS/ProfileComponent.js
export class ProfileComponent {
    async render() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        
        // Traemos pedidos para filtrar
        const response = await fetch("http://localhost:3000/orders");
        const allOrders = await response.json();

        // REQUISITO: .filter() para ver solo MIS pedidos
        const myOrders = allOrders.filter(order => order.userId === user.id);

        return `
            <div class="user-panel">
                <nav class="sidebar">
                    <h2>RestorApp</h2>
                    <ul>
                        <li><a href="#/menu">🍴 Menú</a></li>
                        <li><a href="#/profile" class="active">👤 Perfil</a></li>
                        <li id="logout-item" style="color:red; cursor:pointer; margin-top:20px;">🚪 Salir</li>
                    </ul>
                </nav>

                <main class="content">
                    <section class="orders-section">
                        <h3>Mis Pedidos Recientes</h3>
                        <div class="orders-list">
                            ${myOrders.reverse().map(order => `
                                <div class="product-card" style="margin-bottom: 1rem; flex-direction: row; justify-content: space-between; align-items: center;">
                                    <div>
                                        <strong>Pedido #${order.id.toString().slice(-5)}</strong>
                                        <p style="font-size: 0.8rem; color: gray;">${new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                    <span class="status-tag ${order.status}">${order.status}</span>
                                    <span class="price">$${order.total.toLocaleString()}</span>
                                </div>
                            `).join('') || '<p>Aún no tienes pedidos.</p>'}
                        </div>
                    </section>

                    <aside class="cart-summary">
                        <h3>Mi Perfil</h3>
                        <div class="profile-info" style="text-align:center; padding: 1rem 0;">
                            <div style="font-size: 3rem;">👤</div>
                            <h4>${user.name}</h4>
                            <p style="color: gray;">${user.email}</p>
                            <hr style="margin: 1rem 0; opacity: 0.2;">
                            <p><strong>Pedidos totales:</strong> ${myOrders.length}</p>
                        </div>
                    </aside>
                </main>
            </div>
        `;
    }

    init() {
        document.getElementById('logout-item').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.hash = "#/login";
        });
    }
}