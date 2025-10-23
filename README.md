# 🔐 Express Auth

A complete authentication backend built with **Express.js**, **TypeScript**, and **Zod** for schema validation.  
This project provides a secure, production-ready authentication system with email verification and password reset functionality.

---

## 🚀 Features

- 🔧 **Backend Setup** — TypeScript, Express.js, Zod validation, dotenv config
- 🗄️ **Database Setup** — MongoDB (Mongoose)
- 🔐 **Signup Endpoint** — User registration with hashed passwords
- 📧 **Send Verify Account Email** — Automatically sends verification link on signup
- 🔍 **Verify Email Endpoint** — Activates user accounts after email verification
- 📄 **Welcome Email Template** — Beautiful HTML welcome message for verified users
- 🔑 **Login Endpoint** — Secure login using JWT tokens
- 🚪 **Logout Endpoint** — Clears session or JWT token
- 🔄 **Forgot Password Endpoint** — Sends password reset link via email
- 🔁 **Reset Password Endpoint** — Allows users to set a new password
- ✔️ **Check Auth Endpoint** — Returns authenticated user info if token is valid

---

## 📦 Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **Zod** for validation
- **JWT** for authentication
- **Nodemailer** for sending emails
- **dotenv** for environment configuration
- **bcrypt** for password hashing

---

## ⚙️ Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/pouria-drd/express-auth.git
   cd express-auth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Create a `.env.development.local` file and add:
   ```env
    # Port
    PORT="5500"

    # Environment
    NODE_ENV="development"

    # MongoDB
    DB_URI="mongodb://localhost:27017/express-auth"

    # Cors
    CORS_ORIGIN="*" # comma separated origins

    # JWT
    JWT_SECRET="secret"
    JWT_EXPIRES_IN="1d" 
    TOKEN_NAME="session"


    # Uploads
    JSON_LIMIT="2" # in MB
    MAX_IMAGE_SIZE="2" # in MB
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🧩 Project Structure

```
src/  
├── configs/
│   ├── env.config.ts
│   ├── db.config.ts
│   ├── index.ts
│   └── logger.config.ts
│
├── controllers/
│
├── errors/
│   └── app.error.ts
│
├── lib/
│   ├── utils/
│   │   ├── app.utils.ts
│   │   └── index.ts
│   └── validations/
│       ├── env.scheme.ts
│       └── index.ts 
│
├── middlewares/
│   ├── asyncHandler.middleware.ts
│   ├── error.middleware.ts
│   ├── httpLogger.middleware.ts
│   ├── notFound.middleware.ts
│   └── index.ts
│
├── types/
│   ├── common.types.ts
│   └── index.ts
│
├── app.ts
└── server.ts
```

---

## 📬 Email Templates

- **Verify Account Email**
- **Welcome Email**
- **Forgot Password Email**

Located in:
```
src/emails/
```

---

## 🧠 Notes

- Store sensitive info in `.env. development | production .local` files.
- Use **Resend**, **Mailtrap**, or **Gmail App Passwords** for email testing.
- Passwords are hashed using **bcrypt**.

---

## 🧑‍💻 Author

**Pouria Darandi**  
Developer & Security Enthusiast  
GitHub: [@pouria-drd](https://github.com/pouria-drd)

---

## 🏁 License

This project is open-source and available under the **MIT License**.
