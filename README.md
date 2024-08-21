# Account Payment Service

## Description

The **Account Payment Service** is designed to manage user accounts and handle transactions, such as sending and withdrawing funds. The system consists of two backend services: **Account Manager** and **Payment Manager**.

### Account Manager Service

- **User**: Manages user login using ID and password.
- **Payment Account**: Allows users to manage multiple accounts, including credit, debit, and loan accounts.
- **Payment History**: Keeps a record of all transactions.

### Payment Manager Service

- **Transaction**: Handles transactions with essential information such as amount, timestamp, toAddress, and status.
- **Core Transaction Process**: The following function is executed by the `/send` or `/withdraw` API to process transactions:

  ```javascript
  function processTransaction(transaction) {
    return new Promise((resolve, reject) => {
      console.log("Transaction processing started for:", transaction);

      // Simulate long running process
      setTimeout(() => {
        // After 30 seconds, we assume the transaction is processed successfully
        console.log("Transaction processed for:", transaction);
        resolve(transaction);
      }, 30000); // 30 seconds
    });
  }

  // Example usage
  let transaction = { amount: 100, currency: "USD" }; // Sample transaction input
  processTransaction(transaction)
    .then((processedTransaction) => {
      console.log(
        "Transaction processing completed for:",
        processedTransaction
      );
    })
    .catch((error) => {
      console.error("Transaction processing failed:", error);
    });
  ```

## Features

- **User Authentication**: Users must register or log in before accessing the API.
- **Transaction Operations**: Provides APIs for sending and withdrawing funds. Account balances are updated upon successful transactions.
- **Account and Transaction Retrieval**: Allows users to retrieve all accounts and transaction histories for their accounts.
- **Optional Features**:
  - **Swagger Documentation**: Write Swagger docs for the implemented APIs.
  - **Auto Debit/Recurring Payments**: Users can set up recurring payments, which are automatically processed at specified intervals.

## Technologies Used

- **Fastify**: A fast and low-overhead web framework for Node.js.
- **Prisma**: An ORM for interacting with the database.
- **OpenAPI**: API documentation specification integrated with fastify-oas.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (>= 14.x recommended).
- **Database**: Set up a database and configure Prisma accordingly.

## Installation
1. Clone the Repository
```git clone https://github.com/yourusername/account-payment-service.git ```
```cd account-payment-service```

2. Install Dependencies
``` npm install ```

3. Configure Environment Variables
```Create a .env file in the root of the project and set up the required environment variables. For example:```

```DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase```

4. Run Database Migrations

```Ensure that Prisma is set up and run the migrations to create the necessary database tables.```
```npx prisma migrate dev```

## Running the Application
To start the Fastify server, use the following command:

```npm start```
```The server will be available at http://localhost:3001.```

## API Endpoints
### User Routes
- **Register User**

```POST /users/register
Request Body: { "username": "string", "password": "string" }
Response: { "id": "integer", "username": "string", "password": "string" }
Get User by ID
```
```
GET /users/:id
Response: { "id": "integer", "username": "string", "password": "string" }
Account Routes
Create Account
```
```
POST /accounts
Request Body: { "userId": "integer", "type": "string", "balance": "number" }
Response: { "id": "integer", "userId": "integer", "accountType": "string", "balance": "number" }
Get Accounts by User ID
```
```
GET /accounts/user/:userId
Response: [{ "id": "integer", "userId": "integer", "accountType": "string", "balance": "number" }]
Get Account by ID
```
```
GET /accounts/:id
Response: { "id": "integer", "userId": "integer", "accountType": "string", "balance": "number" }
Transaction Routes
Create Transaction
```
```
POST /transactions
Request Body: { "amount": "number", "toAddress": "string", "status": "string", "accountId": "integer" }
Response: { "id": "integer", "amount": "number", "toAddress": "string", "status": "string", "accountId": "integer" }
Get Transaction by ID
```
```
GET /transactions/:id
Response: { "id": "integer", "amount": "number", "toAddress": "string", "status": "string", "accountId": "integer" }
Get Transactions by Account ID
```
```
GET /transactions/account/:accountId
Response: [{ "id": "integer", "amount": "number", "toAddress": "string", "status": "string", "accountId": "integer" }]
Process Transaction
```
```
POST /transactions/process/:id
Response: { "message": "string" }
API Documentation
The API documentation is available at http://localhost:3001/documentation.
```
## Testing
Add tests to ensure the functionality of your API. You can use frameworks like Jest or Mocha for testing.

## Contributing
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.

## License
This project is licensed under the DGAMEDEV STUDIO