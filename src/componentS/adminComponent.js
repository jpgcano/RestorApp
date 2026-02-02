// src/componentS/adminComponent.js
export class AdminComponent {
    async render() {
        const response = await fetch("http://localhost:3000/orders");
        const orders = await response.json();

        return `
            <div class="admin-container">
                <header class="user-panel-header" style="padding: 1rem 0;">
                    <div class="logo">🛡️ Admin Panel</div>
                    <nav class="nav-links">
                        <a href="#/menu">Ir al Menú</a>
                        <a href="#/login" id="logout-admin">Cerrar Sesión</a>
                    </nav>
                </header>

                <main style="margin-top: 2rem;">
                    <div class="cart-summary" style="width: 100%; margin-bottom: 2rem; display: flex; justify-content: space-around;">
                        <div><strong>Total Ventas:</strong> $${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}</div>
                        <div><strong>Pedidos Pendientes:</strong> ${orders.filter(o => o.status === 'pendiente').length}</div>
                    </div>

                    <div class="product-card" style="width: 100%; padding: 0;">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orders.reverse().map(order => `
                                    <tr>
                                        <td>#${order.id.toString().slice(-5)}</td>
                                        <td>ID: ${order.userId}</td>
                                        <td>$${order.total.toLocaleString()}</td>
                                        <td><span class="status-tag ${order.status}">${order.status}</span></td>
                                        <td>
                                            <select class="change-status" data-id="${order.id}" style="padding: 5px; border-radius: 5px;">
                                                <option value="pendiente" ${order.status === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                                                <option value="preparando" ${order.status === 'preparando' ? 'selected' : ''}>Preparando</option>
                                                <option value="listo" ${order.status === 'listo' ? 'selected' : ''}>Listo</option>
                                                <option value="entregado" ${order.status === 'entregado' ? 'selected' : ''}>Entregado</option>
                                            </select>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        `;
    }

    init() {
        document.querySelectorAll('.change-status').forEach(select => {
            select.addEventListener('change', async (e) => {
                const id = e.target.dataset.id;
                const newStatus = e.target.value;
                
                // Actualización en BD.json (PATCH)
                await fetch(`http://localhost:3000/orders/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });
                
                alert("Estado actualizado");
                window.location.reload(); // Refrescamos para ver el cambio
            });
        });

        document.getElementById('logout-admin')?.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
        });
    }
}