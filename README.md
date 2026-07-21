# URL Shortener

A full-stack URL shortener with JWT authentication, click tracking, and a dashboard to manage your links.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React, Vite, React Router, Axios    |
| Backend  | Node.js, Express.js                 |
| Database | MySQL                               |
| ORM      | Sequelize                           |
| Auth     | JWT + bcrypt                        |

## Project Structure

```
urlShortner/
├── client/          # React frontend (Vite)
├── server/          # Express API backend
├── .gitignore
└── README.md
```

## Prerequisites

- **Node.js** 18 or higher
- **MySQL** 8 or higher

## Setup

### 1. Clone and install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Set up MySQL

Create a database for the application:

```sql
CREATE DATABASE url_shortener;
```

### 3. Configure environment variables

**Server** — copy the example file and fill in your values:

```bash
cd server
cp .env.example .env   # On Windows: copy .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=url_shortener
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
BASE_URL=http://localhost:5000
```

**Client** — copy the example file:

```bash
cd client
cp .env.example .env   # On Windows: copy .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SHORT_URL_BASE=http://localhost:5000
```

### 4. Run the application

Open two terminal windows:

**Terminal 1 — Backend:**

```bash
cd server
npm run dev
```

The server starts at `http://localhost:5000`. Sequelize will automatically create the database tables on first run.

**Terminal 2 — Frontend:**

```bash
cd client
npm run dev
```

The app opens at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint            | Auth | Description                    |
| ------ | ------------------- | ---- | ------------------------------ |
| POST   | `/api/auth/signup`  | No   | Register a new user            |
| POST   | `/api/auth/login`   | No   | Login and receive JWT          |
| GET    | `/api/auth/me`      | Yes  | Get current user profile       |
| POST   | `/api/urls`         | Yes  | Create a shortened URL         |
| GET    | `/api/urls`         | Yes  | List user's URLs               |
| PUT    | `/api/urls/:id`     | Yes  | Update URL destination/alias   |
| DELETE | `/api/urls/:id`     | Yes  | Delete a URL                   |
| GET    | `/:shortCode`       | No   | Redirect to original URL       |

All authenticated endpoints require the header:

```
Authorization: Bearer <your_jwt_token>
```

## Features

- **Authentication** — Sign up, log in, JWT-protected routes
- **URL shortening** — Auto-generated short codes (nanoid) or custom aliases
- **Click tracking** — Counter increments on every redirect visit
- **Dashboard** — View, edit, delete, and copy short URLs
- **Validation** — Input validation on both frontend and backend

## Production Notes

- Replace `sequelize.sync()` with proper migrations for production
- Use a strong, unique `JWT_SECRET`
- Set `NODE_ENV=production`
- Build the frontend with `cd client && npm run build`

