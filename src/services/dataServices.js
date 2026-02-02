import { user } from '../models/user.js'; // Asegúrate que el archivo se llame user.js y la clase sea user

export async function fetchUser() {
    const url = "http://localhost:3000/users";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("No se pudo conectar con el servidor");
        
        const data = await response.json();

        // data ya es el array si usas json-server en la ruta /users
        // Si data es el array, mapeamos directamente sobre él:
        return data.map(u => new user(
            u.id, 
            u.name, 
            u.email, 
            u.role // Cambiado de 'rol' a 'role' para que coincida con tu BD.json
        ));
    }
    catch (error) {
        console.error("Error cargando usuarios:", error);
        return [];
    }
}