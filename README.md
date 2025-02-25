# Orizon Backend

Orizon Backend is a RESTful API developed in Node.js using Express and MySQL, designed to manage products, users, and orders. The API adheres to REST principles and includes CRUD (Create, Read, Update, Delete) functionality for each entity. Interactive documentation is available through Swagger UI.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Database Configuration](#database-configuration)
- [Starting the Server](#starting-the-server)
- [API Documentation](#api-documentation)
- [Tests](#tests)
- [Project Structure](#project-structure)
- [Contributions](#contributions)
- [License](#license)

## Features

- **RESTful API:** Endpoints using the proper HTTP methods (GET, POST, PUT, DELETE) that return the correct status codes (201 for creation, 200 for updates/deletions, 400 for validation errors, 404 for "not found").
- **CRUD for Products:** Manage products using the "name" field.
- **CRUD for Users:** Manage users with "first name", "last name", and "email". Includes a GET endpoint to retrieve all users.
- **CRUD for Orders:** Manage orders that associate products and users through junction tables, with filtering options by date and product.
- **Security:** All queries are executed using prepared statements to prevent SQL Injection.
- **Interactive Documentation:** API documentation is automatically generated using Swagger UI.
- **Automated Tests:** Unit and integration tests are provided using Mocha, Chai, Sinon, and Supertest.

## Requirements

- [Node.js](https://nodejs.org/) (recommended LTS version)
- [MySQL](https://www.mysql.com/) (installed, e.g., via Homebrew)
- npm

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/orizon-backend.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd orizon-backend
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

## Database Configuration

1. **Install and Start MySQL: If you haven't installed MySQL, you can do so via Homebrew:**

   ```bash
   brew install mysql
   brew services start mysql
   ```

2. **Create the Database and Tables:**

- Connect to the MySQL client:

  ```bash
   mysql -u root -p
  ```

- Create and select the database:

  ```sql
  CREATE DATABASE IF NOT EXISTS orizon_db;
  USE orizon_db;
  ```

- Run the migration script to create the tables:
  ```bash
   mysql -u root orizon_db < src/db/migrations.sql
  ```

## Starting the Server

1. **Development Mode (with Nodemon):**

   ```bash
   npm run dev
   ```

2. **Production Mode:**

   ```bash
   npm start
   ```

   The server will run on the specified port (default is 3000, configurable via the .env file).

## API Documentation

Interactive API documentation is generated with Swagger.

1. **Access Swagger UI: Open your browser and navigate to:**

   ```bash
   http://localhost:3000/api-docs
   ```

   Here you will find a complete overview of the endpoints (Products, Users, Orders) along with details of parameters, request bodies, and responses. You can also test the endpoints directly using the "Try it out" button.

## Tests

Automated tests are provided to verify the functionality of the endpoints.

- To Run the Tests:

  ```bash
  npm test
  ```

- The tests cover CRUD operations for Products, Users, and Orders, including both unit and integration tests.

## Project Structure

```bash
orizon-backend/
├── src/
│   ├── controllers #Controllers for products, users, and orders
│   │   ├── productController.js
│   │   ├── userController.js
│   │   └── orderController.js
│   ├── models/ #Models to interact with the database
│   │   ├── productModel.js
│   │   ├── userModel.js
│   │   └── orderModel.js
│   ├── routes/ #Definition of API endpoints
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   └── orderRoutes.js
│   ├── db/ #Database configuration and migrations
│   │   ├── index.js
│   │   └── migrations.sql
│   └── app.js #Main Express configuration and Swagger integration
├── test/ #Unit and integration tests
│   ├── product.integration.spec.js
│   ├── user.integration.spec.js
│   └── order.integration.spec.js
├── .env #Environment variables (e.g., PORT, DB_HOST, DB_USER, etc.)
├── package.json
└── README.md
```

## Contributions

Contributions are welcome! If you'd like to contribute, please open a pull request describing your changes and contribution in detail.

## License

Distributed under the MIT License.

```yaml
---
You can copy this Markdown content into your `README.md` file. Feel free to modify or expand it according to your project’s needs. If you need further changes, just let me know!
```
