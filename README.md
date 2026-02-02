# RestorApp - Restaurant Management System

RestorApp is a modern Single Page Application (SPA) designed to manage restaurant orders, menus, and user profiles. It features a role-based access control system for both Customers and Administrators.

## 🚀 Features

- **User Authentication:** Secure login system with role-based redirection.
- **Dynamic Menu:** Real-time product listing with category filtering.
- **Order Management:** - Users can add items to a cart and confirm orders.
  - Admins can view all system orders and update their status (Pending, Preparing, Ready, Delivered).
- **User Profile:** Personal dashboard showing order history and account statistics.
- **Responsive Design:** Optimized for both desktop and mobile viewing.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Flexbox & Grid), Vanilla JavaScript (ES6+).
- **Tooling:** Vite.js.
- **Database Simulation:** JSON Server (REST API).
- **Package Manager:** pnpm.

## 📋 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [pnpm](https://pnpm.io/) (Or npm/yarn)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd RestorApp

```

2. **Install dependencies:**
```bash
pnpm install

```


3. **Prepare the database:**
Ensure you have a `db.json` file in the root directory with the required collections (`users`, `menu`, `orders`).

## 🏃 Running the Application

You need to run two separate terminals:

### Terminal 1: Backend (API)

Start the mock server to handle data persistence:

```bash
pnpm run DB

```

*The server will run at `http://localhost:3000*`

### Terminal 2: Frontend (Development Server)

Start the Vite development environment:

```bash
pnpm run dev

```

*The application will be available at the URL provided in the terminal (usually `http://localhost:5173`)*

## 📂 Project Structure

```text
RestorApp/
├── src/
│   ├── components/    # UI Components (Login, Menu, Admin, Profile)
│   ├── managers/      # Logic for Auth and Data Handling
│   ├── services/      # API Fetch calls
│   └── router/        # SPA Routing logic
├── index.html         # Entry point
├── styles.css         # Global styles
├── app.js             # Application bootstrap
└── db.json            # Mock database

```

## 🔐 System Roles

| Role | Permissions |
| --- | --- |
| **User** | View menu, place orders, view personal order history, edit profile. |
| **Admin** | View all global orders, change order status, manage system data. |




