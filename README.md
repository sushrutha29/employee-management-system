# Employee Management System (EMS)

Full‑stack employee management system with JWT authentication, employee CRUD, salary management, and PDF exports.

## Tech Stack
- Backend: Java, Spring Boot, Spring Security (JWT), JPA, PostgreSQL
- Frontend: React, Vite, Tailwind CSS
- PDF: jsPDF + jspdf‑autotable

## Features
- JWT login with role‑based routing (Admin/Employee)
- Employee CRUD
- Salary management per employee
- PDF export for Employees/Salary tables
- Clean admin UI

## Project Structure
```
backend/ems/        # Spring Boot API
frontend/           # React app
```

## Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL

## Database Setup (PostgreSQL)
Create a database and user (defaults used by the app):
```
CREATE ROLE ems WITH LOGIN PASSWORD '2002';
CREATE DATABASE ems OWNER ems;
GRANT ALL PRIVILEGES ON DATABASE ems TO ems;
```

Update `backend/ems/src/main/resources/application.properties` if needed:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/ems
spring.datasource.username=ems
spring.datasource.password=2002
```

## Backend Run
```
cd backend/ems
./mvnw spring-boot:run
```

Health check:
```
http://localhost:8080/test
```

## Frontend Run
```
cd frontend
npm install
npm run dev
```

Open:
```
http://localhost:5173
```

## Default Login
Seeded on first run:
```
Email: admin@ems.com
Password: admin123
Role: ADMIN
```

## API Endpoints
- POST `/api/auth/login`
- GET `/api/employees`
- POST `/api/employees`
- PUT `/api/employees/{id}`
- DELETE `/api/employees/{id}`
- GET `/api/salary/{employeeId}`
- POST `/api/salary/{employeeId}`

## Notes
- Use numeric `id` (DB id) for salary endpoints.
- JWT secret and expiry are in `application.properties`.

## Future Improvements
- Form validation and field‑level errors
- Pagination and search
- Salary duplicate prevention by month
- PDF export customization

