# 🏦 Ragna Bank API

A secure and scalable banking backend API built with Node.js, Express, MongoDB, and JWT authentication. The API supports account management, fund transfers, transaction history, account statements, and email notifications for debit/credit transactions.

---

## 🚀 Features

* 🔐 User Authentication (JWT)
* 🔑 Secure Login System
* 🔒 Password Hashing with bcrypt
* 👤 User Registration
* 🏦 Bank Account Creation
* 💸 Fund Transfer Between Accounts
* 📜 Transaction History
* 📊 Account Statement Generation
* 📩 Email Notifications (Debit/Credit Alerts)
* 🧾 Transaction Reference Tracking
* ⚡ MongoDB Transactions & Sessions
* 🛡️ Error Handling

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JWT (JSON Web Token)
* bcrypt

### Notifications

* Nodemailer

### Environment Variables

* dotenv

---

## 📂 Project Structure

```txt
BANK-API/
│── src/
│   │── config/
│   │   ├── db.js
│   │
│   │── controllers/
│   │   ├── authController.js
│   │   ├── accountController.js
│   │   └── transferController.js
│   │
│   │── services/
│   │   │── auth/
│   │   │   ├── loginService.js
│   │   │   └── registerService.js
│   │   │
│   │   │── account/
│   │   │   ├── transferFundsService.js
│   │   │   ├── getAccountStatementService.js
│   │   │   └── getTransactionsService.js
│   │   │
│   │   └── notification/
│   │       └── sendMail.js
│   │
│   │── models/
│   │   ├── User.js
│   │   ├── Account.js
│   │   └── TransactionHistory.js
│   │
│   │── routes/
│   │   ├── authRoutes.js
│   │   ├── accountRoutes.js
│   │   └── transferRoutes.js
│   │
│   │── middlewares/
│   │   └── authMiddleware.js
│   │
│   │── app.js
│
│── .env
│── package.json
│── server.js
│── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Move into the project folder:

```bash
cd YOUR_REPOSITORY
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
JWT_EXPIRES=7d

NIBSS_EMAIL=your_email@gmail.com
NIBSS_PASS=your_app_password
EMAIL_USER=your_email@gmail.com
```

---

## ▶️ Running the Server

Development mode:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server runs on:

```txt
http://localhost:3000
```

---

## 📌 API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

#### Login User

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "12345",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "JWT_TOKEN"
  }
}
```

---

### Transfers

#### Transfer Funds

```http
POST /api/transfer
```

Request:

```json
{
  "senderAccount": "6803622108",
  "receiverAccount": "6809217232",
  "amount": 1000
}
```

Response:

```json
{
  "success": true,
  "message": "Transfer successful"
}
```

---

### Transactions

#### Get Account Transactions

```http
GET /api/account/transactions/:accountNumber
```

---

#### Get Account Statement

```http
GET /api/account/statement/:accountNumber
```

---

#### Get Transfer By Reference

```http
GET /api/transfer/:reference
```

---

## 🔑 Authentication

Protected routes require a JWT token.

Add token in headers:

```http
Authorization: Bearer YOUR_TOKEN
```

---

## 📩 Email Notifications

Users receive email notifications for:

* Debit alerts
* Credit alerts
* Transfer references

---

## 🧪 Testing

Use:

* Postman
* Thunder Client

to test endpoints.

---

## 🚧 Future Improvements

* OTP Verification
* Role-Based Access Control
* Admin Dashboard
* Transaction Reversal
* Scheduled Transfers
* Account Freeze Feature
* Audit Logging
* Rate Limiting
* Swagger API Documentation

---

## 👨‍💻 Author

Built by **Ukpabi Godwin**

Backend Engineer | Node.js | MongoDB | Express

GitHub: https://github.com/gwindotcool

---

## 📄 License

This project is licensed under the MIT License.
