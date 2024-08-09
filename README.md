# GraphQL Task Management

## Overview

This project is a task management system built with Node.js, Express.js, MongoDB, and GraphQL. It features multi-tenancy, role-based access control (RBAC), and JWT-based authentication.

## Features

- **Multi-Tenancy:** Separate data per organization.
- **Role-Based Access Control (RBAC):** Admin, Manager, and User roles.
- **GraphQL API:** Queries and mutations for managing organizations, users, and tasks.
- **JWT Authentication:** Secure API access.
- **Optional Docker Support:** Containerize the application with Docker.

## Prerequisites

- Node.js (v14 or later)
- MongoDB (running locally or a cloud instance)
- Postman (for API testing)

## Setup

1. **Clone the Repository**
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd graphql-task-management
Install Dependencies

bash
Copy code
npm install
Create a .env File

Copy .env.example to .env:
bash
Copy code
cp .env.example .env
Update .env with your MongoDB connection string and JWT secret.
Start MongoDB

Ensure MongoDB is running locally or use a cloud instance.
Start the Server

bash
Copy code
npm start
Access GraphiQL

Open http://localhost:5000/graphql in your browser.
