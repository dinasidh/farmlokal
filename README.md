# FarmLokal Backend

A powerful and scalable backend API for FarmLokal, built with Node.js, Express, MongoDB, and Redis. It features secure Google OAuth 2.0 authentication and a full CRUD system for product management.

## 🌐 Live Hosted URL (Render)

The API is hosted live on Render at the following URL:

**Base URL:** `https://farmlokal-backend.onrender.com`  *(Note: Update this with your actual Render link)*

### Quick Start with Live API:
- **Server Status**: `https://farmlokal-kr8g.onrender.com`
- **List All Products**: `https://farmlokal-kr8g.onrender.com/v1/products`
- **Health Check**: `https://farmlokal-kr8g.onrender.com/healthz`

---

## 🚀 Features

- **Authentication**: Secure Google OAuth 2.0 integration returning a consolidated JWT token.
- **Product Management**: Full CRUD (Create, Read, Update, Delete) operations.
- **Flexible Listing**: Optional pagination for `/v1/products`. Get all items by default or use `page`/`limit`.
- **Search & Filtering**: Advanced product search with text search, category filtering, and price ranges.
- **Caching**: Redis integration for high-performance data access and readiness checks.
- **Validation**: Robust request validation using Zod.
- **Reliability**: Centralized error handling and detailed health check endpoints.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Cache**: Redis (ioredis)
- **Auth**: Passport.js & JWT
- **Validation**: Zod
- **Environment**: Dotenv & Envalid

## 📋 Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Redis server
- Google Cloud Console Project (for OAuth)

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd farmlokal-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your credentials.
   ```bash
   cp .env.example .env
   ```

## 🔑 Environment Variables

Key variables required in your `.env` file:

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3000) |
| `MONGODB_URI` | MongoDB connection string |
| `REDIS_URL` | Redis connection URL |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `JWT_SECRET` | Secret key for signing JWTs |
| `OAUTH_SUCCESS_REDIRECT` | Redirect URL after OAuth success |

## 🏃 Running the Application

### Development Mode
Runs the server with Nodemon for auto-restarts:
```bash
npm run dev
```

### Production Mode (For Render Deployment)
```bash
npm start
```

## 📡 API Endpoints

For full documentation, see [API.md](./API.md).

### General
- `GET /` - Status: `{ "message": "Server API is running" }`
- `GET /healthz` - Liveness check
- `GET /readyz` - Readiness check (Checks Redis connection)

### Authentication
- `GET /v1/auth/google` - Initiate Google Sign-in
- `GET /v1/auth/me` - Get current user profile (Requires Bearer Token)

### Products
- `GET /v1/products` - List all products (Public, Optional Pagination)
- `POST /v1/products` - Create new product (Bearer Token Required)
- `GET /v1/products/:id` - Get single product detail (Public)
- `PATCH /v1/products/:id` - Update product details (Bearer Token Required)
- `DELETE /v1/products/:id` - Delete a product (Bearer Token Required)

## 📁 Project Structure

```text
src/
├── config/         # Environment variables, DB, and Cache config
├── middlewares/    # Custom Express middlewares (Auth, Error, Validation)
├── modules/        # Domain-driven modules (Auth, Products)
│   ├── controller.js
│   ├── model.js
│   ├── routes.js
│   └── service.js
├── routes/         # Central routing configuration
├── server.js       # Entry point
└── app.js          # Express app setup
```

## 📄 License

This project is licensed under the MIT License.
