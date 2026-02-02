import { LoginComponent } from "../componentS/logincomponent.js";
import { MenuComponent } from "../componentS/menuComponent.js"; 
import { ProfileComponent } from "../componentS/ProfileComponent.js";
import { AdminComponent } from "../componentS/adminComponent.js";
const routes = {
    "login": new LoginComponent(),
    "menu": new MenuComponent(), 
    "profile": new ProfileComponent(),
    "admin": new AdminComponent()
};

// 3. Agrega 'async' a la función router
export async function router() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const hash = location.hash || "#/login";
    const path = hash.split('/')[1] || "login";

    // PROTECCIÓN DE RUTAS (Impecable)
    if (!user && path !== "login") {
        window.location.hash = "#/login";
        return;
    }

    if (user && path === "admin" && user.role !== "admin") {
        alert("Acceso denegado: No eres administrador");
        window.location.hash = "#/menu";
        return;
    }

    const component = routes[path];
    const appContainer = document.querySelector("#app");
    
    if (!appContainer) return;

    if (component) {
        // 4. USA AWAIT AQUÍ: fundamental para que carguen los datos del JSON
        appContainer.innerHTML = await component.render(); 

        // 5. Ejecutamos la lógica
        component.init();
    } else {
        appContainer.innerHTML = "<h1>404 - Página no encontrada</h1>";
    }

    console.log(`Navegando a: ${path}`);
}