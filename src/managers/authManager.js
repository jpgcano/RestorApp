import { fetchUser } from "../services/dataServices";

export class AuthManager{
    async login(email){
        const users = await fetchUser();
        //buscar por email
        const user = users.find(u => u.email.users.toLowerCase() === email.toLowerCase());

        if (user){
            this.saveSession(user);
            return user;
        }else{
            return null; //usuario no encontrado
        }

    }

    saveSession(user){
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    getCurrentUser(){
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    logout(){
        localStorage.removeItem('currentUser');
        window.location.href="./src/view/login.html"
    }
}