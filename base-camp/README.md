# 🏕️ Basecamp

A robust backend REST API built with Node.js, featuring a complete authentication system including registration, login, email verification, password management, and token-based session handling.

---

## 📋 Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Health Check](#health-check)
  - [Auth](#auth)
- [Request & Response Examples](#request--response-examples)
- [Getting Started](#getting-started)

---

## 🌐 Base URL

All endpoints are prefixed with the base URL configured via the `basecamp` environment variable:

```
{{basecamp}}
```

> Set the `basecamp` variable in your environment (e.g., `http://localhost:5000`) before making requests.

---

## 🔐 Authentication

This API uses **Bearer Token** authentication (JWT).

- After a successful **Login**, you receive an `accessToken` and a `refreshToken`.
- Include the access token in the `Authorization` header for protected routes:

```
Authorization: Bearer <accessToken>
```

- When the access token expires, use the **Refresh Access Token** endpoint to get a new one.

---

## 📡 API Endpoints

### Health Check

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/healthcheck` | None | Check if the API server is running |
| `GET` | `/` | Bearer | Root health check |

---

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/auth/register` | None | Register a new user account |
| `POST` | `/api/v1/auth/login` | None | Login and receive tokens |
| `POST` | `/api/v1/auth/logout` | Bearer | Logout and invalidate tokens |
| `POST` | `/api/v1/auth/refresh-token` | Refresh Token | Get a new access token |
| `POST` | `/api/v1/auth/forgot-password` | None | Request a password reset email |
| `POST` | `/api/v1/auth/reset-password/:token` | None | Reset password using email token |
| `GET` | `/api/v1/auth/verify-email/:token` | None | Verify email address |
| `POST` | `/api/v1/auth/resend-email-verification` | None | Resend email verification link |
| `POST` | `/api/v1/auth/change-password` | Bearer | Change password (authenticated) |
| `POST` | `/api/v1/auth/current-user` | Bearer | Get current user's profile |

---

## 📝 Request & Response Examples

### Register

**`POST /api/v1/auth/register`**

```json
{
  "email": "user@example.com",
  "username": "myusername",
  "password": "securepassword"
}
```

> ✉️ A verification email is sent after successful registration. The account must be verified before login is permitted.

---

### Login

**`POST /api/v1/auth/login`**

```json
{
  "email": "user@example.com",
  "username": "myusername",
  "password": "securepassword"
}
```

**Response includes:**
- `accessToken` — use in `Authorization` header
- `refreshToken` — store securely for token refresh

---

### Logout

**`POST /api/v1/auth/logout`**

```
Authorization: Bearer <accessToken>
```

> Invalidates both the access token and refresh token.

---

### Refresh Access Token

**`POST /api/v1/auth/refresh-token`**

Provide the refresh token (via cookie or request body/header depending on server config).

> Use this when the access token has expired. Returns a new access token (and possibly a new refresh token).

---

### Forgot Password

**`POST /api/v1/auth/forgot-password`**

```json
{
  "email": "user@example.com"
}
```

> A password reset link with a time-limited token is sent to the provided email.

---

### Reset Password

**`POST /api/v1/auth/reset-password/:token`**

```json
{
  "newPassword": "newsecurepassword"
}
```

> The `:token` is from the reset email link. It is single-use and expires after a set period.

---

### Email Verification

**`GET /api/v1/auth/verify-email/:token`**

> The `:token` is from the registration email. Once verified, the account becomes active.

---

### Resend Email Verification

**`POST /api/v1/auth/resend-email-verification`**

```json
{
  "email": "user@example.com"
}
```

> Use this if the original verification email was not received or has expired.

---

### Change Password

**`POST /api/v1/auth/change-password`**

```
Authorization: Bearer <accessToken>
```

```json
{
  "oldPassword": "currentpassword",
  "newPassword": "newpassword"
}
```

> The `oldPassword` must match the current password on record.

---

### Current User

**`POST /api/v1/auth/current-user`**

```
Authorization: Bearer <accessToken>
```

> Returns the logged-in user's profile (id, email, username, roles). Returns `401 Unauthorized` if the token is missing or invalid.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/base-camp.git
   cd base-camp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   EMAIL_HOST=your_smtp_host
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   BASE_URL=http://localhost:5000
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

5. **Test the API**

   Use the [Postman Collection](https://www.postman.com) or send a health check:
   ```bash
   curl http://localhost:5000/api/v1/healthcheck
   ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
