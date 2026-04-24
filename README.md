# 🏘️ Digital Village Connect

A comprehensive digital platform empowering rural communities through integrated government services, healthcare, education, and grievance management.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

---

## 📋 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Running the Application](#running-the-application)
* [API Documentation](#api-documentation)
* [Database Schema](#database-schema)
* [User Flows](#user-flows)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

---

## 🎯 Overview

**Digital Village Connect** is a one-stop platform designed to bridge the digital divide in rural India by providing seamless access to:

* 📄 Government Schemes
* 📢 Grievance Portal
* 🏥 Healthcare Services
* 📚 Education Portal

### Problem Statement

Rural citizens face challenges in:

* Accessing government services
* Tracking application status
* Reporting and resolving issues
* Finding healthcare providers
* Accessing education

### Solution

A unified platform ensuring:

* Transparency
* Accountability
* Easy accessibility

---

## ✨ Features

### 🔐 Authentication & Authorization

* Aadhar-based registration
* Secure login with JWT
* Role-based access control

### 📄 Government Schemes

* Browse and filter schemes
* Apply with document upload
* Real-time status tracking

### 📢 Grievance Management

* Submit complaints with evidence
* Unique tracking number
* Status timeline updates

### 🏥 Healthcare Services

* Search doctors by specialization
* Book and manage appointments

### 📚 Education Portal

* Browse courses
* Track learning progress
* Earn certificates

### 📊 Dashboard

* Overview of user activity
* Quick stats and actions

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Bootstrap / React Bootstrap
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Security

* JWT (jsonwebtoken)
* bcryptjs
* express-validator

### File Handling

* Multer

### Optional Integrations

* Nodemailer
* Twilio

---

## 📁 Project Structure

```
digital-village-connect/
│
├── server/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── uploads/
│   ├── .env
│   └── server.js
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## 📋 Prerequisites

* Node.js (v14+)
* npm
* MongoDB (local or Atlas)
* Git

Check installation:

```bash
node -v
npm -v
mongo --version
git --version
```

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/digital-village-connect.git
cd digital-village-connect
```

### 2. Install Backend

```bash
npm install
```

### 3. Install Frontend

```bash
cd client
npm install
```

### 4. Create Upload Folders

```bash
mkdir -p server/uploads/documents
mkdir -p server/uploads/grievances
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital-village-connect
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=Digital Village Connect
```

---

## ▶️ Running the Application

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
cd client
npm start
```

### Run Both (Recommended)

```bash
npm run dev
```

---

## 📡 API Documentation

### Auth APIs

* `POST /api/auth/register` → Register
* `POST /api/auth/login` → Login
* `GET /api/auth/me` → Get user

### Schemes

* `GET /api/schemes`
* `GET /api/schemes/:id`
* `POST /api/schemes/apply`

### Grievances

* `POST /api/grievances/submit`
* `GET /api/grievances/my-grievances`
* `GET /api/grievances/track/:id`

### Health

* `GET /api/health/doctors`
* `POST /api/health/book-appointment`

### Education

* `GET /api/education/courses`
* `POST /api/education/enroll`

---

## 🗄️ Database Schema

Main Models:

* User
* Scheme
* Application
* Grievance
* Doctor
* Appointment
* Course
* Enrollment

---

## 🔄 User Flows

### Scheme Application

1. Browse schemes
2. View details
3. Apply
4. Upload documents
5. Track status

### Grievance Flow

1. Submit complaint
2. Get tracking ID
3. Track status
4. Receive response

### Healthcare Flow

1. Search doctor
2. Book appointment
3. Manage bookings

---

## 🚀 Deployment

* Frontend: Netlify / Vercel
* Backend: Render / Railway
* Database: MongoDB Atlas

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch
3. Commit changes
4. Push and create PR

---

## 📄 License

This project is licensed under the MIT License.
