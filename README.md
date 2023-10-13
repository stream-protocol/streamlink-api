# StreamLink API

Stream**Link** is a cryptocurrency payment processing API that allows users to create and manage payment links for various cryptocurrencies. This API is designed to be simple, secure, and user-friendly, making it easy for developers to integrate cryptocurrency payments into their applications.

## Table of Contents

- [StreamLink API](#streamlink-api)
  - [Table of Contents](#table-of-contents)
  - [Architecture](#architecture)
  - [How It Works](#how-it-works)
  - [Getting Started](#getting-started)
  - [API Endpoints](#api-endpoints)
  - [Examples](#examples)
    - [User Registration](#user-registration)
    - [StreamLink Generation](#streamlink-generation)
    - [Payment Processing](#payment-processing)
  - [Contributing](#contributing)
  - [License](#license)

## Architecture

The StreamLink API follows a microservices architecture, consisting of several key components:

- **StreamLink Service**: This service manages the creation and retrieval of StreamLinks. It generates unique payment links for users and handles the processing of payments.

- **User Service**: Responsible for user account management, authentication, and authorization. Users can create accounts, update their profiles, and access their transaction history.

- **Payment Gateway**: The payment gateway component interfaces with various cryptocurrency networks to send and receive payments. It supports multiple cryptocurrencies and ensures the security and reliability of transactions.

- **Database**: Stores user account information, transaction history, and payment details. PostgreSQL is used as the database system.

## How It Works

StreamLink simplifies the process of creating and managing cryptocurrency payments. Here's how it works:

1. **User Registration**: Users can create accounts by providing their username, email, and password. The User Service securely stores user data.

2. **StreamLink Generation**: Users can request a new StreamLink by calling the StreamLink Service. The service generates a unique payment link associated with the user's account.

3. **Payment Link Creation**: Users can create payment links by specifying the amount, description, and currency. The Stream**Link** Service generates a URL containing the payment details.

4. **Payment Processing**: When a customer accesses the payment link and sends a payment to the specified cryptocurrency address, the Payment Gateway detects the incoming transaction and verifies it.

5. **Transaction History**: Successful payments are recorded in the database, including sender and recipient details, amount, and timestamp. Users can access their transaction history through the User Service.

6. **Account Management**: Users can update their profiles, change passwords, and manage their StreamLinks through the User Service.

## Getting Started

To get started with the Stream**Link** API, follow these steps:

1. Clone the repository to your local machine.

2. Install the necessary dependencies using `npm install`.

3. Configure the Stream**Link** API by editing the `.env` file with your database and cryptocurrency wallet settings.

4. Start the Stream**Link** API using `npm start`.

5. Access the Stream**Link** API endpoints as described in the [API Endpoints](#api-endpoints) section.

## API Endpoints

The Stream**Link** API provides the following endpoints:

- `POST /api/register`: Register a new user account.
- `POST /api/login`: Log in with an existing account.
- `POST /api/streamlink`: Generate a new Stream**Link**.
- `GET /api/streamlink/:id`: Retrieve a Stream**Link** by its ID.
- `POST /api/payment/:id`: Process a payment for a Stream**Link**.
- `GET /api/transactions/:userId`: Retrieve a user's transaction history.

For detailed API documentation, refer to the [API Documentation](docs.streamlink.xyz) file.

## Examples

Here are some examples of how to use the Stream**Link** API:

### User Registration

```http
POST /api/register
{
  "username": "user123",
  "email": "user123@example.com",
  "password": "password123"
}
```

### StreamLink Generation

```http
POST /api/streamlink
{
  "userId": "123",
  "amount": 25.00,
  "description": "Payment for Product StreamPay T-Shirt",
  "currency": "USDC"
}
```

### Payment Processing

```http
POST /api/payment/456
{
  "senderAddress": "sender123",
  "recipientAddress": "recipient456",
  "amount": 25.00,
  "currency": "USDC"
}
```

## Contributing

Contributions to the Stream**Link** API are welcome! If you find a bug or have a feature request, please open an issue. If you'd like to contribute code, please follow our [contributing guidelines](CONTRIBUTING.md).

## License

[MIT License](LICENSE).
