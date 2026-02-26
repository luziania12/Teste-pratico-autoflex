Stock Control System

Full-stack web application developed using Quarkus (Java) and React, with PostgreSQL database integration.
The system manages products and raw materials, creates product-material associations, and calculates production availability based on current stock levels.

🚀 Tech Stack
Backend

Java 17

Quarkus

REST API

Hibernate ORM + Panache

PostgreSQL

OpenAPI / Swagger UI

Frontend

React

Axios

Responsive CSS Layout

Database

PostgreSQL

📌 Features

✅ Products CRUD (Create, Read, Update, Delete)

✅ Raw Materials CRUD

✅ Product ↔ Raw Material association with quantityNeeded

✅ Production availability calculation based on inventory

✅ Responsive web interface

✅ RESTful API architecture

✅ Swagger documentation for API testing

🏗️ Architecture

The project follows an API-based architecture:

Frontend (React) → consumes → Backend (Quarkus REST API) → connects to → PostgreSQL Database

Backend and frontend are fully separated, following best practices for full-stack applications.

⚙️ How to Run the Project
1️⃣ Backend Setup

Requirements:

Java 17

Maven

PostgreSQL running locally

Navigate to the backend folder:

cd backend/stock-control-api
mvn quarkus:dev

Backend runs at:

http://localhost:8080

Swagger UI:

http://localhost:8080/q/swagger-ui
2️⃣ Frontend Setup

Requirements:

Node.js (LTS recommended)

Navigate to the frontend folder:

cd frontend
npm install
npm start

Frontend runs at:

http://localhost:3000
🔄 Main API Endpoints
Raw Materials

GET /raw-materials

POST /raw-materials

PUT /raw-materials/{id}

DELETE /raw-materials/{id}

Products

GET /products

POST /products

PUT /products/{id}

DELETE /products/{id}

Associations

GET /product-materials

POST /product-materials

DELETE /product-materials/{id}

Production Availability

GET /production-available

📊 Business Logic

The system calculates the maximum number of product units that can be produced based on:

Available raw material stock

Required quantity per product (quantityNeeded)

Product value prioritization (when applicable)

🎯 Purpose

This project was developed as a practical technical assessment to demonstrate:

Full-stack development skills

REST API design

Database modeling

Business rule implementation

Clean and organized project structure

English-based code standards

👩‍💻 Author

Luziânia da Silva Severino
Full Stack Developer
