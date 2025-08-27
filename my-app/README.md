# 🌐 Developer Portfolio

A modern, animated, and responsive developer portfolio built with **React, Framer Motion, and Tailwind CSS**.  
It showcases projects, skills, and contact information with smooth animations and clean UI.

---

## 🚀 Features
- 🎨 Beautiful animations with [Framer Motion](https://www.framer.com/motion/)
- 📱 Fully responsive with [Tailwind CSS](https://tailwindcss.com/)
- 🖼️ Dynamic project cards (supports backend project data + images)
- ⚡ Fast development with [Vite](https://vitejs.dev/)
- 🔐 Admin route (future scope: manage projects/blogs)

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Backend (optional):** Node.js + Express (for managing projects & images)
- **Package Manager:** npm

---

## 📂 Project Structure
portfolio/
│── public/ # Static assets
│── src/
│ ├── assets/ # Images & static files
│ ├── components/ # Reusable UI components (Navbar, Footer, etc.)
│ ├── sections/ # Portfolio sections (Hero, About, Projects, Contact)
│ ├── App.jsx # Main app file
│ ├── main.jsx # React entry point
│── package.json
│── README.md


---

## ⚙️ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/bluebommer/Portfolio.git
   cd portfolio

2. Install dependencies

npm install


3. Run development server

npm run dev


4. Open in browser → http://localhost:5173

🔧 Backend (Optional)

If using a Node.js + Express backend for project uploads:

1. Run your backend server:

node server.js


2. Ensure the frontend API calls point to your backend (e.g., http://localhost:5000/projects).

3. Upload images to /uploads and they will display dynamically in ProjectCard.

👨‍💻 Author

Your Name – @bluebommer