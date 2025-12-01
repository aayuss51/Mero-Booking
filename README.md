# 🏨 Mero-Booking | Luxury Hotel Management System

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

Mero-Booking is a comprehensive, luxurious Hotel Management System (HMS) designed to simulate a high-end hospitality experience. It features a dual-interface architecture: a polished **Guest Portal** for reservations and a powerful **Admin Dashboard** for hotel operations.

Built with React 18 , TypeScript, and Tailwind CSS , utilizing a mock local database service to simulate a full-stack Laravel-style application flow.

---

## 📸 Screenshots

> Note: Please replace the placeholder paths below with actual screenshots of your application.

### 🏠 Guest Experience
| **Hero & Booking** | **Room Listing** |
|:---:|:---:|
| ![Home Page](./screenshots/home.png) | ![Rooms](./screenshots/rooms.png) |
| Cinematic Hero Section with Ken Burns Effect | Luxury Room Catalog |

| **AI Concierge** | **Booking Receipt** |
|:---:|:---:|
| ![AI Chat](./screenshots/chat.png) | ![Receipt](./screenshots/receipt.png) |
| Mero Support (Powered by Gemini) | Printable Booking Confirmation |

### 🛠️ Admin Dashboard
| **Overview** | **Calendar Availability** |
|:---:|:---:|
| ![Admin Dashboard](./screenshots/admin-dashboard.png) | ![Calendar](./screenshots/calendar.png) |
| Real-time KPIs & Occupancy | Monthly Availability View |

---

## ✨ Key Features

### 🌟 Guest Portal
*   Immersive UI : Parallax scrolling, Ken Burns zoom effects, and glassmorphism design.
*   Booking Engine : Real-time availability checks, date selection, and instant cost calculation (including taxes).
*   User Accounts : Secure Registration/Login (with Booking History persistence).
*   My Bookings : Manage active reservations and view history (Completed/Cancelled/Rejected).
*   AI Concierge : "Mero Support" chat widget powered by **Google Gemini API** to answer queries about facilities and rooms contextually.

### 🛡️ Admin Panel
*   Dashboard: Live KPIs (New Bookings, Occupancy Rates, Check-outs).
*   Room Management: CRUD operations with **Image Upload**, pricing, and amenities.
*   Availability Calendar: Visual monthly grid showing booked/pending dates per room.
*   Booking Management: Approve/Reject pending reservations and filter by status.
*   Facility Management:  Add/Edit/Delete hotel amenities (Gym, Pool, WiFi, etc.).

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/mero-booking.git
    cd mero-booking
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory (optional, for AI features):
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the application**
    ```bash
    npm run dev
    ```

---

## 🔐 Login Credentials

The application is pre-seeded with data. Use the following credentials to access different roles:

### 👑 Admin Access
*   **Email:** `admin@mero-booking.com`
*   **Password:** `admin123`
*   *Access:* Full Dashboard, Room Management, Bookings, Calendar.

### 👤 Guest Access
*   Email: Any valid email (e.g., `guest@gmail.com`)
*   Password: Any password (min 6 characters)
*   Access: Home, Booking Flow, My Bookings History.

---

## 🛠️ Technology Stack

*   Frontend Framework : React 18
*   Language : TypeScript
*   Styling : Tailwind CSS
*   Icons : Lucide React
*   Routing : React Router DOM v6
*   Charts : Recharts
*   AI Integration**: Google GenAI SDK (Gemini 2.5 Flash)
*   **State/Storage**: React Context API + LocalStorage (Mock DB)

---

## 📄 License

This project is licensed under the MIT License.

---

Developed By Team Nova IT Solutions for the future of hospitality.
