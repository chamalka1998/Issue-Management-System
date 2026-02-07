# 🛠️ Issue Tracker Pro

A modern **full-stack Issue Management Dashboard** with real-time state handling, persistent theming, and a polished UX.

Built using the **MERN stack** and powered by **Redux Toolkit + TypeScript**.

---

## 🚀 Demo Access

Want to explore instantly without registration?

```
Email: newnop@email.com
Password: 123456
```

> **Note:** These are example credentials for demonstration purposes.  
> If you clone the repository, you will need to **register or create a user with these credentials** in your own database to log in.

---

## ✨ Features

### 🌓 Adaptive Theming

- Toggle between **Light** and **Navy Slate Dark** modes
- Theme preference is saved via **LocalStorage**
- Consistent design tokens using CSS variables

### 🔐 Secure Authentication

- JWT-based login & registration
- Password hashing with **bcrypt**
- Protected routes

### 🧹 Smart Data Sanitization

- Automatic email trimming & lowercase normalization
- Prevents duplicates and login mismatches

### 📊 Interactive Dashboard

- KPI cards for:
  - Open Issues
  - In-Progress
  - Resolved
- Responsive issue grid layout

### 🔔 Elegant Notifications

- Non-blocking toasts via **react-hot-toast**
- Success / error / loading states
- Theme-aware styling

### 📱 Fully Responsive

- Works across **Mobile / Tablet / Desktop**
- Fluid typography + CSS Grid

### 🖋️ Modern Typography

- **Plus Jakarta Sans** → headings
- **Inter** → UI & body

---

## 🛠️ Tech Stack

### Frontend

- React 18
- TypeScript
- Redux Toolkit
- React Router DOM v6
- React Icons
- CSS Variables (Custom Properties)

### Backend

- Node.js
- Express.js
- MongoDB

### Security

- JSON Web Tokens (JWT)
- BcryptJS

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/chamalka1998/Issue-Management-System.git
cd Issue-Management-System
```

---

### 2️⃣ Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

---

### 3️⃣ Install Dependencies

```bash
# Backend
npm install

# Frontend
cd client
npm install
```

---

### 4️⃣ Run the App

```bash
# From root (runs client + server)
npm run dev
```

---

## 📂 Project Structure

```
src/
├── app/          # Redux store & hooks
├── components/   # Reusable UI components
├── features/     # Redux slices (auth, issues, theme)
├── pages/        # Views (Dashboard, Login, Register)
├── styles/       # Global CSS & theme variables
└── config.ts     # API base URL & configuration
```

---

## 🎨 Design System

Built with accessibility and visual consistency in mind.

| Theme | Background | Text Primary | Accent    |
| ----- | ---------- | ------------ | --------- |
| Light | `#f4f6f8`  | `#2c3e50`    | `#0984e3` |
| Dark  | `#1e293b`  | `#f8fafc`    | `#0984e3` |

---

## 🧠 Architecture Highlights

✅ Feature-based Redux slices  
✅ Centralized API configuration  
✅ Reusable protected routing  
✅ Persistent UI preferences  
✅ Scalable folder structure

---

## 📈 Why This Project Stands Out

This project demonstrates:

- Production-style authentication
- Clean state management
- Strong UI/UX practices
- Real-world dashboard patterns
- Type-safe frontend architecture

Perfect for showcasing **full-stack engineering capability**.
