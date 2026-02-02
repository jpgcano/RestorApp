// src/componentS/menuComponent.js
export class MenuComponent {
    constructor() {
        this.cart = [];     // Estado local para los productos seleccionados
        this.products = []; // Guardamos los productos del servidor aquí
    }

    async render() {
        try {
            // Módulo 5: Persistencia - Traemos el menú desde el JSON-Server
            const response = await fetch("http://localhost:3000/menu");
            this.products = await response.json();

            return `
                <div class="user-panel">
                    <nav class="sidebar">
                        <h2>RestorApp</h2>
                        <ul>
                            <li><a href="#/menu" class="active">🍴 Menú</a></li>
                            <li><a href="#/orders">📦 Mis Pedidos</a></li>
                            <li><a href="#/profile">👤 Perfil</a></li>
                            <li id="logout-item" style="cursor:pointer; color: #ff4444;">🚪 Cerrar Sesión</li>
                        </ul>
                    </nav>

                    <main class="content">
                        <section class="menu-section">
                            <h3>Nuestro Menú</h3>
                            <div class="product-grid">
                                ${this.products.map(p => `
                                    <div class="product-card">
                                        <h4>${p.name}</h4>
                                        <p class="category">${p.category}</p>
                                        <p class="price">$${p.price.toLocaleString()}</p>
                                        <button class="add-btn" data-id="${p.id}">Agregar</button>
                                    </div>
                                `).join('')}
                            </div>
                        </section>

                        <aside class="cart-summary">
                            <h3>Tu Pedido</h3>
                            <div id="cart-list" class="cart-items-container">
                                <p class="empty-msg">El carrito está vacío</p>
                            </div>
                            <div class="cart-total">
                                <strong>Total: $<span id="total-amount">0</span></strong>
                            </div>
                            <button id="confirm-order" disabled class="btn-confirm">Confirmar Pedido</button>
                        </aside>
                    </main>
                </div>
            `;
        } catch (error) {
            console.error("Error en render:", error);
            return `<h1>Error al cargar el menú. Por favor, verifica que json-server esté corriendo.</h1>`;
        }
    }

    init() {
        // 1. Listeners para los botones "Agregar" (Usamos delegación o forEach)
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.addToCart(id);
            });
        });

        // 2. Evento para cerrar sesión
        const logoutBtn = document.getElementById('logout-item');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                window.location.hash = "#/login";
            });
        }

        // 3. Evento para Confirmar Pedido (Persistencia Real)
        const confirmBtn = document.getElementById('confirm-order');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', async () => {
                await this.handleConfirmOrder();
            });
        }
    }

    addToCart(id) {
        // REQUISITO: Uso de FIND para buscar el producto en la lista cargada
        const product = this.products.find(p => p.id == id);
        
        if (product) {
            this.cart.push({ ...product, tempId: Date.now() }); // Agregamos copia con ID temporal
            this.updateCartUI();
        }
    }

    updateCartUI() {
        const cartList = document.getElementById('cart-list');
        const totalSpan = document.getElementById('total-amount');
        const confirmBtn = document.getElementById('confirm-order');

        if (this.cart.length === 0) {
            cartList.innerHTML = `<p class="empty-msg">El carrito está vacío</p>`;
            totalSpan.innerText = "0";
            confirmBtn.disabled = true;
            return;
        }

        // REQUISITO: Uso de MAP para renderizar el resumen del pedido
        cartList.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>$${item.price.toLocaleString()}</span>
            </div>
        `).join('');

        // REQUISITO: Uso de REDUCE para el cálculo del total
        const total = this.cart.reduce((acc, item) => acc + item.price, 0);
        totalSpan.innerText = total.toLocaleString();
        confirmBtn.disabled = false;
    }

    async handleConfirmOrder() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        
        const newOrder = {
            id: Date.now(),
            userId: user.id,
            items: this.cart,
            total: this.cart.reduce((acc, i) => acc + i.price, 0),
            status: "pendiente",
            createdAt: new Date().toISOString()
        };

        try {
            // Módulo 5: Persistencia real enviando el pedido al servidor
            const response = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder)
            });

            if (response.ok) {
                alert("¡Pedido realizado con éxito!");
                this.cart = [];
                this.updateCartUI();
            }
        } catch (error) {
            alert("Error al conectar con el servidor.");
        }
    }
}