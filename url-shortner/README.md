# URL Shortener API

A RESTful URL Shortening API built with **Node.js, Express, PostgreSQL, and Drizzle ORM**.

The service provides user authentication, URL shortening, short-code redirection, and authenticated short-code management.

## 🚀 Live API

**Base URL:**
https://backend-projects-lake.vercel.app

### Health Check

```http
GET https://backend-projects-lake.vercel.app/
```

Response:

```json
{
  "status": "API Health OK"
}
```

---

## ✨ Features

* User registration
* JWT-based authentication
* URL shortening
* Public short-code redirection
* Retrieve authenticated user's short-codes
* Delete owned short-codes
* PostgreSQL database
* Drizzle ORM
* Request authentication middleware
* Production deployment on Vercel

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* JavaScript (ES Modules)

### Database

* PostgreSQL
* Drizzle ORM

### Authentication & Validation

* JSON Web Tokens (JWT)
* Zod

### Development

* Docker
* Docker Compose
* pnpm

### Deployment

* Vercel

---

# 📡 API Documentation

## Base URL

```text
https://backend-projects-lake.vercel.app
```

---

## 1. Health Check

Checks whether the API is running.

### Endpoint

```http
GET /
```

### Request

```bash
curl https://backend-projects-lake.vercel.app/
```

### Response

```json
{
  "status": "API Health OK"
}
```

---

# 🔐 Authentication

## 2. Signup

Creates a new user account.

### Endpoint

```http
POST /user/signup
```

### Full URL

```text
https://backend-projects-lake.vercel.app/user/signup
```

### Authentication

None required.

### Request Body

> Add the exact request body from your API implementation here.

Example:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "your-password"
}
```

### Response

> Add the actual response returned by your API here.

---

## 3. Sign In

Authenticates an existing user and returns an access token.

### Endpoint

```http
POST /user/login
```

### Full URL

```text
https://backend-projects-lake.vercel.app/user/login
```

### Authentication

None required.

### Request Body

> Add the exact request body from your API implementation here.

### Response

> The returned access token is used for authenticated endpoints.

Use it as:

```http
Authorization: Bearer <your_token>
```

---

# 🔗 URL Shortening

## 4. Create Short URL

Creates a short-code for a long URL.

### Endpoint

```http
POST /shorten
```

### Full URL

```text
https://backend-projects-lake.vercel.app/shorten
```

### Authentication

🔒 Bearer Token required.

```http
Authorization: Bearer <your_token>
```

### Request Body

> Add the exact request body from your API implementation here.

### Response

> Add the actual response returned by your API here.

---

# 🔀 Short-code Redirect

## 5. Redirect Using Short-code

Resolves a short-code and redirects the client to the original URL.

### Endpoint

```http
GET /:shortCode
```

### Example

```http
GET https://backend-projects-lake.vercel.app/portfolio
```

### Authentication

None required.

### Path Parameters

| Parameter   | Type   | Required | Description                  |
| ----------- | ------ | -------- | ---------------------------- |
| `shortCode` | string | Yes      | Unique short-code to resolve |

### Example Request

```bash
curl --location 'https://backend-projects-lake.vercel.app/portfolio'
```

### Response

A successful request returns an HTTP redirect:

```text
301 Moved Permanently
```

or

```text
302 Found
```

The `Location` response header contains the original URL.

### Possible Responses

| Status        | Description                      |
| ------------- | -------------------------------- |
| `301` / `302` | Short-code resolved successfully |
| `404`         | Short-code does not exist        |
| `500`         | Internal server error            |

> When testing with Postman, disable **Automatically follow redirects** if you want to inspect the raw `3xx` response and `Location` header.

---

# 📋 Short-code Management

## 6. Get All Codes

Retrieves all short-codes created by the authenticated user.

### Endpoint

```http
GET /codes
```

### Full URL

```text
https://backend-projects-lake.vercel.app/codes
```

### Authentication

🔒 Bearer Token required.

```http
Authorization: Bearer <your_token>
```

### Request Parameters

None.

### Example Request

```bash
curl --location \
  'https://backend-projects-lake.vercel.app/codes' \
  --header 'Authorization: Bearer <your_token>'
```

### Example Response

```json
[
  {
    "shortCode": "portfolio",
    "originalUrl": "https://www.myportfolio.com",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "shortCode": "docs",
    "originalUrl": "https://docs.example.com/getting-started",
    "createdAt": "2024-01-16T08:00:00Z"
  }
]
```

### Possible Responses

| Status | Description                        |
| ------ | ---------------------------------- |
| `200`  | Short-codes retrieved successfully |
| `401`  | Missing or invalid Bearer token    |
| `500`  | Internal server error              |

Only short-codes belonging to the authenticated user are returned.

---

## 7. Delete Short-code

Deletes a short-code and its associated URL mapping.

### Endpoint

```http
DELETE /codes/:shortCode
```

### Full URL

```text
https://backend-projects-lake.vercel.app/codes/:shortCode
```

### Example

```http
DELETE https://backend-projects-lake.vercel.app/codes/portfolio
```

### Authentication

🔒 Bearer Token required.

```http
Authorization: Bearer <your_token>
```

### Path Parameters

| Parameter   | Type   | Required | Description          |
| ----------- | ------ | -------- | -------------------- |
| `shortCode` | string | Yes      | Short-code to delete |

### Possible Responses

| Status | Description                        |
| ------ | ---------------------------------- |
| `200`  | Short-code deleted successfully    |
| `401`  | Missing or invalid Bearer token    |
| `404`  | Short-code not found for this user |
| `500`  | Internal server error              |

Only the owner of the short-code can delete it.

After deletion, the short-code will no longer resolve and redirect requests will return `404`.

---

# 🔑 Authentication Flow

The API uses Bearer-token authentication.

```text
1. Signup
   ↓
2. Login
   ↓
3. Receive JWT
   ↓
4. Send JWT with protected requests
   ↓
5. API authenticates the user
```

For protected endpoints:

```http
Authorization: Bearer <your_token>
```

Protected endpoints include:

```text
POST   /shorten
GET    /codes
DELETE /codes/:shortCode
```

---

# 🗄️ Database

The project uses **PostgreSQL** as its database and **Drizzle ORM** for database interaction.

For local development, PostgreSQL can be run using Docker Compose.

```bash
docker compose up -d
```

Database configuration is provided through environment variables.

---

# ⚙️ Local Setup

## 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd <your-project-directory>
```

## 2. Install dependencies

```bash
pnpm install
```

## 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
```

Never commit `.env` to GitHub.

## 4. Start PostgreSQL

```bash
docker compose up -d
```

## 5. Apply the database schema

```bash
pnpm drizzle-kit push
```

## 6. Start the development server

```bash
pnpm dev
```

The API will be available at:

```text
http://localhost:8000
```

---

# 📁 Project Structure

```text
URL-Shortener/
│
├── api/
│   └── index.js
│
├── db/
│   └── ...
│
├── middleware/
│   └── ...
│
├── models/
│   └── ...
│
├── routes/
│   └── ...
│
├── services/
│   └── ...
│
├── utils/
│   └── ...
│
├── validation/
│   └── ...
│
├── docs/
│   └── Project development notes
│
├── docker-compose.yml
├── drizzle.config.js
├── package.json
└── pnpm-lock.yaml
```

---

# 📚 Development Documentation

Detailed documentation explaining how the project was built from scratch is available in the `docs/` directory.

The documentation covers:

* Project planning
* Express server setup
* PostgreSQL configuration
* Drizzle ORM
* Database schema
* User authentication
* JWT implementation
* Zod validation
* Middleware
* URL shortening
* Short-code generation
* URL redirection
* Authorization
* Deployment

---

# 🚀 Deployment

The API is deployed on **Vercel**.

```text
GitHub
   ↓
Vercel
   ↓
Express API
   ↓
Drizzle ORM
   ↓
PostgreSQL
```

### Production API

```text
https://backend-projects-lake.vercel.app
```

---

# 🔒 Security

* Passwords are not stored in plaintext.
* Authentication uses JWT access tokens.
* Protected routes require Bearer authentication.
* Users can only manage their own short-codes.
* Environment secrets are stored outside the source code.

---

# 📌 API Summary

| Method   | Endpoint            | Authentication | Purpose          |
| -------- | ------------------- | -------------- | ---------------- |
| `GET`    | `/`                 | None           | Health check     |
| `POST`   | `/user/signup`      | None           | Register user    |
| `POST`   | `/user/login`       | None           | Login            |
| `POST`   | `/shorten`          | Bearer         | Create short URL |
| `GET`    | `/:shortCode`       | None           | Redirect         |
| `GET`    | `/codes`            | Bearer         | Get user's codes |
| `DELETE` | `/codes/:shortCode` | Bearer         | Delete code      |

---

## 👨‍💻 Project

**URL Shortener API**

Built as a backend project to practice REST API development, authentication, database design, validation, authorization, and production deployment.
