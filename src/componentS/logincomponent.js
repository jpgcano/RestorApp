import { AuthManager } from "../managers/authManager.js";

export class LoginComponent {
    constructor() {
        this.auth = new AuthManager();
    }

    render() {
        return `
<main class="conteiner Login">

<form id="login-form">

<div class="conteiner title">

<h1>RestorApp</h1>

<p>Login to your account</p>

</div>

<label for="Post-name">Full name</label>

<input id="Post-name" type="text" name="name" placeholder="e.g John Doe">


<label for="Post-Email">Email Address</label>

<input id="Post-Email" type="email" name="Email" placeholder="name@example.com" required>


<label for="Post-Rol">Role</label>

<select name="Role" id="Post-Rol">

<option value="User" selected>User</option>

<option value="Administrador">Administrador</option>

</select>


<input type="submit" value="sign in">

<p>Don't have an account? <a>Sign up</a></p>

</form>

</main>
        `;
    }

    init() {
        console.log("LoginComponent inicializado");
        const form = document.querySelector("#login-form");
        
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const emailInput = document.querySelector("#Post-Email");
            const email = emailInput.value.trim();

            // Llamamos al manager que ya busca en el JSON
            const user = await this.auth.login(email);

            if (user) {
                console.log("Acceso concedido para:", user.name);

                // REQUISITO: Redirección basada en ROL
                // Comparamos el rol tal cual viene en tu BD.json ("admin" o "user")
                if (user.role === 'admin') {
                    window.location.hash = "#/admin";
                } else {
                    window.location.hash = "#/menu";
                }
                
            } else {
                alert("Usuario no encontrado. Revisa el email registrado en la base de datos.");
            }
        });
    }
}