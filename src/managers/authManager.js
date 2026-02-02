import { fetchUser } from "../services/dataServices";

export class AuthManager {
    async login(email) {
        const users = await fetchUser();
        //buscar por email
        const foundUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
        if (foundUser) {
            this.saveSession(foundUser);
            return foundUser;
        } else {
            return null; //usuario no encontrado
        }

    }

    saveSession(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = "./src/view/login.html"
    }
}