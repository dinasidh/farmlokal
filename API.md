# FarmLokal API Documentation

**Base URL:** `http://localhost:3000`

---

## General

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server status message |
| GET | `/healthz` | Liveness check |
| GET | `/readyz` | Readiness check (Redis) |

### GET /
Returns a simple JSON message to verify the server is reachable.
**Response:** `200 OK`
```json
{ "message": "Server API is running" }
```

---

## Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/v1/auth/google` | No | Start Google OAuth |
| GET | `/v1/auth/google/callback` | No | OAuth callback (Returns JSON token) |
| GET | `/v1/auth/me` | Bearer | Get current user |

### GET /v1/auth/google/callback
Returns the JWT token directly in the response after successful login.
**Response:** `200 OK`
```json
{
  "token": "your_jwt_access_token_here"
}
```

---

## Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/v1/products` | No | List products (paginated) |
| POST | `/v1/products` | Bearer | Create a new product |
| GET | `/v1/products/:id` | No | Get product by ID |
| PATCH | `/v1/products/:id` | Bearer | Update a product |
| DELETE | `/v1/products/:id` | Bearer | Delete a product |

### POST /v1/products
Creates a new product.
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "sku": "NEW-PROD-001",
  "name": "Organic Carrots",
  "priceCents": 300,
  "category": "vegetables",
  "inStock": true
}
```

### GET /v1/products/:id
**Response:** `200 OK`
```json
{
  "_id": "65c...",
  "sku": "...",
  "name": "...",
  "priceCents": 1200,
  "category": "...",
  "inStock": true
}
```

---

## Error format

```json
{
  "error": "Error message"
}
```
Typical codes: `400` Bad Request, `401` Unauthorized, `404` Not Found, `500` Internal Server Error.
