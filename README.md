# Book My Ticket – Backend System

A production-style backend for a movie ticket booking platform built using Node.js, Express, and PostgreSQL.

This project extends an existing codebase by adding authentication, protected routes, and safe booking logic, simulating real-world backend development.

---

## Features

* User registration and login
* JWT-based authentication using HTTP-only cookies
* Protected routes for authenticated users
* Seat booking system
* Prevention of duplicate seat bookings
* Booking associated with logged-in users
* Modular and maintainable code structure
* Integration with existing endpoints without breaking them

---

## Tech Stack

* Backend: Node.js, Express.js
* Database: PostgreSQL (Neon)
* Authentication: JWT, bcrypt
* Utilities: dotenv, cors, cookie-parser

---

## Project Structure

```id="s1"
book-my-ticket/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── modules/
│   │   ├── Auth/
│   │   │   ├── Auth.controller.js
│   │   │   ├── Auth.routes.js
│   │   │   ├── Auth.queries.js
│   │   │
│   │   ├── Seat/
│   │       ├── seats.routes.js
│   │       ├── seats.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── utils/
│   │   ├── hash.js
│   │   ├── token.js
│   │   ├── response.js
│   │
│   └── app.js
│
├── public/
│   └── static/
│       └── index.html
│
├── .env.example
├── .gitignore
├── server.js
└── package.json
```

---

## Environment Variables

Create a `.env` file in the root:

```id="s2"
DATABASE_URL=your_postgres_connection_string
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRE_TIME=2h
PORT=3000
```

---

## Database Setup

Run the following SQL queries:

```sql id="s3"
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql id="s4"
CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0,
  user_id INT
);
```

Insert initial seat data:

```sql id="s5"
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);
```

---

## Running the Project

Install dependencies:

```id="s6"
npm install
```

Start the server:

```id="s7"
npm run dev
```

Server runs on:

```id="s8"
http://localhost:3000
```

---

## Authentication Flow

1. User registers with name, email, and password
2. Password is hashed using bcrypt
3. User logs in and receives a JWT token
4. Token is stored in an HTTP-only cookie
5. Middleware verifies the token for protected routes

---

## Booking Flow

* Only authenticated users can book seats
* Seat availability is checked before booking
* Database transaction with row locking prevents duplicate bookings
* Booking is linked to the authenticated user

---

## API Endpoints

### Auth

```id="s9"
POST /api/v1/user/register
POST /api/v1/user/login
POST /api/v1/user/logout
```

### Seats

```id="s10"
GET /seats
PUT /:id/:name
```

---

## Deployment

* Backend: Render
* Database: Neon PostgreSQL
* Frontend (optional): Vercel

---

## Notes

* Existing endpoints were preserved and not modified
* Authentication layer was added on top of the existing system
* Focus was on backend quality, structure, and safety

---

## Learning Outcomes

* Working with existing codebases
* Implementing authentication and authorization
* Handling concurrent booking scenarios
* Structuring a scalable backend system

---

## Author

Developed as part of the Chai Aur Code Hackathon.
