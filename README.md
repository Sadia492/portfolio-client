# 🌐 My Portfolio

[![Live Demo](https://i.ibb.co.com/hFgM5kHs/image.png)](https://portfolio-client-five-psi.vercel.app/)

A **personal portfolio website** built with **Next.js, Prisma, and Express.js**, featuring a secure dashboard for blog and project management. The site is optimized for **SEO, performance, and UX**, ensuring both public visitors and the site owner have an engaging experience.

---

## 🚀 Introduction

This portfolio website is designed to:

- Showcase **projects and blogs**.
- Provide a **secure dashboard** for the owner to manage content.
- Highlight **skills, work experience, and personal information** in an "About Me" section.
- Deliver a **responsive, polished, and accessible** user experience.

---

## ✨ Features

### 🔓 Public Pages (No Login Required)

- **About Me:** Static personal details (bio, contact, skills, work experience).
- **Blog Management:**

  - View all blogs page (ISR for dynamic updates).
  - Individual blog pages generated dynamically with `getStaticPaths` + `revalidate`.

- **Project Showcase:** List of projects with thumbnail, description, links, and features.

### 🔒 Private Pages (Owner Only)

- **Authentication & Authorization:**

  - JWT-based authentication with bcrypt password hashing.
  - Admin seeded in backend for secure login.

- **Dashboard:**

  - Manage blogs and projects (CRUD functionality).
  - Private dashboard with owner-only access.

---

## 🛠 Tech Stack

- **Frontend:** Next.js (TypeScript)
- **Styling:** Tailwind CSS
- **Backend:** Node.js / Express.js
- **Database:** PostgreSQL + Prisma (or MongoDB + Mongoose alternative)
- **Authentication:** JWT + bcrypt
- **Notifications:** react-hot-toast

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sadia492/portfolio-client
cd portfolio
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=your_database_connection_string
```

### 4️⃣ Database Setup

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 5️⃣ Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## ▶️ Usage

- **Public Users:**

  - Browse About Me, Blogs, and Projects.

- **Portfolio Owner:**

  - Login via dashboard.
  - Add/update/delete blogs and projects.

---

## 🔑 Demo Credentials

To access the **admin dashboard**, use the following credentials:

```txt
Email: admin@portfolio.com
Password: admin123
```

---

## 🔧 Configuration

- ISR & SSG used for fast static rendering.
- Prisma schema configurable in `prisma/schema.prisma`.
- Tailwind configuration in `tailwind.config.js`.

---

## 👨‍💻 Contributors

- **Portfolio Owner:** Sadia Afrin Snigdha
