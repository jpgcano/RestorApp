import {User} from '../models/user.js';

export async function fetchUser() {
    const url ="http://localhost:3000/users";
    try{
        const response = await fetch(url);
        const data = await response.json();
//convertir datos crudos en instansias de la clase user
    return data.User.map(u=> new User(u.id,u.name,u.email,u.rol));
    }
    catch(error ){
        console.error("Error cargando usuarios:", error);
        return[]
    }
}