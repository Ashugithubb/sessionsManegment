# 🔐 Session-Based Authentication System with WebSockets (Next.js + Nest.js)

This project was developed as part of my **internship assignment at Zenmonk Software and Services (FUNIBER)**.  
It implements **secure session-based authentication** with session logs, WebSockets-based real-time OTP validation, and session management (max 2 devices at a time).



## 📌 Features Implemented

- **User Authentication**
  - Signup for new users
  - Login with credentials
  - Session-based authentication with **60-minute validity**
  - Automatic session expiry after 60 minutes of inactivity

- **Session Management**
  - Only **one active session per user** by default
  - If a second login attempt is made:
    - Generate a **6-digit OTP** on the second device
    - Prompt the **first device** with an input box via WebSocket
    - Validate OTP in real-time  
    - Allow second device login only if OTP matches
  - At most **2 active sessions** allowed  
  - If a 3rd login attempt is made → Show error: **"Already 2 sessions active"**

- **Dashboard**
  - Redirects users to dashboard after login
  - Shows **session logs** of all previous sessions:
    - Device
    - IP address
    - Time of login

- **Security**
  - Session-based authentication (not JWT)
  - Real-time communication handled via **WebSockets**
  - Concurrent session validation

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (React), TypeScript, CSS  
- **Backend:** Nest.js, Node.js  
- **Database:** PostgreSQL (TypeORM)  
- **Real-Time:** WebSockets  
- **Authentication:** Session-based  

---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/Ashugithubb/sessionsManegment.git
cd sessionsManegment


### 2. Install dependencies

For **Frontend (Next.js)**:

```bash
cd frontend
npm install
```

For **Backend (Nest.js)**:

```bash
cd backend
npm install
```

### 3. Set up environment variables

Create a `.env` file inside `backend/` with the following:

```env
DATABASE_URL=postgres://user:password@localhost:5432/yourdb
SESSION_SECRET=your-secret-key
PORT=4000
```

### 4. Run the applications

Run **backend (Nest.js)**:

```bash
npm run start:dev
```

Run **frontend (Next.js)**:

```bash
npm run dev
```

The app will be available at:

* Frontend: `http://localhost:3000`
* Backend API: `http://localhost:4000`

---

## 📸 Workflow Example

1. **User Signup/Login** → Session created (valid 60 mins).
2. **Dashboard** → Displays past session logs (device, IP, time).
3. **Second Device Login** → OTP generated on device 2, verified via device 1 using WebSockets.
4. **Third Device Login** → Blocked with error message.



## 📜 Internship Project Instructions
* Signup/Login functionality with sessions
* 60 min session validity with inactivity timeout
* Session logs with device, IP, and timestamp
* Real-time OTP validation using WebSockets for multiple devices
* Max 2 concurrent sessions per user
