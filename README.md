# 🏦 RAGNA BANK API

A secure digital banking backend system built with **Node.js, Express, MongoDB, and external banking APIs**.  
It supports account creation, fund transfers, transaction history, and automated email notifications.

---

## 🚀 Features

### 👤 User & Auth
- User registration and login
- JWT authentication middleware
- Password hashing with bcrypt

### 🏦 Account System
- Create bank account linked to a user
- External account creation integration (NIBSS API)
- Account balance tracking
- Name enquiry service

### 💸 Transfers
- Secure fund transfers between accounts
- MongoDB transactions (atomic updates)
- External transfer API integration
- Balance validation (insufficient funds protection)

### 📊 Transactions
- Full transaction history
- Filter by account number
- Transaction reference tracking
- Account statement with:
    - Opening balance
    - Closing balance
    - Total credits
    - Total debits

### 📧 Notifications
- Debit alert email to sender
- Credit alert email to receiver
- Gmail SMTP integration (Nodemailer)

---

## 🧱 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)
- Nodemailer (Email service)
- Axios (External API requests)
- NIBSS-style payment simulation API

---

## 📁 Project Structure



controllers/
authController.js
transferController.js
accountController.js
services/
account/
transferFundsService.js
transfer.js
getBalance.js
nameEnquiry.js
auth/
loginService.js
notification/
sendMail.js
models/
User.js
Account.js
TransactionHistory.js
routes/
authRoute.js
transferRoute.js
accountRoute.js
middleware/
authMiddleware.js
server.js
---## ⚙️ Installation### 1. Clone repository```bashgit clone https://github.com/your-username/ragna-bank.gitcd ragna-bank

Install dependencies
   npm install

Create .env file
   PORT=3000MONGO_URI=your_mongodb_connection_stringJWT_SECRET=your_jwt_secretJWT_EXPIRES=1dNIBSS_BASE_URL=your_external_api_urlNIBSS_EMAIL=your_gmail@gmail.comNIBSS_PASS=your_gmail_app_password

Run the server
   npm run dev
   Server runs on:
   http://localhost:3000

🔐 Authentication Flow
Login
POST /api/auth/login
Request Body
{  "email": "user@example.com",  "password": "123456"}
Response
{  "success": true,  "data": {    "user": {      "id": "...",      "name": "...",      "email": "..."    },    "token": "JWT_TOKEN"  }}

🏦 Create Account
POST /api/account

💸 Transfer Funds
POST /api/transfer
Body
{  "senderAccount": "6803622108",  "receiverAccount": "6809217232",  "amount": 1000}

📊 Transactions
Get all transactions
GET /api/transfer
Get transaction by reference
GET /api/transfer/transactions/reference/:reference
Get account transactions
GET /api/transfer/transactions/:accountNumber
Get account statement
GET /api/transfer/statement/account/:accountNumber

📧 Email Notifications
Automatically sent on every transfer:
Debit Email (Sender)


Amount deducted


Recipient details


Transaction reference


Credit Email (Receiver)


Amount received


Sender details


Transaction reference



⚠️ Error Handling
Standard API error response:
{  "message": "Error description"}

🧠 Key Architecture Decisions


Services handle business logic (not controllers)


Controllers only handle HTTP requests/responses


MongoDB transactions ensure safe transfers


External transfer API decoupled from internal logic


Email notifications run after DB commit



🚧 Known Improvements (Next Phase)


OTP verification for transfers


Rate limiting & fraud detection


Admin dashboard


Wallet vs bank separation


Microservice breakdown (auth / payments / notifications)


Webhooks for transaction status



👨‍💻 Author
Built by Ukpabi Godwin Michael 🚀
