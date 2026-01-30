const routes = {
    "login": "./src/view/login.html"

}

export async function  router(){
    const hash = location.hash || "#/login";
    const path = hash.split('/')[1] || "login";
    
    const route = routes[path];

    try {
        const response = await fetch(route);
        if (!response.ok) throw new Error("Página no encontrada");
        const html = await response.text(); 
        const render = document.querySelector("#app");
        render.innerHTML = html;
    } catch (error) {
        console.error("Error en el router:", error);
        document.querySelector("#app").innerHTML = "<h1>404 - No encontrado</h1>";
    }

    console.log("router.js exitoso");
}



