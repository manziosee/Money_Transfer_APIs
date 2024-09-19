# Payment API

A comprehensive API for facilitating peer-to-peer payments, merchant payments, and international remittances using Node.js and Express.js.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Peer-to-Peer Payments](#peer-to-peer-payments)
  - [Merchant Payments](#merchant-payments)
  - [International Remittances](#international-remittances)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Peer-to-peer payments
- Merchant payments
- International remittances
- Wallet management
- Transaction history
- Secure and scalable architecture

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/payment-api.git
   cd payment-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory with the following content:**
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## Usage

### API Endpoints

#### Authentication

- **Register a new user:**
  ```http
  POST /api/auth/register
  ```
  Request Body:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  Response:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

- **Login an existing user:**
  ```http
  POST /api/auth/login
  ```
  Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  Response:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

#### Peer-to-Peer Payments

- **Send money:**
  ```http
  POST /api/payment/send
  ```
  Request Headers:
  ```http
  x-auth-token: your_jwt_token
  ```
  Request Body:
  ```json
  {
    "to": "receiver_user_id",
    "amount": 100,
    "currency": "USD"
  }
  ```
  Response:
  ```json
  {
    "msg": "Transaction successful",
    "transaction": {
      "sender": "sender_user_id",
      "receiver": "receiver_user_id",
      "amount": 100,
      "currency": "USD",
      "status": "completed",
      "timestamp": "2023-10-01T12:00:00Z"
    }
  }
  ```

- **Check balance:**
  ```http
  GET /api/payment/balance
  ```
  Request Headers:
  ```http
  x-auth-token: your_jwt_token
  ```
  Response:
  ```json
  {
    "balance": 500
  }
  ```

- **Transaction history:**
  ```http
  GET /api/payment/transactions
  ```
  Request Headers:
  ```http
  x-auth-token: your_jwt_token
  ```
  Response:
  ```json
  [
    {
      "sender": "sender_user_id",
      "receiver": "receiver_user_id",
      "amount": 100,
      "currency": "USD",
      "status": "completed",
      "timestamp": "2023-10-01T12:00:00Z"
    },
    {
      "sender": "sender_user_id",
      "receiver": "receiver_user_id",
      "amount": 50,
      "currency": "USD",
      "status": "completed",
      "timestamp": "2023-09-30T12:00:00Z"
    }
  ]
  ```

#### Merchant Payments

- **Send payment to a merchant:**
  ```http
  POST /api/payment/send
  ```
  Request Headers:
  ```http
  x-auth-token: your_jwt_token
  ```
  Request Body:
  ```json
  {
    "to": "merchant_user_id",
    "amount": 100,
    "currency": "USD"
  }
  ```
  Response:
  ```json
  {
    "msg": "Transaction successful",
    "transaction": {
      "sender": "sender_user_id",
      "receiver": "merchant_user_id",
      "amount": 100,
      "currency": "USD",
      "status": "completed",
      "timestamp": "2023-10-01T12:00:00Z"
    }
  }
  ```

#### International Remittances

- **Send remittance:**
  ```http
  POST /api/remittance/send
  ```
  Request Headers:
  ```http
  x-auth-token: your_jwt_token
  ```
  Request Body:
  ```json
  {
    "to": "receiver_user_id",
    "amount": 100,
    "currency": "USD",
    "exchangeRate": 0.85
  }
  ```
  Response:
  ```json
  {
    "msg": "Remittance successful",
    "transaction": {
      "sender": "sender_user_id",
      "receiver": "receiver_user_id",
      "amount": 100,
      "currency": "USD",
      "status": "completed",
      "timestamp": "2023-10-01T12:00:00Z"
    }
  }
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

### Additional Sections

You can add more sections to the README as needed, such as:

- **Security:** Information about security measures and best practices.
- **Deployment:** Instructions for deploying the API to a production environment.
- **Testing:** Information about how to run tests and the testing framework used.
- **FAQ:** Frequently asked questions and their answers.

This README provides a comprehensive overview of your payment API project and should help users and developers understand how to use and contribute to the project.